import Link from "next/link";

const AdminNav = () => {
	return (
		<nav className="nav justify-content-center mb-3">
			<Link href={"/dashboard/admin"} className="nav-link">
				Admin
			</Link>
			<Link href={"/dashboard/admin/category"} className="nav-link">
				Create category
			</Link>
		</nav>
	);
};
export default AdminNav;
