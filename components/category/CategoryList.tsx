"use client";

import { CategoryContext } from "@/context/CategoryContext";
import { use } from "react";

const CategoryList = () => {
	const { categories, setUpdateCategory } = use(CategoryContext);

	return (
		<div>
			{categories?.map((category) => (
				<button
					className="btn"
					key={category?._id}
					onClick={() => setUpdateCategory(category)}
				>
					{category?.name}
				</button>
			))}
		</div>
	);
};
export default CategoryList;
