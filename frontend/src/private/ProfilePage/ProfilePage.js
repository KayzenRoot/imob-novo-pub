import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateListing from "../../private/CreateListing/CreateListing";
import MyListings from "../../private/MyListings/MyListings";
import Spinner from "../../components/Spinner/Spinner";
import { doLogout } from "../../services/authService";
import { getProfile, updateProfile } from "../../services/profileService";

// Função para converter data do formato ISO para "DD/MM/YYYY"
const formatDateFromISO = (dateString) => {
	if (!dateString) return "";
	const date = new Date(dateString);
	if (isNaN(date)) return "";
	return `${String(date.getUTCDate()).padStart(2, "0")}/${String(
		date.getUTCMonth() + 1
	).padStart(2, "0")}/${date.getUTCFullYear()}`;
};

const Profile = () => {
	const [activeTab, setActiveTab] = useState("perfil");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [profileData, setProfileData] = useState({
		email: "",
		name: "",
		phone: "",
		street: "",
		city: "",
		state: "",
		zip: "",
		creci: "",
		birthdate: "",
	});
	const [passwordData, setPasswordData] = useState({
		currentPassword: "",
		newPassword: "",
	});
	const [listings, setListings] = useState([]);

	const navigate = useNavigate();

	const handleLogout = async () => {
		await doLogout();
		navigate("/login");
	};

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			setError("Usuário não autenticado.");
			setLoading(false);
			return;
		}

		getProfile(token)
			.then((profile) => {
				const formattedBirthdate = formatDateFromISO(profile.birthdate); // Formata a data
				setProfileData({ ...profile, birthdate: formattedBirthdate });
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});
	}, []);

	const handleProfileChange = (e) => {
		const { name, value } = e.target;
		setProfileData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleZipChange = (e) => {
		const { value } = e.target;
		setProfileData((prevData) => ({ ...prevData, zip: value }));

		// Simulando preenchimento de endereço
		if (value.length === 8) {
			setProfileData((prevData) => ({
				...prevData,
				address: "Endereço Preenchido",
				city: "Cidade Preenchida",
			}));
		}
	};

	const handlePasswordChange = (e) => {
		const { name, value } = e.target;
		setPasswordData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmitProfile = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");

		try {
			const isoBirthdate = profileData.birthdate.split("/").reverse().join("-");
			await updateProfile(token, { ...profileData, birthdate: isoBirthdate });
			alert("Perfil atualizado com sucesso!");
			setIsEditing(false);

			const updatedProfile = await getProfile(token);
			const formattedUpdatedBirthdate = formatDateFromISO(updatedProfile.birthdate);
			setProfileData({ ...updatedProfile, birthdate: formattedUpdatedBirthdate });
		} catch (error) {
			setError("Erro ao atualizar perfil: " + error.message);
		}
	};

	const handleSubmitPassword = async (e) => {
		e.preventDefault();
		// Implementar lógica para atualizar a senha se necessário
	};

	const handleEdit = (listingId) => {};

	const handleDelete = (listingId) => {};

	if (loading) {
		return <Spinner />;
	}

	return (
		<section className='flex-1 max-w-6xl mx-auto p-6'>
			{activeTab === "cadastrar" ? (
				<CreateListing />
			) : activeTab === "perfil" ? (
				<>
					<h1 className='text-xl text-center font-semibold mb-6'>Perfil</h1>
					<form onSubmit={handleSubmitProfile}>
						<ProfileInput name='name' value={profileData.name} readOnly />
						<ProfileInput name='email' value={profileData.email} readOnly />
						<ProfileInput
							name='phone'
							value={profileData.phone}
							onChange={isEditing ? handleProfileChange : undefined}
							editing={isEditing}
						/>
						<ProfileReadOnlyInput name='birthdate' value={profileData.birthdate} />
						<ProfileInput
							name='zip'
							value={profileData.zip}
							onChange={handleZipChange}
							editing={isEditing}
						/>
						<ProfileInput
							name='street'
							value={profileData.street}
							onChange={isEditing ? handleProfileChange : undefined}
							editing={isEditing}
						/>
						<ProfileInput
							name='city'
							value={profileData.city}
							onChange={isEditing ? handleProfileChange : undefined}
							editing={isEditing}
						/>
						<ProfileReadOnlyInput name='creci' value={profileData.creci} />

						<div className='flex justify-between whitespace-nowrap text-sm sm:text-sm mb-4'>
							<p className='flex items-center'>
								{isEditing
									? "Deseja salvar as informações?"
									: "Deseja editar as informações?"}
								<button
									type='button'
									className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'
									onClick={() => setIsEditing(!isEditing)}>
									{isEditing ? "Salvar" : "Editar"}
								</button>
							</p>
						</div>

						<h2 className='text-xl text-center font-semibold mb-6'>
							Troca de Senha
						</h2>
						<ProfilePasswordInput
							name='currentPassword'
							value={passwordData.currentPassword}
							onChange={handlePasswordChange}
						/>
						<ProfilePasswordInput
							name='newPassword'
							value={passwordData.newPassword}
							onChange={handlePasswordChange}
						/>
						<button
							type='submit'
							className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out'
							onClick={handleSubmitPassword}>
							Trocar Senha
						</button>
					</form>
				</>
			) : activeTab === "imoveis" ? (
				<MyListings listings={listings} onEdit={handleEdit} onDelete={handleDelete} />
			) : activeTab === "downloads" ? (
				<div className='mt-6'>
					<h2 className='text-2xl text-center font-semibold mb-6'>Downloads</h2>
					<p className='text-center'>
						Aqui você encontrará os arquivos disponíveis para download.
					</p>
				</div>
			) : null}
			{error && <div className='alert alert-danger'>{error}</div>}
		</section>
	);
};

// Componentes auxiliares para entradas
const ProfileInput = ({ name, value, onChange, editing, readOnly }) => (
	<input
		type='text'
		name={name}
		value={value}
		onChange={onChange}
		readOnly={readOnly || !editing}
		className={`mb-4 w-full px-4 py-2 text-sm text-gray-700 ${
			editing ? "bg-white" : "bg-gray-300"
		} border border-gray-300 rounded`}
		placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
	/>
);

const ProfileReadOnlyInput = ({ name, value }) => (
	<input
		type='text'
		name={name}
		value={value}
		readOnly
		className='mb-4 w-full px-4 py-2 text-sm text-gray-700 bg-gray-300 border border-gray-300 rounded'
		placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
	/>
);

const ProfilePasswordInput = ({ name, value, onChange }) => (
	<input
		type='password'
		name={name}
		value={value}
		onChange={onChange}
		className='mb-4 w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded'
		placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
	/>
);

export default Profile;
