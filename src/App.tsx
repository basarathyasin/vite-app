import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Users from "@/pages/Users";
import UserDetails from "@/pages/UserDetails";

export default function App() {
	return (
		<BrowserRouter>
			<Navbar />

			<main className="p-6">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/users" element={<Users />} />
					<Route path="/users/:id" element={<UserDetails />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
}
