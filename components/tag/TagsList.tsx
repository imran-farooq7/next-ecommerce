"use client";

import { TagContext } from "@/context/TagContext";
import { useContext, useEffect } from "react";

const TagsList = () => {
	const { tags, getTag } = useContext(TagContext);
	useEffect(() => {
		getTag();
	}, []);

	return (
		<div>
			{tags.map((tag) => (
				<h1>{tag?.name}</h1>
			))}
		</div>
	);
};
export default TagsList;
