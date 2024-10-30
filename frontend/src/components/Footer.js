import React, { useEffect, useState } from "react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const sections = [
	{
		title: "Institucional",
		links: [
			{ name: "Quem Somos", href: "/sobre" },
			{ name: "Blog", href: "/blog" },
			{ name: "Trabalhe Conosco", href: "#" },
			{ name: "Contato", href: "#" },
		],
	},
	{
		title: "Imóveis",
		links: [
			{ name: "Cadastre seu Imóvel", href: "#" },
			{ name: "Financiamento e Bancos", href: "#" },
			{ name: "Login do Corretor", href: "/login" }, // Este link será oculto se o usuário estiver logado
		],
	},
	{
		title: "Políticas",
		links: [
			{ name: "Política de Privacidade", href: "#" },
			{ name: "Termos de Serviço", href: "#" },
		],
	},
];

export default function Footer() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const user = localStorage.getItem("token");
		setUser(!!user);
	}, []);

	return (
		<footer className='text-gray-950'>
			<div className='max-w-6xl mx-auto px-4 py-16'>
				<div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
					{sections.map((section, index) => (
						<div key={index}>
							<h4 className='text-md font-semibold mb-4'>{section.title}</h4>
							<ul>
								{section.links.map((link, index) =>
									// Condicionalmente renderiza o link "Login do Corretor"
									link.name === "Login do Corretor" && user ? null : (
										<li key={index} className='mb-2'>
											<a
												href={link.href}
												className='cursor-pointer py-3 text-sm font-semibold border-b-[3px] border-b-transparent text-gray-600 hover:text-gray-950'>
												{link.name}
											</a>
										</li>
									)
								)}
							</ul>
						</div>
					))}
					<div>
						<h4 className='text-lg font-semibold mb-4'>Follow Us</h4>
						<div className='flex space-x-4'>
							<a href='#' className='text-gray-600 hover:text-gray-950'>
								<FaInstagram />
							</a>
							<a href='#' className='text-gray-600 hover:text-gray-950'>
								<FaTwitter />
							</a>
							<a href='#' className='text-gray-600 hover:text-gray-950'>
								<FaLinkedin />
							</a>
						</div>
					</div>
				</div>
				<div className='border-t border-gray-800 mt-8 pt-8 flex items-center justify-between'>
					<p className='py-3 text-sm font-semibold border-b-[3px] border-b-transparent text-gray-950'>
						&copy; Kroma Negócios Imobiliarios. Todos os direitos reservados.
					</p>
					<p className='py-3 text-sm font-semibold border-b-[3px] border-b-transparent text-gray-950'>
						Desenvolvido por{" "}
						<a className='text-red-600' href='#'>
							Kroma Digital
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
