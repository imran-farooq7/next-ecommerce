import User from "@/models/user";
import dbConnect from "@/utils/dbConntect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
export const POST = async (req: NextRequest) => {
	await dbConnect();
	const body = await req.json();

	try {
		const user = await new User({
			email: body.email,
			name: body.name,
			password: await bcrypt.hash(body.password, 8),
		}).save();

		return NextResponse.json(user, { status: 201 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Faild to create a new user" });
	}
};
