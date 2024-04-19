"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
	const { data, status } = useSession();
	return (
		<nav className="nav shadow p-2 justify-content-between mb-2">
			<Link href={"/"} className="nav-link">
				🛒 NEXTECOMMERCE
			</Link>
			{status === "authenticated" ? (
				<>
					<Link href={"/dashboard/user"} className="nav-link">
						{data.user.name}
					</Link>
					<a
						className="pointer"
						onClick={() => signOut({ callbackUrl: "/login" })}
					>
						Logout
					</a>
				</>
			) : (
				<div className="d-flex">
					<Link href={"/login"} className="nav-link">
						Login
					</Link>
					<Link href={"/register"} className="nav-link">
						register
					</Link>
				</div>
			)}
		</nav>
	);
};
export default Navbar;
