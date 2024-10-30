import { useLocation, useNavigate } from "react-router";
import Logo from "../assets/Logo.png";

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();

	function pathMatchRoute(route) {
		return route === location.pathname;
	}

	// Função para verificar se o usuário está logado e obter os dados do usuário
	const isLoggedIn = localStorage.getItem("token") !== null; // Verifica se o token existe
	const userEmail = localStorage.getItem("userEmail"); // Supondo que o email do usuário está salvo no localStorage

	return (
		<div className='bg-white border-b shadow-sm sticky top-0 z-40'>
			<header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
				<div>
					<img
						src={Logo}
						alt='logo'
						className='h-20 cursor-pointer'
						onClick={() => navigate("/")}
					/>
				</div>
				<div className='flex w-1/3 mx-4'>
					<input
						type='text'
						placeholder='Pesquisar...'
						className='text-sm border border-gray-300 rounded-full py-1 px-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500'
					/>
				</div>
				<div>
					<ul className='flex space-x-10'>
						<li
							className={`cursor-pointer py-3 text-sm font-semibold text-gray-400
                    border-b-[3px] border-b-transparent
                     ${pathMatchRoute("/") && "text-black border-b-red-500"}`}
							onClick={() => navigate("/")}>
							Home
						</li>
						<li
							className={`cursor-pointer py-3 text-sm font-semibold text-gray-400
                    border-b-[3px] border-b-transparent
                     ${pathMatchRoute("/imoveis") && "text-black border-b-red-500"}`}
							onClick={() => navigate("/imoveis")}>
							Imóveis
						</li>
						<li
							className={`cursor-pointer py-3 text-sm font-semibold text-gray-400
                    border-b-[3px] border-b-transparent
                     ${pathMatchRoute("/blog") && "text-black border-b-red-500"}`}
							onClick={() => navigate("/blog")}>
							Blog
						</li>
						<li
							className={`cursor-pointer py-3 text-sm font-semibold text-gray-400
                    border-b-[3px] border-b-transparent
                     ${pathMatchRoute("/construtoras") && "text-black border-b-red-500"}`}
							onClick={() => navigate("/construtoras")}>
							Construtoras
						</li>
						<li
							className={`cursor-pointer py-3 text-sm font-semibold text-gray-400
                    border-b-[3px] border-b-transparent
                     ${pathMatchRoute("/contato") && "text-black border-b-red-500"}`}
							onClick={() => navigate("/contato")}>
							Contato
						</li>
						{/* Verifica se o usuário está logado e se o e-mail do usuário é o específico */}
						{isLoggedIn && (
							<>
								<li
									className={`cursor-pointer py-3 text-sm font-semibold text-gray-400
                             border-b-[3px] border-b-transparent
                             ${
											pathMatchRoute("/perfil") &&
											"text-black border-b-red-500"
										}`}
									onClick={() => navigate("/perfil")}>
									Perfil
								</li>
								{userEmail === "csn1985@gmail.com" && (
									<li
										className={`cursor-pointer py-3 text-sm font-semibold text-gray-400
                             border-b-[3px] border-b-transparent
                             ${
											pathMatchRoute("/admin") && "text-black border-b-red-500"
										}`}
										onClick={() => navigate("/admin")}>
										Admin
									</li>
								)}
							</>
						)}
					</ul>
				</div>
			</header>
		</div>
	);
};

export default Header;
