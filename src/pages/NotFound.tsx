import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<main
			data-not-found-page
			className="grid flex-1 place-items-center bg-zinc-50 px-6 text-center"
		>
			<section className="max-w-xl">
				<p className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-zinc-500">
					404
				</p>
				<h1 className="mt-3 font-heading text-4xl font-black text-black md:text-5xl">
					Page not found
				</h1>
				<p className="mt-4 text-base leading-7 text-zinc-600">
					The page you are looking for does not exist or has moved.
				</p>
				<Button asChild className="mt-8">
					<a href="/">Back to home</a>
				</Button>
			</section>
		</main>
	);
}
