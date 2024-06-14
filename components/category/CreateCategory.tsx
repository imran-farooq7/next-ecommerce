"use client";
import { CategoryContext } from "@/context/CategoryContext";
import { use } from "react";

const CreateCategory = () => {
	const {
		createCategory,
		name,
		setName,
		updateCategory,
		setUpdateCategory,
		updatingCategory,
		deleteCatgory,
	} = use(CategoryContext);
	return (
		<div className="my-5">
			<input
				type="text"
				className="form-control mb-2"
				value={updateCategory ? updateCategory?.name : name}
				onChange={(e) => {
					updateCategory
						? setUpdateCategory({ ...updateCategory, name: e.target.value })
						: setName(e.target.value);
				}}
				placeholder="Category Name"
			/>
			<div className="d-flex justify-content-between">
				<button
					className={`btn bg-${
						updateCategory ? "info" : "primary"
					} text-light rounded p-2`}
					onClick={() =>
						updateCategory ? updatingCategory() : createCategory()
					}
				>
					{updateCategory ? "Update" : "Create"}
				</button>
				{updateCategory && (
					<>
						<button
							className={`btn bg-danger text-light`}
							onClick={() => deleteCatgory()}
						>
							Delete
						</button>
						<button
							className="btn bg-success text-light"
							onClick={() => setUpdateCategory(null)}
						>
							Clear
						</button>
					</>
				)}
			</div>
		</div>
	);
};
export default CreateCategory;
