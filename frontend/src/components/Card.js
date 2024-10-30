import React from "react";
import { InformationCircleIcon, EyeIcon, StarIcon } from "@heroicons/react/solid"; // Importando os ícones necessários

const iconMap = {
	Missão: <InformationCircleIcon className='h-6 w-6 text-white' />,
	Visão: <EyeIcon className='h-6 w-6 text-white' />,
	Valores: <StarIcon className='h-6 w-6 text-white' />,
};

export default function Card({ title, content }) {
	return (
		<div className='bg-white rounded-lg shadow-md p-6 text-center flex flex-col justify-between'>
			<div className='flex justify-center mb-4'>
				<div className='bg-blue-500 rounded-full p-2 flex items-center justify-center'>
					{iconMap[title]} {/* Renderizando o ícone correspondente */}
				</div>
			</div>
			<h3 className='text-lg font-semibold mb-2'>{title}</h3>
			<p className='text-sm text-gray-700'>{content}</p>
		</div>
	);
}
