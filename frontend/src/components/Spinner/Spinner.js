import React from "react";
import "./Spinner.css"; // Importando o arquivo CSS

export default function Spinner() {
	return (
		<div className='bg-black bg-opacity-50 flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50'>
			<div className='custom-loader'></div> {/* Adicionando a classe custom-loader */}
		</div>
	);
}
