import Category from "@/models/category";
import dbConnect from "@/utils/dbConntect";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

interface Props {
	params: {
		id: string;
	};
}

export async function PUT(req: NextRequest, { params }: Props) {
	await dbConnect();
	const body = await req.json();

	try {
		const updatedcategory = await Category.findByIdAndUpdate(params.id, {
			name: body.name,
			slug: slugify(body.name),
		});
		if (updatedcategory) {
			return NextResponse.json(updatedcategory, {
				status: 201,
			});
		} else {
			throw new Error(`Cannot update category`);
		}
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json(error.message, {
				status: 500,
			});
		}
	}
}
export async function DELETE(req: NextRequest, { params }: Props) {
	await dbConnect();
	console.log(params, "delete category id");

	try {
		const deletedCategory = await Category.findByIdAndDelete(params.id);
		if (deletedCategory) {
			return NextResponse.json("Category deleted successfully", {
				status: 201,
			});
		} else {
			throw new Error(`Cannot update category`);
		}
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json(error.message, {
				status: 500,
			});
		}
	}
}
