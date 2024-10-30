import React from "react";
import ListingItem from "./ListingItem"; // Certifique-se de que o caminho está correto

export default function PropertyList({ listings, onEdit, onDelete }) {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
			{listings.length === 0 ? (
				<p className='col-span-3 text-center text-gray-600'>
					Nenhum imóvel cadastrado.
				</p>
			) : (
				listings.map((listing) => (
					<ListingItem
						key={listing.id}
						listing={listing}
						id={listing.id}
						onEdit={onEdit}
						onDelete={onDelete}
					/>
				))
			)}
		</div>
	);
}
