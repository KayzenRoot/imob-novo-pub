import moment from "moment"; // Certifique-se de importar moment
import "moment/locale/pt-br"; // Importar locale em português
import Moment from "react-moment"; // Supondo que você esteja usando react-moment
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

moment.locale("pt-br");

export default function ListingItem({ listing, id, onEdit, onDelete }) {
	const formatCurrency = (value) => {
		return `R$ ${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0,00"}`;
	};

	// Log para verificar dados
	console.log("ListingItem - listing:", listing);

	// Verifique se listing e suas propriedades estão definidos
	if (!listing || !listing.imgUrls || !listing.imgUrls.length) {
		return <p>Listagem indisponível.</p>; // Retornar algo enquanto listagem não está disponível
	}

	return (
		<li className='relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]'>
			<Link className='contents' to={`/category/${listing.type}/${id}`}>
				<img
					className='h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in'
					loading='lazy'
					src={listing.imgUrls[0] || ""} // Verifique se a URL está correta e use uma string vazia como fallback
					alt={listing.name || "Imagem da listagem"} // Adicione um alt apropriado para acessibilidade
				/>
				<Moment
					className='absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg'
					fromNow>
					{listing.timestamp?.toDate() || "Data não disponível"}{" "}
					{/* Verifique se timestamp está definido */}
				</Moment>
				<div className='w-full p-[10px]'>
					<div className='flex items-center space-x-1'>
						<MdLocationOn className='h-4 w-4 text-green-600' />
						<p className='font-semibold text-sm mb-[2px] text-gray-600 truncate'>
							{listing.neighborhood || "Bairro não informado"}
						</p>
					</div>
					<p className='font-semibold m-0 text-xl truncate'>
						{listing.name || "Nome da listagem indisponível"}
					</p>
					<p className='text-[#457b9d] mt-2 font-semibold'>
						{listing.offer
							? formatCurrency(listing.discountedPrice)
							: formatCurrency(listing.regularPrice)}
						{listing.type === "rent" && " / mês"}
					</p>
					<div className='flex items-center mt-[10px] space-x-3'>
						<div className='flex items-center space-x-1'>
							<p className='font-bold text-xs'>
								{listing.bedrooms > 1 ? `${listing.bedrooms} Dorms` : "1 Dorm"}{" "}
								{/* Adicione um fallback caso seja undefined */}
							</p>
						</div>
						<div className='flex items-center space-x-1'>
							<p className='font-bold text-xs'>
								{listing.bathrooms > 1
									? `${listing.bathrooms} Banheiros`
									: "1 Banheiro"}{" "}
								{/* Adicione um fallback caso seja undefined */}
							</p>
						</div>
					</div>
				</div>
			</Link>
			{onDelete && (
				<FaTrash
					className='absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500'
					onClick={() => onDelete(listing.id)}
				/>
			)}
			{onEdit && (
				<MdEdit
					className='absolute bottom-2 right-7 h-4 cursor-pointer'
					onClick={() => onEdit(listing.id)}
				/>
			)}
		</li>
	);
}
