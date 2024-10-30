import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "../components/profileMenu";
import { doLogout } from "../services/authService";

//pages
import ProfilePage from "../private/ProfilePage/ProfilePage";
import CreateListing from "../private/CreateListing/CreateListing";
import MyListings from "../private/MyListings/MyListings";
import Downloads from "../private/Downloads/Downloads";

export default function ProfileControl() {
	const [activeSection, setActiveSection] = useState("profile");

	const navigate = useNavigate();

	const handleLogout = async () => {
		await doLogout();
		navigate("/login");
	};

	return (
		<div className='flex'>
			<ProfileMenu
				activeSection={activeSection}
				setActiveSection={setActiveSection}
				onLogout={handleLogout}
			/>
			<div className='w-4/5 p-4'>
				{activeSection === "profile" && <ProfilePage />}
				{activeSection === "addProperty" && <CreateListing />}
				{activeSection === "myListings" && <MyListings />}
				{activeSection === "downloads" && <Downloads />}
			</div>
		</div>
	);
}
