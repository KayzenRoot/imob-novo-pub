import React, { useEffect, useState } from "react";
import { getProperties } from "../services/propertyService"; // Certifique-se de que esta função puxe os dados corretos do Firebase
import "swiper/swiper-bundle.css"; // Importando estilos do Swiper

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const PropertySlider = () => {
	const [properties, setProperties] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const fetchProperties = async () => {
			try {
				const data = await getProperties(); // Assumindo que isso retorna uma lista de imóveis do Firebase
				setProperties(data.slice(0, 5)); // Puxe apenas os 5 primeiros imóveis
			} catch (error) {
				console.error("Erro ao buscar propriedades:", error);
			}
		};

		fetchProperties();
	}, []);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % properties.length);
	};

	const prevSlide = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + properties.length) % properties.length
		);
	};

	return (
		<div className='max-w-6xl mx-auto px-4 py-16'>
			<div className='relative'>
				<div className='overflow-hidden'>
					<div
						className='flex transition-transform ease-in-out'
						style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
						{properties.length > 0 ? (
							properties.map((property) => (
								<div key={property.id} className='min-w-full'>
									{/* Carregando a imagem a partir do Firebase */}
									<img
										src={property.imageURL || "default-image-url.jpg"} // Presumindo que `imageURL` é o campo que contém a URL da imagem
										alt={property.title || "Imóvel sem título"}
										className='w-full h-64 object-cover'
									/>
									<div className='p-4'>
										<h2 className='text-lg font-semibold'>
											{property.title || "Título indisponível"}
										</h2>
										<p className='text-gray-700'>
											{property.neighborhood || "Bairro indisponível"} - R${" "}
											{property.salesPrice
												? property.salesPrice.toFixed(2)
												: "Preço indisponível"}
										</p>
									</div>
								</div>
							))
						) : (
							<div className='min-w-full p-4 text-center'>
								<p>Não há propriedades disponíveis no momento.</p>
							</div>
						)}
					</div>
				</div>
				<button
					onClick={prevSlide}
					className='absolute top-1/2 left-2 transform -translate-y-1/2 bg-black text-white p-2 rounded'>
					<FaAngleLeft />
				</button>
				<button
					onClick={nextSlide}
					className='absolute top-1/2 right-2 transform -translate-y-1/2 bg-black text-white p-2 rounded'>
					<FaAngleRight />
				</button>
			</div>
		</div>
	);
};

export default PropertySlider;
