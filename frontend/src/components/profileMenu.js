import React from "react";

export default function ProfileMenu({ activeSection, setActiveSection, onLogout }) {
	return (
		<nav className='w-1/5 bg-gray-100 p-4'>
			<h2 className='text-md font-semibold mb-4'>Menu Perfil</h2>
			<ul className='space-y-2'>
				<li>
					<button
						onClick={() => setActiveSection("profile")}
						className={`text-sm w-full text-left p-2 rounded ${
							activeSection === "profile" ? "bg-gray-300" : "text-gray-700"
						}`}>
						Perfil
					</button>
				</li>
				<li>
					<button
						onClick={() => setActiveSection("addProperty")}
						className={`text-sm w-full text-left p-2 rounded ${
							activeSection === "addProperty" ? "bg-gray-300" : "text-gray-700"
						}`}>
						Cadastrar Imóvel
					</button>
				</li>
				<li>
					<button
						onClick={() => setActiveSection("myListings")}
						className={`text-sm w-full text-left p-2 rounded ${
							activeSection === "myListings" ? "bg-gray-300" : "text-gray-700"
						}`}>
						Meus Imóveis
					</button>
				</li>
				<li>
					<button
						onClick={() => setActiveSection("downloads")}
						className={`text-sm w-full text-left p-2 rounded ${
							activeSection === "downloads" ? "bg-gray-300" : "text-gray-700"
						}`}>
						Downloads
					</button>
				</li>
			</ul>
			<p
				onClick={onLogout}
				className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer mt-4 text-center text-sm'>
				Deslogar
			</p>
		</nav>
	);
}
