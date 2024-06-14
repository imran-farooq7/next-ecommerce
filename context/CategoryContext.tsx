"use client";
import {
	ReactNode,
	createContext,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
} from "react";
import toast from "react-hot-toast";
interface CategoryContext {
	name: string;
	setName: Dispatch<SetStateAction<string>>;
	createCategory: () => Promise<void>;
	fetchCategories: () => Promise<void>;
	updatingCategory: () => Promise<void>;
	deleteCatgory: () => Promise<void>;
	updateCategory: any;
	setUpdateCategory: Dispatch<any>;
	categories: any[];
}
export const CategoryContext = createContext<CategoryContext>(null);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
	const [name, setName] = useState("");
	const [categories, setCategories] = useState([]);
	const [updateCategory, setUpdateCategory] = useState(null);
	const createCategory = async () => {
		try {
			const res = await fetch("/api/admin/category", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name }),
			});
			const data = await res.json();
			if (res.ok) {
				toast.success("Category created successfully");
				setName("");
				setCategories([...categories, data.category]);
			} else {
				console.log(data, "from create category");
				toast.error(data);
			}
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	};
	const fetchCategories = async () => {
		try {
			const res = await fetch("/api/admin/category");
			const data = await res.json();
			if (res.ok) {
				setCategories(data);
			} else {
				toast.error(data.error.message);
			}
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	};

	const updatingCategory = async () => {
		try {
			const res = await fetch(`/api/admin/category/${updateCategory?._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updateCategory),
			});
			const data = await res.json();
			if (res.ok) {
				toast.success("Category updated successfully");
				setName("");
				setUpdateCategory(null);
				setCategories(
					categories.map((category) =>
						category._id === updateCategory._id ? data : category
					)
				);
			}
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	};
	const deleteCatgory = async () => {
		try {
			const res = await fetch(`/api/admin/category/${updateCategory?._id}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (res.ok) {
				toast.success("Category deleted successfully");
				setName("");
				setUpdateCategory(null);
				setCategories(
					categories.filter((category) => category._id !== updateCategory._id)
				);
			}
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	};
	useEffect(() => {
		fetchCategories();
	}, [categories.length, updateCategory]);

	return (
		<CategoryContext.Provider
			value={{
				name,
				setName,
				createCategory,
				fetchCategories,
				deleteCatgory,
				updatingCategory,
				updateCategory,
				setUpdateCategory,
				categories,
			}}
		>
			{children}
		</CategoryContext.Provider>
	);
};
