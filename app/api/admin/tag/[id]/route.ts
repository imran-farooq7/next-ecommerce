import Category from "@/models/category";
import Tag from "@/models/tag";
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
		const updateTag = await Tag.findByIdAndUpdate(params.id, {
			name: body.name,
			slug: slugify(body.name),
		});
		if (updateTag) {
			return NextResponse.json(updateTag, {
				status: 201,
			});
		} else {
			throw new Error(`Cannot update tag`);
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

	try {
		const deleteTag = await Tag.findByIdAndDelete(params.id);
		if (deleteTag) {
			return NextResponse.json("tag deleted successfully", {
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
