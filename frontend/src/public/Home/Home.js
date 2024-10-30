import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ListingItem from "../../components/ListingItem";
import PostCard from "../../components/PostCard";
import Slider from "../../components/Slider";
import Card from "../../components/Card";

export default function Home() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulação de buscar dados
		const fetchData = async () => {
			setLoading(false);
		};

		fetchData();
	}, []);

	// Exemplo de dados simulados para listings e posts
	const listings = [
		{ id: "1", data: { type: "apartamento", title: "Apartamento 1" } },
		{ id: "2", data: { type: "casa", title: "Casa 1" } },
		// adicione mais listings se necessário
	];

	const posts = [
		{ id: "1", data: { title: "Post 1", content: "Conteúdo do post 1" } },
		{ id: "2", data: { title: "Post 2", content: "Conteúdo do post 2" } },
		{ id: "3", data: { title: "Post 3", content: "Conteúdo do post 3" } },
	];

	return (
		<div>
			<Slider />
			<div className='max-w-6xl px-3 mt-6 mx-auto'>
				{!loading && listings.length > 0 && (
					<>
						<h2 className='text-2xl text-center font-semibold mb-6'>
							Últimos Imóveis Cadastrados
						</h2>
						<ul className='sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
							{listings.map((listing) => (
								<li
									key={listing.id}
									onClick={() =>
										navigate(`/category/${listing.data.type}/${listing.id}`)
									}>
									<ListingItem id={listing.id} listing={listing.data} />
								</li>
							))}
						</ul>
					</>
				)}
			</div>

			{/* Seção para os últimos posts */}
			<div className='max-w-6xl px-3 mt-10 mx-auto'>
				<h2 className='text-2xl text-center font-semibold mb-6'>Últimos Posts</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{posts.map((post) => (
						<div
							key={post.id}
							className='cursor-pointer'
							onClick={() => navigate(`/posts/${post.id}`)}>
							<PostCard post={post} />
						</div>
					))}
				</div>
			</div>

			{/* Seção de Missão, Visão e Valores */}
			<div className='max-w-6xl px-3 mt-10 mx-auto'>
				<h2 className='text-2xl text-center font-semibold mb-6'>
					Missão, Visão e Valores
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					<Card
						title='Missão'
						content='Nossa missão é transformar o mercado imobiliário, proporcionando uma experiência única e confiável para nossos usuários.'
					/>
					<Card
						title='Visão'
						content='Ser a principal plataforma de imóveis do Brasil, reconhecida por nossa inovação e excelência no atendimento.'
					/>
					<Card
						title='Valores'
						content='Transparência, compromisso com a qualidade e foco na satisfação do cliente.'
					/>
				</div>
			</div>
		</div>
	);
}
