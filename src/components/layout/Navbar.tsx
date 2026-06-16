import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex gap-6 border-b p-4">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/users">Users</Link>
    </nav>
  );
}