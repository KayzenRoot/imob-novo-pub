import React, { useState } from "react";
import { toast } from "react-toastify";
import * as userService from "../../services/profileService";
import bcrypt from "bcryptjs";

export default function NewUser() {
	// Estados para gerenciar os campos do formulário
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		phone: "",
		cep: "",
		creci: "",
		birthDate: "",
		city: "",
		state: "",
		zip: "",
		number: "",
		neighborhood: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleCepChange = async (e) => {
		const { value } = e.target;
		setFormData((prev) => ({ ...prev, cep: value }));

		if (value.length === 8) {
			try {
				const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
				const data = await response.json();
				if (!data.error) {
					setFormData((prev) => ({
						...prev,
						city: data.localidade,
						state: data.uf,
						neighborhood: data.bairro,
						zip: data.cep,
					}));
				}
			} catch (error) {
				toast.error("Erro ao buscar dados do CEP.");
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Implementar validações necessárias
		const { name, email, password } = formData;
		if (!name || !email || !password) {
			return toast.error("Nome, email e senha são obrigatórios.");
		}

		// Use bcrypt para hashear a senha antes de enviar
		const hashedPassword = await bcrypt.hash(password, 10);

		// Montando os dados do usuário para envio
		const userData = { ...formData, password: hashedPassword };

		try {
			await userService.createUser(userData);
			toast.success("Usuário criado com sucesso!");
			resetForm();
		} catch (error) {
			console.error("Erro ao criar usuário:", error);
			toast.error("Erro ao criar usuário: " + error.message);
		}
	};

	const resetForm = () => {
		setFormData({
			name: "",
			email: "",
			password: "",
			phone: "",
			cep: "",
			creci: "",
			birthDate: "",
			city: "",
			state: "",
			zip: "",
			number: "",
			neighborhood: "",
		});
	};

	return (
		<main className='max-w-[100%] px-2 mx-auto'>
			<h1 className='text-xl text-center font-semibold mb-6'>Cadastrar Usuário</h1>
			<form onSubmit={handleSubmit}>
				{/* Nome Completo */}
				<div className='mb-4'>
					<label htmlFor='name' className='block text-sm font-medium text-gray-700'>
						Nome Completo
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={formData.name}
						onChange={handleChange}
						className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
						required
					/>
				</div>

				{/* Email */}
				<div className='mb-4'>
					<label htmlFor='email' className='block text-sm font-medium text-gray-700'>
						Email
					</label>
					<input
						type='email'
						id='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
						className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
						required
					/>
				</div>

				{/* Telefone (WhatsApp) */}
				<div className='mb-4'>
					<label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
						Telefone (WhatsApp)
					</label>
					<input
						type='tel'
						id='phone'
						name='phone'
						value={formData.phone}
						onChange={handleChange}
						className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
					/>
				</div>

				{/* CRECI */}
				<div className='mb-4'>
					<label htmlFor='creci' className='block text-sm font-medium text-gray-700'>
						CRECI
					</label>
					<input
						type='text'
						id='creci'
						name='creci'
						value={formData.creci}
						onChange={handleChange}
						className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
					/>
				</div>

				{/* Data de Nascimento */}
				<div className='mb-4'>
					<label
						htmlFor='birthDate'
						className='block text-sm font-medium text-gray-700'>
						Data de Nascimento
					</label>
					<input
						type='date'
						id='birthDate'
						name='birthDate'
						value={formData.birthDate}
						onChange={handleChange}
						className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
					/>
				</div>

				{/* CEP */}
				<div className='mb-4'>
					<label htmlFor='cep' className='block text-sm font-medium text-gray-700'>
						CEP
					</label>
					<input
						type='text'
						id='cep'
						name='cep'
						maxLength='8'
						value={formData.cep}
						onChange={handleCepChange}
						className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
					/>
				</div>

				{/* Rua e Número */}
				<div className='mb-4 flex gap-4'>
					<div className='flex-1'>
						<label
							htmlFor='neighborhood'
							className='block text-sm font-medium text-gray-700'>
							Rua
						</label>
						<input
							type='text'
							id='neighborhood'
							name='neighborhood'
							value={formData.neighborhood}
							onChange={handleChange}
							className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
						/>
					</div>
					<div className='flex-1'>
						<label
							htmlFor='number'
							className='block text-sm font-medium text-gray-700'>
							Número
						</label>
						<input
							type='text'
							id='number'
							name='number'
							value={formData.number}
							onChange={handleChange}
							className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
						/>
					</div>
				</div>

				{/* Bairro, Cidade e Estado */}
				<div className='mb-4 flex gap-4'>
					<div className='flex-1'>
						<label
							htmlFor='neighborhood'
							className='block text-sm font-medium text-gray-700'>
							Bairro
						</label>
						<input
							type='text'
							id='neighborhood'
							name='neighborhood'
							value={formData.neighborhoody}
							onChange={handleChange}
							className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
						/>
					</div>
					<div className='flex-1'>
						<label
							htmlFor='city'
							className='block text-sm font-medium text-gray-700'>
							Cidade
						</label>
						<input
							type='text'
							id='city'
							name='city'
							value={formData.city}
							onChange={handleChange}
							className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
						/>
					</div>
					<div className='flex-1'>
						<label
							htmlFor='state'
							className='block text-sm font-medium text-gray-700'>
							Estado
						</label>
						<input
							type='text'
							id='state'
							name='state'
							maxLength='2'
							value={formData.state}
							onChange={handleChange}
							className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
						/>
					</div>
				</div>

				<div className='mb-6'>
					<button
						type='submit'
						className='text-sm w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200'>
						Criar Usuário
					</button>
				</div>
			</form>
		</main>
	);
}
