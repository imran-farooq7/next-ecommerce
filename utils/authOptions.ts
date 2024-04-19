import User from "@/models/user";
import brcypt from "bcrypt";
import { AuthOptions } from "next-auth";
import dbConnect from "./dbConntect";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: AuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			credentials: {
				email: {
					type: "email",
				},
				password: {
					type: "password",
				},
			},
			async authorize(credentials, req) {
				console.log(credentials, "auth options");
				dbConnect();
				const { email, password } = credentials;
				const user = await User.findOne({ email });
				if (!user) {
					throw new Error("Invalid email or password");
				}
				const isPasswordMatched = await brcypt.compare(password, user.password);
				if (!isPasswordMatched) {
					throw new Error("Invalid email or password");
				}
				return user;
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/login",
	},
};
