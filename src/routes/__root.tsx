import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Footer from "@/layout/Footer";

export const Route = createRootRoute({
	component: () => (
		<>
			<div className="flex gap-6 p-4 justify-center">
				<Link to="/" className="[&.active]:font-bold">
					Home
				</Link>
				<Link to="/services" className="[&.active]:font-bold">
					Services
				</Link>
				<Link to="/about" className="[&.active]:font-bold">
					About
				</Link>
				<Link to="/contact" className="[&.active]:font-bold">
					Contact
				</Link>
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools />
			<Footer />
		</>
	),
});
