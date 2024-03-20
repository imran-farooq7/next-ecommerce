import Link from "next/link";

const Navbar = () => {
	return (
		<nav className="nav shadow p-2 justify-content-between mb-2">
			<Link href={"/"} className="nav-link">
				🛒 NEXTECOMMERCE
			</Link>
			<div className="d-flex">
				<Link href={"/login"} className="nav-link">
					Login
				</Link>
				<Link href={"/register"} className="nav-link">
					register
				</Link>
			</div>
		</nav>
	);
};
export default Navbar;
