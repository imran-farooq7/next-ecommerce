"use client";

import {
	createContext,
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import toast from "react-hot-toast";
interface TagContext {
	name: string;
	setName: Dispatch<SetStateAction<string>>;
	createTag: () => Promise<void>;
	getTag: () => Promise<void>;
	updateTag: () => Promise<void>;
	deleteTag: () => Promise<void>;
	updatingTag: any;
	setUpdatingTag: Dispatch<any>;
	parentCategory: string;
	setParentCategory: Dispatch<SetStateAction<string>>;
	tags: any[];
	setTags: Dispatch<SetStateAction<any[]>>;
}

export const TagContext = createContext<TagContext>(null);

export const TagProvider = ({ children }: { children: React.ReactNode }) => {
	const [name, setName] = useState("");
	const [parentCategory, setParentCategory] = useState("");
	const [tags, setTags] = useState([]);
	const [updatingTag, setUpdatingTag] = useState(null);
	const createTag = async () => {
		try {
			const res = await fetch("/api/admin/tag", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					parent: parentCategory,
				}),
			});
			const data = await res.json();
			if (res.ok) {
				toast.success("Tag created successfully");
				setName("");
				setParentCategory("");
				setTags([...tags, data?.tag]);
			} else {
				toast.error("Sorry tag could not be created");
			}
		} catch (error) {}
	};
	const getTag = async () => {
		try {
			const res = await fetch("/api/admin/tag", {
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			if (res.ok) {
				setTags(data);
			} else {
				toast.error("Could not fetch tags");
			}
		} catch (error) {}
	};
	const updateTag = async () => {
		try {
			const res = await fetch(`/api/admin/tag/${updatingTag?._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatingTag),
			});
			const data = await res.json();
			if (res.ok) {
				toast.success("Tag updated successfully");
				setUpdatingTag(null);
				setParentCategory("");
				setTags((prevTag) => {
					return prevTag?.map((tag) => (tag?._id === data?._id ? data : tag));
				});
			} else {
				toast.error("Sorry tag could not be updated");
			}
		} catch (error) {}
	};
	const deleteTag = async () => {
		try {
			const res = await fetch(`/api/admin/tag/${updatingTag?._id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			if (res.ok) {
				toast.success("tag deleted successfully");
				setTags((prevTag) => {
					return prevTag?.filter((tag) => tag?._id !== data?._id);
				});
			}
		} catch (error) {}
	};
	// useEffect(() => {
	// 	getTag();
	// }, []);

	return (
		<TagContext.Provider
			value={{
				name,
				setName,
				parentCategory,
				setParentCategory,
				tags,
				setTags,
				updatingTag,
				setUpdatingTag,
				createTag,
				getTag,
				updateTag,
				deleteTag,
			}}
		>
			{children}
		</TagContext.Provider>
	);
};
