interface ErrorStateProps {
	message?: string;
	retry: () => void;
}

export default function ErrorState({
	message = "Something went wrong.",
	retry,
}: ErrorStateProps) {
	return (
		<div className="flex flex-col items-center justify-center p-6 text-center">
			<p className="mb-4 font-medium text-red-500">{message}</p>
			<button
				onClick={retry}
				className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
				type="button"
			>
				Try Again
			</button>
		</div>
	);
}
