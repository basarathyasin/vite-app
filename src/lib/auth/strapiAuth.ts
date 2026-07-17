import type { AuthSession, AuthUser } from "@/context/AuthContext";

export const AUTH_USER_STORAGE_KEY = "strapi_auth_user";
export const STRAPI_JWT_STORAGE_KEY = "strapi_jwt";

const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL ?? "/api";

type StrapiAuthResponse = {
	jwt?: string;
	user?: StrapiUser;
	error?: {
		message?: string;
	};
};

type StrapiUser = {
	id: number;
	username?: string;
	email: string;
	role?: StrapiRolePayload | null;
};

type StrapiRole = {
	id: number;
	name?: string;
	type?: string;
};

type StrapiRolePayload =
	| StrapiRole
	| {
			data?: {
				id: number;
				attributes?: {
					name?: string;
					type?: string;
				};
			} | null;
	  };

export type LoginCredentials = {
	email: string;
	password: string;
};

export type RegisterCredentials = {
	name: string;
	email: string;
	password: string;
};

export async function loginStrapiUser({
	email,
	password,
}: LoginCredentials): Promise<AuthSession> {
	const auth = await requestStrapiAuth("/auth/local", {
		identifier: email,
		password,
	});

	return createSession(auth);
}

export async function registerStrapiUser({
	name,
	email,
	password,
}: RegisterCredentials): Promise<AuthSession> {
	const auth = await requestStrapiAuth("/auth/local/register", {
		username: name,
		email,
		password,
	});

	return createSession(auth);
}

export function getStoredAuthSession(): AuthSession | null {
	if (typeof window === "undefined") {
		return null;
	}

	const jwt = localStorage.getItem(STRAPI_JWT_STORAGE_KEY);
	const storedUser = localStorage.getItem(AUTH_USER_STORAGE_KEY);

	if (!jwt || !storedUser) {
		return null;
	}

	try {
		const user = JSON.parse(storedUser) as Partial<AuthUser>;

		if (typeof user.email !== "string" || typeof user.name !== "string") {
			return null;
		}

		return {
			jwt,
			user: {
				id: typeof user.id === "number" ? user.id : undefined,
				name: user.name,
				email: user.email,
				role: typeof user.role === "string" ? user.role : undefined,
			},
		};
	} catch {
		return null;
	}
}

async function createSession(auth: StrapiAuthResponse): Promise<AuthSession> {
	if (!auth.jwt || !auth.user) {
		throw new Error("Strapi did not return a valid auth session.");
	}

	const fallbackUser = auth.user;
	const user = await fetchAuthenticatedUser(auth.jwt).catch(() => fallbackUser);

	return {
		jwt: auth.jwt,
		user: mapStrapiUser(user),
	};
}

async function requestStrapiAuth(
	endpoint: string,
	body: Record<string, string>,
): Promise<StrapiAuthResponse> {
	const response = await fetch(`${getApiBaseUrl()}${endpoint}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
	const payload = await parseStrapiAuthResponse(response);

	if (!response.ok) {
		throw new Error(
			payload.error?.message ??
				`Authentication failed with status ${response.status}.`,
		);
	}

	return payload;
}

async function parseStrapiAuthResponse(
	response: Response,
): Promise<StrapiAuthResponse> {
	const text = await response.text();

	if (!text) {
		return {};
	}

	try {
		return JSON.parse(text) as StrapiAuthResponse;
	} catch {
		return {
			error: {
				message: text,
			},
		};
	}
}

async function fetchAuthenticatedUser(jwt: string): Promise<StrapiUser> {
	const response = await fetch(`${getApiBaseUrl()}/users/me?populate=role`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	if (!response.ok) {
		throw new Error("Unable to verify your account role.");
	}

	return (await response.json()) as StrapiUser;
}

function mapStrapiUser(user: StrapiUser): AuthUser {
	return {
		id: user.id,
		name: user.username ?? user.email,
		email: user.email,
		role: getRoleName(user.role),
	};
}

function getRoleName(role: StrapiRolePayload | null | undefined) {
	if (!role) {
		return undefined;
	}

	if (isNestedRolePayload(role)) {
		return role.data?.attributes?.name ?? role.data?.attributes?.type;
	}

	return role.name ?? role.type;
}

function isNestedRolePayload(
	role: StrapiRolePayload,
): role is Extract<StrapiRolePayload, { data?: unknown }> {
	return "data" in role;
}

function getApiBaseUrl() {
	return STRAPI_API_URL.replace(/\/$/, "");
}
