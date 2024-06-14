import CategoryList from "@/components/category/CategoryList";
import CreateCategory from "@/components/category/CreateCategory";

const AdminCategoryPage = () => {
	return (
		<div className="container mb-5">
			<div className="row">
				<div className="col">
					<p className="lead">Create Category</p>
					<CreateCategory />
				</div>
			</div>
			<div className="row">
				<div className="col">
					<p className="lead">List Of Categories</p>
					<CategoryList />
				</div>
			</div>
		</div>
	);
};
export default AdminCategoryPage;
