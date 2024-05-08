import AdminNav from "@/components/admin/AdminNav";

const AdminDashboard = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<AdminNav />
			{children}
		</>
	);
};
export default AdminDashboard;
