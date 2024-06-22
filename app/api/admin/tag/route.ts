import Tag from "@/models/tag";
import dbConnect from "@/utils/dbConntect";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
export async function POST(req: NextRequest) {
	await dbConnect();
	const body = await req.json();
	try {
		const tag = await Tag.create({
			name: body.name,
			slugify: slugify(body.name),
			parent: body.parent,
		});
		return NextResponse.json(tag, {
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
		const tags = await Tag.find();
		return NextResponse.json(tags, { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json(error.message, { status: 500 });
		}
	}
}
