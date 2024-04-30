"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/";

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setLoading(true);
			const res = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});
			if (res?.error) {
				toast.error(res.error);
				setLoading(false);
			} else {
				toast.success("logged in successfully");
				router.push(callbackUrl);
			}
			setPassword("");
			setEmail("");
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main>
			<div className="container">
				<div className="row vh-100 justify-content-center align-items-center">
					<div className="col-lg-4 shadow bg-light p-4">
						<h2 className="mb-4 text-center">Login</h2>
						<form onSubmit={handleSubmit}>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="form-control mb-3"
								placeholder="Email"
							/>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="form-control mb-3"
								placeholder="Password"
							/>
							<button
								className="btn btn-primary btn-raised d-block mx-auto w-100 rounded-4 mt-2"
								disabled={loading || !email || !password}
							>
								{loading ? "Please wait..." : "Login"}
							</button>
						</form>
						<button
							className="btn btn-danger btn-raised rounded-4 mt-2 w-100"
							onClick={() =>
								signIn("google", {
									callbackUrl: callbackUrl,
								})
							}
						>
							Login with Google{" "}
						</button>
					</div>
				</div>
			</div>
		</main>
	);
};
export default LoginPage;
