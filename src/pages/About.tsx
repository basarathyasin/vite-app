export default function About() {
	return (
		<div>
			{/* Banner */}
			<section className="bg-slate-900 text-white py-20">
				<div className="container mx-auto px-6 text-center">
					<h1 className="text-5xl font-bold mb-4">About Us</h1>
					<p className="text-lg text-slate-300 max-w-2xl mx-auto">
						Learn more about our company, our mission, and the people behind our
						success.
					</p>
				</div>
			</section>

			<section className="py-16">
				<div className="max-w-3xl mx-auto px-6 text-center">
					<h2 className="text-3xl font-bold mb-4">Who We Are</h2>

					<p className="text-gray-600 mb-4">
						We are a passionate team dedicated to building modern web
						experiences. Our goal is to create fast, scalable, and user-friendly
						applications that help businesses grow.
					</p>

					<p className="text-gray-600">
						From design to development, we focus on quality, performance, and
						delivering value to our customers.
					</p>
				</div>
			</section>
		</div>
	);
}
