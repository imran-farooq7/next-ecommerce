import CreateTag from "@/components/tag/CreateTag";
import TagsList from "@/components/tag/TagsList";

const AdminTag = () => {
	return (
		<div className="container my-5">
			<div className="row">
				<div className="col">
					<p className="lead">Create Tags</p>
					<CreateTag />
				</div>
			</div>
			<div className="row">
				<div className="col">
					<p className="lead">List of Tags</p>
					<TagsList />
				</div>
			</div>
		</div>
	);
};
export default AdminTag;
