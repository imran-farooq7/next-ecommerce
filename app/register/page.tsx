"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const RegisterPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setLoading(true);
			const res = await axios.post("/api/register", { name, password, email });
			if (res.status === 201) {
				toast.success("user registration successfully");
				router.push("/login");
			} else {
				toast.error("Something went wrong please try again later", {
					position: "top-right",
				});
			}
			setName("");
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
						<h2 className="mb-4 text-center">Register</h2>
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="form-control mb-3"
								placeholder="Name"
							/>
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
								disabled={loading || !name || !email || !password}
							>
								{loading ? "Please wait..." : "Register"}
							</button>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
};
export default RegisterPage;
