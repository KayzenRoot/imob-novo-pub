import React from "react";

export default function AdminMenu({ activeSection, setActiveSection, onLogout }) {
	return (
		<nav className='w-1/5 bg-gray-100 p-4'>
			<h2 className='text-md font-semibold mb-4'>Menu Admin</h2>
			<ul className='space-y-2'>
				<li>
					<button
						onClick={() => setActiveSection("dashboard")}
						className={`text-sm w-full text-left p-2 rounded ${
							activeSection === "dashboard" ? "bg-gray-300" : "text-gray-700"
						}`}>
						Dashboard
					</button>
				</li>
				<li>
					<button
						onClick={() => setActiveSection("usuarios")}
						className={`text-sm w-full text-left p-2 rounded ${
							activeSection === "usuarios" ? "bg-gray-300" : "text-gray-700"
						}`}>
						Usuários
					</button>
				</li>
				<li>
					<button
						onClick={() => setActiveSection("imoveis")}
						className={`text-sm w-full text-left p-2 rounded ${
							activeSection === "imoveis" ? "bg-gray-300" : "text-gray-700"
						}`}>
						Imóveis
					</button>
				</li>
				<li>
					<button
						onClick={() => setActiveSection("blog")}
						className={`text-sm w-full text-left p-2 rounded ${
							activeSection === "blog" ? "bg-gray-300" : "text-gray-700"
						}`}>
						Blog
					</button>
				</li>
				<li>
					<button
						onClick={() => setActiveSection("banner")}
						className={`text-sm w-full text-left p-2 rounded ${
							activeSection === "banner" ? "bg-gray-300" : "text-gray-700"
						}`}>
						Banner
					</button>
				</li>
				<li>
					<button
						onClick={() => setActiveSection("midias sociais")}
						className={`text-sm w-full text-left p-2 rounded ${
							activeSection === "midias sociais" ? "bg-gray-300" : "text-gray-700"
						}`}>
						Mídias Sociais
					</button>
				</li>
				<li>
					<button
						onClick={() => setActiveSection("cadastroCorretor")}
						className={`text-sm w-full text-left p-2 rounded ${
							activeSection === "cadastroCorretor"
								? "bg-gray-300"
								: "text-gray-700"
						}`}>
						Cadastro de Corretor
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
