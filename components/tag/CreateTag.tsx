"use client";
import { CategoryContext } from "@/context/CategoryContext";
import { TagContext } from "@/context/TagContext";
import { useContext, useEffect } from "react";

const CreateTag = () => {
	const {
		name,
		setName,
		parentCategory,
		setParentCategory,
		updatingTag,
		setUpdatingTag,
		createTag,
		deleteTag,
	} = useContext(TagContext);
	const { fetchCategories, categories } = useContext(CategoryContext);
	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<div>
			<input
				type="text"
				value={updatingTag ? updatingTag?.name : name}
				onChange={(e) => {
					if (updatingTag) {
						setUpdatingTag({ ...updatingTag, name: e.target.value });
					} else {
						setName(e.target.value);
					}
				}}
				className="form-control my-4 p-2"
			/>
			<div className="form-group">
				<label htmlFor="parent">Parent Category</label>
				<select
					name="category"
					id="parent"
					className="form-control"
					onChange={(e) => setParentCategory(e.target.value)}
				>
					<option>Select Category</option>
					{categories.map((category) => (
						<option
							value={category._id}
							key={category._id}
							// selected={
							// 	category?._id === updatingTag?.parentCategory ||
							// 	category?._id === parentCategory
							// }
						>
							{category.name}
						</option>
					))}
				</select>
			</div>

			<button
				className={`btn bg-${
					updatingTag ? "info" : "primary"
				} text-light rounded p-2`}
				onClick={() => (updatingTag ? updatingTag() : createTag())}
			>
				{updatingTag ? "Update" : "Create"}
			</button>
		</div>
	);
};
export default CreateTag;
