import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserDetails() {
	const { id } = useParams();

	const userId = Number(id);
	const limit = 500;

	const apiUrl = import.meta.env.VITE_API_URL;

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	if (loading) {
		return <h1>Loading User...</h1>;
	}

	if (Number.isNaN(userId)) {
		return <h1>Invalid User ID</h1>;
	}

	if (userId > limit) {
		return <h1>User Not Found</h1>;
	}

	return (
		<div>
			User ID: {id}
			<br />
			API: {apiUrl}
		</div>
	);
}