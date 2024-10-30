import React from "react";

const Construtoras = () => {
	return (
		<div className='max-w-6xl mx-auto px-4 mt-10'>
			<div className='flex border p-4'>
				{/* Div da imagem logo da construtora */}
				<div className='w-1/3'>
					<img
						src='URL_DO_LOGO_DA_CONSTRUTORA'
						alt='Logo da Construtora'
						className='w-full h-auto'
					/>
				</div>
				{/* Div do texto sobre a construtora */}
				<div className='w-2/3 pl-4'>
					<h2 className='text-2xl font-bold mb-6'>Longitude</h2>
					<p className='text-sm text-gray-700 mt-2 mb-4'>
						Aqui vai um texto falando sobre a construtora. Você pode incluir
						informações sobre sua história, missão e projetos.
					</p>
					<div className='flex justify-center'>
						<a
							href='URL_DOS_EMPREENDIMENTOS'
							className='mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded'>
							Ver Empreendimentos
						</a>
					</div>
				</div>
			</div>
			<div className='flex border p-4'>
				{/* Div da imagem logo da construtora */}
				<div className='w-1/3'>
					<img
						src='URL_DO_LOGO_DA_CONSTRUTORA'
						alt='Logo da Construtora'
						className='w-full h-auto'
					/>
				</div>
				{/* Div do texto sobre a construtora */}
				<div className='w-2/3 pl-4'>
					<h2 className='text-2xl font-bold mb-6'>Vic Engenharia</h2>
					<p className='text-sm text-gray-700  mt-2 mb-4'>
						Aqui vai um texto falando sobre a construtora. Você pode incluir
						informações sobre sua história, missão e projetos.
					</p>
					<div className='flex justify-center'>
						<a
							href='URL_DOS_EMPREENDIMENTOS'
							className='mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded'>
							Ver Empreendimentos
						</a>
					</div>
				</div>
			</div>
			<div className='flex border p-4'>
				{/* Div da imagem logo da construtora */}
				<div className='w-1/3'>
					<img
						src='URL_DO_LOGO_DA_CONSTRUTORA'
						alt='Logo da Construtora'
						className='w-full h-auto'
					/>
				</div>
				{/* Div do texto sobre a construtora */}
				<div className='w-2/3 pl-4'>
					<h2 className='text-2xl font-bold mb-6'>Mark Invest</h2>
					<p className='text-sm text-gray-700 mt-2 mb-4'>
						Aqui vai um texto falando sobre a construtora. Você pode incluir
						informações sobre sua história, missão e projetos.
					</p>
					<div className='flex justify-center'>
						<a
							href='URL_DOS_EMPREENDIMENTOS'
							className='mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded'>
							Ver Empreendimentos
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Construtoras;
