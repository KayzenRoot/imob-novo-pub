import React from "react";
import ReactQuill from "react-quill";
import { ToastContainer, toast } from "react-toastify"; // Importando toast
import "react-toastify/dist/ReactToastify.css"; // Estilos do toast

// Função para formatar a data para o padrão brasileiro
const formatDateToBrazilian = () => {
	const now = new Date();
	const options = { day: "2-digit", month: "2-digit", year: "numeric" };
	return now.toLocaleDateString("pt-BR", options);
};

export default function CreateBlogListing() {
	const [form, setForm] = React.useState({});
	const [loading, setLoading] = React.useState(false);

	const onChange = () => {};

	const setContent = () => {};

	const onSubmit = async () => {};

	return (
		<div className='max-w-6xl mx-auto px-4 py-2'>
			<main className='max-w-[100%] px-2 mx-auto'>
				<h1 className='text-md justify-center items-center flex font-semibold mb-4'>
					Novo Post
				</h1>

				<form onSubmit={onSubmit}>
					{/* Título */}
					<div className='mb-4'>
						<h4 className='mb-2 text-sm font-bold text-gray-700'>Título do Post</h4>
						<input
							type='text'
							id='title'
							onChange={onChange}
							className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
							required
						/>
					</div>

					{/* Imagem do Post */}
					<div className='mb-4'>
						<h4 className='mb-2 text-sm font-bold text-gray-700'>Imagem do Post</h4>
						<input
							type='file'
							id='postImage'
							onChange={onChange}
							accept='.jpg,.jpeg,.png,.webp' // Permissões de arquivos
							required
							className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
						/>
					</div>

					{/* Categoria */}
					<div className='mb-4'>
						<h4 className='mb-2 text-sm font-bold text-gray-700'>Categoria</h4>
						<select
							id='category'
							onChange={onChange}
							className='text-sm block border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
							required>
							<option value=''>Selecione uma Categoria</option>
							<option value='Tecnologia'>Mercado Imobiliário</option>
						</select>
					</div>

					{/* Autor */}
					<div className='mb-4'>
						<h4 className='mb-2 text-sm font-bold text-gray-700'>Autor</h4>
						<input
							type='text'
							id='author'
							onChange={onChange}
							className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
							required
						/>
					</div>

					{/* Imagem do Autor */}
					<div className='mb-4'>
						<h4 className='mb-2 text-sm font-bold text-gray-700'>
							Imagem do Autor (opcional)
						</h4>
						<input
							type='file'
							id='authorImage'
							onChange={onChange}
							accept='.jpg,.jpeg,.png,.webp' // Permissões de arquivos
							className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
						/>
					</div>

					{/* Tempo de leitura */}
					<div className='mb-4'>
						<h4 className='mb-2 text-sm font-bold text-gray-700'>
							Tempo de Leitura (minutos)
						</h4>
						<input
							type='number'
							id='readingTime'
							onChange={onChange}
							min='1'
							className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
							required
						/>
					</div>

					{/* Conteúdo do Post */}
					<div className='mb-4'>
						<h4 className='mb-2 text-sm font-bold text-gray-700'>
							Conteúdo do Post
						</h4>
						<ReactQuill
							onChange={setContent}
							className='text-sm border border-gray-300 rounded-md'
							theme='snow'
							required
						/>
					</div>

					{/* Tags */}
					<div className='mb-4'>
						<h4 className='mb-2 text-sm font-bold text-gray-700'>Tags</h4>
						<input
							type='text'
							id='tags'
							onChange={onChange}
							placeholder='Separe as tags com vírgulas'
							className='text-sm mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500'
						/>
					</div>

					{/* Botão para criar a listagem de blog */}
					<div className='mb-6 text-sm'>
						<button
							type='submit'
							disabled={loading}
							className='text-sm w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200'>
							{loading ? "Criando..." : "Criar Post"}
						</button>
					</div>
				</form>
			</main>
			<ToastContainer /> {/* Adicionando o ToastContainer */}
		</div>
	);
}
