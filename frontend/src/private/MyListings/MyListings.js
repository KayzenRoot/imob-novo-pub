import React, { useEffect, useState } from "react";
import { getUserListings } from "../../services/profileService";

const MyListings = ({ userId, token }) => {
	const [properties, setProperties] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProperties = async () => {
			try {
				const userProperties = await getUserListings(userId, token);
				setProperties(userProperties);
			} catch (err) {
				setError(err.message);
			}
		};

		fetchProperties();
	}, [userId, token]); // Re-fetch quando userId ou token mudarem

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			<h2>Minhas Propriedades</h2>
			<ul>
				{properties.map((property) => (
					<li key={property.id}>{property.titulo}</li>
				))}
			</ul>
		</div>
	);
};

export default MyListings;
