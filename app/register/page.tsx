"use client";
import { FormEvent, useState } from "react";

const RegisterPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [passwod, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setLoading(true);
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
					</div>
				</div>
			</div>
		</main>
	);
};
export default RegisterPage;
