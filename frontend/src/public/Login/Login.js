import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doLogin } from "../../services/authService";

const SignIn = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	function onChange(event) {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	async function onSubmit(event) {
		event.preventDefault();

		doLogin(email, password)
			.then((response) => {
				localStorage.setItem("token", response.token);
				localStorage.setItem("userEmail", response.email);
				navigate("/perfil");
			})
			.catch((error) => {
				toast.error(error.message);
			});
	}

	return (
		<section>
			<h1 className='text-2xl text-center mt-6 font-bold'>Login</h1>
			<div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
				<div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
					<img
						src='https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
						alt='key'
						className='w-full rounded-2xl'
					/>
				</div>
				<div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
					<form onSubmit={onSubmit}>
						<div className='mb-6'>
							<input
								className='w-full px-4 py-2 text-md text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
								type='email'
								name='email'
								placeholder='Email'
								required
								value={formData.email}
								onChange={onChange}
							/>
						</div>
						<div className='relative mb-6'>
							<input
								className='w-full px-4 py-2 text-md text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
								type={showPassword ? "text" : "password"}
								name='password'
								placeholder='Senha'
								required
								value={formData.password}
								onChange={onChange}
							/>
							{showPassword ? (
								<AiFillEyeInvisible
									onClick={() => setShowPassword((prev) => !prev)}
									className='absolute right-3 top-3 text-xl cursor-pointer'
								/>
							) : (
								<AiFillEye
									onClick={() => setShowPassword((prev) => !prev)}
									className='absolute right-3 top-3 text-xl cursor-pointer'
								/>
							)}
						</div>
						<div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
							<p className='mb-6'>
								<Link
									to='/forgot-password'
									className='text-sm text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>
									Esqueceu a Senha?
								</Link>
							</p>
						</div>
						<button
							className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'
							type='submit'>
							Entrar
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default SignIn;
