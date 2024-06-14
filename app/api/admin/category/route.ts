import category from "@/models/category";
import Category from "@/models/category";
import dbConnect from "@/utils/dbConntect";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
export async function POST(req: NextRequest) {
	await dbConnect();
	const body = await req.json();
	try {
		const category = await Category.create({
			name: body.name,
			slugify: slugify(body.name),
		});
		return NextResponse.json(category, {
			status: 201,
		});
	} catch (error) {
		console.log(error);
		if (error instanceof Error) {
			return NextResponse.json(error.message, { status: 400 });
		}
	}
}
export async function GET() {
	await dbConnect();
	try {
		const categories = await Category.find();
		return NextResponse.json(categories, { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json(error.message, { status: 500 });
		}
	}
}
