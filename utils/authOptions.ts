import User from "@/models/user";
import brcypt from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import dbConnect from "./dbConntect";
export const authOptions: AuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
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
	callbacks: {
		async signIn({ user }) {
			const { email } = user;
			dbConnect();
			const dbUser = await User.findOne({ email });
			if (!dbUser) {
				await User.create({
					email,
					name: user.name,
					image: user.image,
				});
			}
			return true;
		},
		async jwt({ token, user }) {
			const userByEmail = await User.findOne({ email: token.email });
			userByEmail.password = undefined;
			userByEmail.resetCode = undefined;
			token.user = userByEmail;
			return token;
		},
		async session({ session, token }) {
			session.user = token.user;
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
};
