import React, { useState } from "react";
import { toast } from "react-toastify";
import * as propertyService from "../../services/propertyService";

export default function CreateListing() {
	const [selectedImages, setSelectedImages] = useState([]);
	const [isRental, setIsRental] = useState(false);
	const [isCondominium, setIsCondominium] = useState(false);
	const [description, setDescription] = useState("");
	const [addressDetails, setAddressDetails] = useState({
		zipCode: "",
		street: "",
		number: "",
		neighborhood: "",
		city: "",
		state: "",
	});

	const [propertyData, setPropertyData] = useState({
		title: "",
		salesPrice: "",
		rentPrice: "",
		category: "",
		typeOfProperty: "",
		bedrooms: "",
		suites: "",
		livingRooms: "",
		bathrooms: "",
		parkingSpaces: "",
		totalArea: "",
		builtArea: "",
		constructionYear: "",
		condominiumFee: "",
		iptu: "",
	});

	const handleImageChange = (e) => setSelectedImages(e.target.files);
	const handleChange = (e) =>
		setPropertyData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

	const validateForm = () => {
		if (!propertyData.title) {
			toast.error("O título é obrigatório.");
			return false;
		}
		if (!description.trim()) {
			toast.error("A descrição do imóvel é obrigatória.");
			return false;
		}
		if (!addressDetails.zipCode) {
			toast.error("O CEP é obrigatório.");
			return false;
		}
		if (isRental && (!propertyData.rentPrice || Number(propertyData.rentPrice) <= 0)) {
			toast.error("O valor de aluguel deve ser um número válido.");
			return false;
		}
		if (
			!isRental &&
			(!propertyData.salesPrice || Number(propertyData.salesPrice) <= 0)
		) {
			toast.error("O valor de venda deve ser um número válido.");
			return false;
		}
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) return;

		const token = localStorage.getItem("token");
		const formData = new FormData();

		formData.append("title", propertyData.title);
		formData.append("description", description);
		formData.append("category", propertyData.category);
		formData.append("zip", addressDetails.zipCode);
		formData.append("street", addressDetails.street);
		formData.append("number", addressDetails.number);
		formData.append("neighborhood", addressDetails.neighborhood);
		formData.append("city", addressDetails.city);
		formData.append("state", addressDetails.state);
		formData.append("bedrooms", Number(propertyData.bedrooms) || 0);
		formData.append("suites", Number(propertyData.suites) || 0);
		formData.append("livingRooms", Number(propertyData.livingRooms) || 0);
		formData.append("bathrooms", Number(propertyData.bathrooms) || 0);
		formData.append("parkingSpaces", Number(propertyData.parkingSpaces) || 0);
		formData.append("totalArea", Number(propertyData.totalArea) || 0);
		formData.append("builtArea", Number(propertyData.builtArea) || 0);
		formData.append("constructionYear", Number(propertyData.constructionYear) || 0);
		formData.append("isRental", isRental);
		formData.append("isSale", !isRental);
		formData.append("isCondominium", isCondominium);
		formData.append(
			"condominiumFee",
			isCondominium ? Number(propertyData.condominiumFee) || 0 : 0
		);
		formData.append("iptu", Number(propertyData.iptu) || 0);

		try {
			const response = await propertyService.createProperty(token, formData);
			const propertyId = response.id;

			const imageUrls = await Promise.all(
				Array.from(selectedImages).map((image) =>
					propertyService.uploadImageToFirestore(propertyId, image)
				)
			);

			await saveImageUrlsToDatabase(token, propertyId, imageUrls);

			toast.success("Imóvel cadastrado com sucesso!");
			resetForm();
		} catch (error) {
			console.log("Erro:", error);
			toast.error("Erro ao cadastrar imóvel: " + error.message);
		}
	};

	const saveImageUrlsToDatabase = async (token, propertyId, imageUrls) => {
		try {
			await propertyService.updatePropertyImages(token, propertyId, imageUrls);
		} catch (error) {
			console.log("Erro ao salvar URLs das imagens no MySQL:", error);
			toast.error("Erro ao salvar URLs das imagens no MySQL: " + error.message);
		}
	};

	const resetForm = () => {
		setPropertyData({
			title: "",
			salesPrice: "",
			rentPrice: "",
			category: "",
			typeOfProperty: "",
			bedrooms: "",
			suites: "",
			livingRooms: "",
			bathrooms: "",
			parkingSpaces: "",
			totalArea: "",
			builtArea: "",
			constructionYear: "",
			condominiumFee: "",
			iptu: "",
		});
		setAddressDetails({
			zipCode: "",
			street: "",
			number: "",
			neighborhood: "",
			city: "",
			state: "",
		});
		setDescription("");
		setSelectedImages([]);
		setIsRental(false);
		setIsCondominium(false);
	};

	const handleZipCodeChange = async (e) => {
		const zip = e.target.value;
		setAddressDetails((prev) => ({ ...prev, zipCode: zip }));

		if (zip.length === 8) {
			try {
				const response = await fetch(`https://viacep.com.br/ws/${zip}/json/`);
				const data = await response.json();
				if (!data.erro) {
					setAddressDetails((prev) => ({
						...prev,
						street: data.logradouro,
						neighborhood: data.bairro,
						city: data.localidade,
						state: data.uf,
					}));
				} else {
					toast.error("CEP não encontrado. Verifique o número.");
				}
			} catch {
				toast.error("Erro ao buscar o CEP.");
			}
		}
	};

	return (
		<main className='max-w-4xl mx-auto p-6'>
			<h1 className='text-xl text-center font-semibold mb-6'>Cadastrar Imóvel</h1>
			<form onSubmit={handleSubmit} encType='multipart/form-data'>
				{/* Título da Listagem */}
				<div className='mb-4'>
					<label
						htmlFor='listingTitle'
						className='block text-sm font-medium text-gray-700'>
						Título da Listagem
					</label>
					<input
						type='text'
						id='listingTitle'
						name='title'
						value={propertyData.title}
						onChange={handleChange}
						className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
						required
					/>
				</div>

				{/* Endereço */}
				<div className='mb-4'>
					<h4 className='mb-2 text-sm font-bold text-gray-700'>Endereço</h4>
					<label
						htmlFor='zipCode'
						className='block text-sm font-medium text-gray-700'>
						CEP
					</label>
					<input
						type='text'
						id='zipCode'
						value={addressDetails.zipCode}
						onChange={handleZipCodeChange}
						className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
						required
					/>

					{/* Outros campos de endereço */}
					<div className='grid grid-cols-3 gap-2 mt-2'>
						<div className='col-span-2'>
							<label
								htmlFor='street'
								className='block text-sm font-medium text-gray-700'>
								Rua
							</label>
							<input
								type='text'
								id='street'
								name='street'
								value={addressDetails.street}
								onChange={(e) =>
									setAddressDetails({
										...addressDetails,
										street: e.target.value,
									})
								}
								className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
								required
							/>
						</div>
						<div>
							<label
								htmlFor='number'
								className='block text-sm font-medium text-gray-700'>
								Número
							</label>
							<input
								type='text'
								id='number'
								name='number'
								maxLength='5'
								value={addressDetails.number}
								onChange={(e) =>
									setAddressDetails({
										...addressDetails,
										number: e.target.value,
									})
								}
								className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
								required
							/>
						</div>
					</div>

					<div className='grid grid-cols-3 gap-2 mt-2'>
						<div>
							<label
								htmlFor='neighborhood'
								className='block text-sm font-medium text-gray-700'>
								Bairro
							</label>
							<input
								type='text'
								id='neighborhood'
								name='neighborhood'
								value={addressDetails.neighborhood}
								onChange={(e) =>
									setAddressDetails({
										...addressDetails,
										neighborhood: e.target.value,
									})
								}
								className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
								required
							/>
						</div>
						<div>
							<label
								htmlFor='city'
								className='block text-sm font-medium text-gray-700'>
								Cidade
							</label>
							<input
								type='text'
								id='city'
								name='city'
								value={addressDetails.city}
								onChange={(e) =>
									setAddressDetails({ ...addressDetails, city: e.target.value })
								}
								className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
								required
							/>
						</div>
						<div>
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
								value={addressDetails.state}
								onChange={(e) =>
									setAddressDetails({ ...addressDetails, state: e.target.value })
								}
								className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
								required
							/>
						</div>
					</div>
				</div>

				{/* Dados Complementares */}
				<div className='mb-4'>
					<h4 className='mb-2 text-sm font-bold text-gray-700'>
						Dados Complementares
					</h4>
					<div className='grid grid-cols-5 gap-4'>
						{[
							"bedrooms",
							"suites",
							"livingRooms",
							"bathrooms",
							"parkingSpaces",
						].map((field) => (
							<div key={field}>
								<label
									htmlFor={field}
									className='block text-sm font-medium text-gray-700'>
									{field.charAt(0).toUpperCase() + field.slice(1)}
								</label>
								<input
									type='number'
									id={field}
									name={field}
									value={propertyData[field]}
									onChange={handleChange}
									className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
								/>
							</div>
						))}
					</div>
				</div>

				{/* Áreas */}
				<div className='mb-4'>
					<h4 className='mb-2 text-md font-bold text-gray-700'>Áreas</h4>
					<div className='grid grid-cols-5 gap-4'>
						{["totalArea", "builtArea", "constructionYear"].map((field) => (
							<div key={field}>
								<label
									htmlFor={field}
									className='block text-sm font-medium text-gray-700'>
									{field.charAt(0).toUpperCase() +
										field.slice(1).replace(/([A-Z])/g, " $1")}
								</label>
								<input
									type='text'
									id={field}
									name={field}
									value={propertyData[field]}
									onChange={handleChange}
									className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
								/>
							</div>
						))}
					</div>
				</div>

				{/* Categoria */}
				<div className='mt-4 mb-4'>
					<h4 className='mb-2 text-sm font-bold text-gray-700'>Categoria</h4>
					<div className='flex justify-between space-x-4'>
						{[
							"Comercial",
							"Residencial",
							"Comercial/Residencial",
							"Industrial",
							"Industrial/Comercial",
						].map((category) => (
							<label key={category} className='flex items-center'>
								<input
									type='radio'
									name='category'
									value={category}
									className='mr-2'
									onChange={handleChange}
								/>
								<span>{category}</span>
							</label>
						))}
					</div>
				</div>

				{/* Tipo de Imóvel */}
				<div className='mt-4 mb-4'>
					<h4 className='mb-2 text-sm font-bold text-gray-700'>Tipo de Imóvel</h4>
					<div className='flex justify-between space-x-4'>
						{["Terreno", "Área", "Casa", "Apartamento", "Chácara", "Sítio"].map(
							(propertyType) => (
								<label key={propertyType} className='flex items-center'>
									<input
										type='radio'
										name='typeOfProperty'
										value={propertyType}
										className='mr-2'
										onChange={handleChange}
									/>
									<span>{propertyType}</span>
								</label>
							)
						)}
					</div>
				</div>

				{/* Tipo de Negociação */}
				<div className='mb-4'>
					<h4 className='mb-2 text-sm font-bold text-gray-700'>Negociação</h4>
					<div className='flex items-center'>
						<input
							type='radio'
							id='forSale'
							name='negotiationType'
							value='sale'
							onChange={() => {
								setIsRental(false);
								setPropertyData((prev) => ({ ...prev, isSale: true }));
							}}
						/>
						<label htmlFor='forSale' className='ml-2'>
							Venda
						</label>

						<input
							type='radio'
							id='forRent'
							name='negotiationType'
							value='rent'
							className='ml-4'
							onChange={() => {
								setIsRental(true);
								setPropertyData((prev) => ({ ...prev, isSale: false }));
							}}
						/>
						<label htmlFor='forRent' className='ml-2'>
							Aluguel
						</label>
					</div>
				</div>

				{/* Valores */}
				<div className='mb-6 mt-4'>
					{isRental ? (
						<div className='mb-4'>
							<label
								htmlFor='rentPrice'
								className='block text-sm font-medium text-gray-700'>
								Valor de Aluguel
							</label>
							<input
								type='number'
								id='rentPrice'
								name='rentPrice'
								value={propertyData.rentPrice}
								onChange={handleChange}
								required
								className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
							/>
							<p className='text-sm text-gray-600'>p/mês</p>
						</div>
					) : (
						<div className='mb-4'>
							<label
								htmlFor='salesPrice'
								className='block text-sm font-medium text-gray-700'>
								Valor de Venda
							</label>
							<input
								type='number'
								id='salesPrice'
								name='salesPrice'
								value={propertyData.salesPrice}
								onChange={handleChange}
								min='50'
								max='400000000'
								required
								className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
							/>
						</div>
					)}
				</div>

				{/* Características do Imóvel */}
				<div className='mb-4'>
					<div className='flex items-center mb-4'>
						<span className='mr-2'>Imóvel em Condomínio?</span>
						<button
							type='button'
							onClick={() => {
								setIsCondominium(true);
								setPropertyData((prev) => ({
									...prev,
									condominiumFee: propertyData.condominiumFee || "",
								}));
							}}
							className={`ml-2 ${isCondominium === true ? "font-bold" : ""}`}>
							Sim
						</button>
						<button
							type='button'
							onClick={() => {
								setIsCondominium(false);
								setPropertyData((prev) => ({
									...prev,
									condominiumFee: 0,
									iptu: 0,
								}));
							}}
							className={`ml-4 ${isCondominium === false ? "font-bold" : ""}`}>
							Não
						</button>
					</div>
					{isCondominium && (
						<div className='mb-4'>
							<label
								htmlFor='condoFee'
								className='block text-sm font-medium text-gray-700'>
								Valor de Condomínio
							</label>
							<input
								type='number'
								id='condoFee'
								name='condominiumFee'
								value={propertyData.condominiumFee}
								onChange={handleChange}
								className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
							/>
						</div>
					)}
					<div className='mb-4'>
						<label
							htmlFor='iptu'
							className='block text-sm font-medium text-gray-700'>
							Valor de IPTU
						</label>
						<input
							type='number'
							id='iptu'
							name='iptu'
							value={propertyData.iptu}
							onChange={handleChange}
							required
							className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
						/>
					</div>
				</div>

				{/* Campo de Descrição */}
				<div className='mb-4'>
					<h4 className='mb-2 text-sm font-bold text-gray-700'>
						Descrição do Imóvel
					</h4>
					<textarea
						id='description'
						name='description'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
						rows='4'
						required
					/>
				</div>

				{/* Imagens */}
				<div className='mb-6 mt-4'>
					<p className='mb-2 text-sm font-bold text-gray-700'>Imagens</p>
					<p className='text-sm text-gray-600'>
						A primeira imagem será a capa (máx. 15)
					</p>
					<input
						type='file'
						id='images'
						accept='.jpg,.png,.jpeg'
						multiple
						required
						onChange={handleImageChange}
						className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
					/>
				</div>

				{/* Botão para criar a listagem */}
				<div className='mb-6'>
					<button
						type='submit'
						className='text-sm w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200'>
						Criar Listagem
					</button>
				</div>
			</form>
		</main>
	);
}
