import { Link } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";

import { signupSchema, type SignupFormData } from "./schema";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

const signupResolver: Resolver<SignupFormData> = async (values) => {
	const result = signupSchema.safeParse(values);

	if (result.success) {
		return {
			values: result.data,
			errors: {},
		};
	}

	return {
		values: {},
		errors: result.error.issues.reduce<
			Record<string, { type: string; message: string }>
		>((errors, issue) => {
			const field = issue.path[0];

			if (typeof field === "string") {
				errors[field] = {
					type: issue.code,
					message: issue.message,
				};
			}

			return errors;
		}, {}),
	};
};

export function SignupForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const { login } = useAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<SignupFormData>({
		resolver: signupResolver,
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: SignupFormData) => {
		try {
			localStorage.setItem("users", JSON.stringify(data));
			login({
				name: data.name,
				email: data.email,
			});

			await new Promise((resolve) => setTimeout(resolve, 2000));

			reset();

			window.location.replace("/dashboard");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className={cn("flex flex-col", className)} {...props}>
			<Card className="rounded-xl border-[#E2E8F0] bg-white shadow-sm dark:border-white/10 dark:bg-[#111315]">
				<CardHeader className="gap-1.5 px-5 pt-5 text-center">
					<CardTitle className="text-xl font-semibold text-[#111827] dark:text-white">
						Create your account
					</CardTitle>

					<CardDescription className="text-sm text-[#64748B] dark:text-zinc-400">
						Enter your details to get started.
					</CardDescription>
				</CardHeader>

				<CardContent className="px-5 pb-5">
					<form onSubmit={handleSubmit(onSubmit)}>
						<FieldGroup className="gap-3.5">
							<Field>
								<FieldLabel htmlFor="name" className="text-[#334155] dark:text-zinc-200">
									Full Name
								</FieldLabel>

								<Input
									id="name"
									placeholder="John Doe"
									className="h-10 border-[#CBD5E1] bg-white px-3 text-[#111827] placeholder:text-[#94A3B8] dark:border-white/15 dark:bg-white/10 dark:text-white dark:placeholder:text-zinc-500"
									aria-invalid={Boolean(errors.name)}
									{...register("name")}
								/>

								{errors.name && (
									<p className="text-sm text-destructive">
										{errors.name.message}
									</p>
								)}
							</Field>

							<Field>
								<FieldLabel htmlFor="email" className="text-[#334155] dark:text-zinc-200">
									Email
								</FieldLabel>

								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									className="h-10 border-[#CBD5E1] bg-white px-3 text-[#111827] placeholder:text-[#94A3B8] dark:border-white/15 dark:bg-white/10 dark:text-white dark:placeholder:text-zinc-500"
									aria-invalid={Boolean(errors.email)}
									{...register("email")}
								/>

								{errors.email && (
									<p className="text-sm text-destructive">
										{errors.email.message}
									</p>
								)}
							</Field>

							<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
								<Field>
									<FieldLabel htmlFor="password" className="text-[#334155] dark:text-zinc-200">
										Password
									</FieldLabel>

									<div className="relative">
										<Input
											id="password"
											type={showPassword ? "text" : "password"}
											className="h-10 border-[#CBD5E1] bg-white px-3 pr-10 text-[#111827] dark:border-white/15 dark:bg-white/10 dark:text-white"
											aria-invalid={Boolean(errors.password)}
											{...register("password")}
										/>
										<Button
											aria-label={showPassword ? "Hide password" : "Show password"}
											className="absolute right-1 top-1/2 size-8 -translate-y-1/2 text-[#64748B] hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-white/10"
											onClick={() => setShowPassword((current) => !current)}
											size="icon-xs"
											type="button"
											variant="ghost"
										>
											{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
										</Button>
									</div>

									{errors.password && (
										<p className="text-sm text-destructive">
											{errors.password.message}
										</p>
									)}
								</Field>

								<Field>
									<FieldLabel
										htmlFor="confirm-password"
										className="text-[#334155] dark:text-zinc-200"
									>
										Confirm Password
									</FieldLabel>

									<div className="relative">
										<Input
											id="confirm-password"
											type={showConfirmPassword ? "text" : "password"}
											className="h-10 border-[#CBD5E1] bg-white px-3 pr-10 text-[#111827] dark:border-white/15 dark:bg-white/10 dark:text-white"
											aria-invalid={Boolean(errors.confirmPassword)}
											{...register("confirmPassword")}
										/>
										<Button
											aria-label={
												showConfirmPassword
													? "Hide confirm password"
													: "Show confirm password"
											}
											className="absolute right-1 top-1/2 size-8 -translate-y-1/2 text-[#64748B] hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-white/10"
											onClick={() => setShowConfirmPassword((current) => !current)}
											size="icon-xs"
											type="button"
											variant="ghost"
										>
											{showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
										</Button>
									</div>

									{errors.confirmPassword && (
										<p className="text-sm text-destructive">
											{errors.confirmPassword.message}
										</p>
									)}
								</Field>
							</div>

							<FieldDescription className="text-[#64748B] dark:text-zinc-400">
								Password must be at least 8 characters long.
							</FieldDescription>

							<Button
								type="submit"
								className="h-10 w-full rounded-lg"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Creating Account..." : "Create Account"}
							</Button>

							<FieldDescription className="text-center text-[#64748B] dark:text-zinc-400">
								Already have an account?{" "}
								<Link
									to="/login"
									className="font-medium text-[#2563EB] hover:underline dark:text-sky-400"
								>
									Sign in
								</Link>
							</FieldDescription>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
