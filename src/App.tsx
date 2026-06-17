import { Link } from "@tanstack/react-router";


export default function Home() {
  return (
    <main className="flex min-h-screen items-center bg-black px-8">
      <section className="mx-auto flex max-w-6xl items-center justify-between gap-16">
        <div>
          <p className="mb-3 text-sm uppercase tracking-widest text-slate-500">
            Digital Agency
          </p>

          <h1 className="mb-6 text-6xl font-bold text-white">
            We Build
            <br />
            Modern Websites
          </h1>

          <Link
            to="/services"
            className="inline-flex rounded-md bg-white px-6 py-3 font-medium text-black"
          >
            View Services
          </Link>
        </div>

        <p className="max-w-md text-lg text-slate-400">
          Helping startups and businesses establish a strong online
          presence through development, design, and marketing.
        </p>
      </section>
    </main>
  );
}