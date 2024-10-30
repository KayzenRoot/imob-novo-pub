import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Make sure to import from 'react-router-dom'
import AdminMenu from "../components/AdminMenu";
import CreateBlogListing from "../private/CreateBlogListing/CreateBlogListing";
import NewUser from "../private/NewUser/NewUser";
import { doLogout } from "../services/authService";

export default function AdminControl() {
	const [activeSection, setActiveSection] = useState("dashboard");

	const navigate = useNavigate();

	const handleLogout = async () => {
		await doLogout();
		navigate("/login");
	};

	return (
		<div className='flex'>
			<AdminMenu
				activeSection={activeSection}
				setActiveSection={setActiveSection}
				onLogout={handleLogout}
			/>
			<div className='w-4/5 p-4'>
				{activeSection === "dashboard" && <h1>Dashboard Content Here</h1>}
				{activeSection === "usuarios" && <h1>Usuários Content Here</h1>}
				{activeSection === "imoveis" && <h1>Imóveis Content Here</h1>}
				{activeSection === "blog" && <CreateBlogListing />}
				{activeSection === "banner" && <h1>Banner Content Here</h1>}
				{activeSection === "midias sociais" && <h1>Mídias Sociais Content Here</h1>}
				{activeSection === "cadastroCorretor" && <NewUser />}
			</div>
		</div>
	);
}
