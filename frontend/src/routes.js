import React from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";

// Estilização
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Profile from "./private/Profile/Profile";
import Home from "./public/Home/Home";
import Login from "./public/Login/Login";
import About from "./public/Sobre/About";
import Admin from "./private/Admin/Admin";
import Construtoras from "./public/Construtoras/Construtoras";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateListing from "./private/CreateListing/CreateListing";

function RoutesComponent() {
	const PrivateRoute = ({ children }) => {
		// Verifica se o usuário está autenticado com base no token
		return localStorage.getItem("token") ? children : <Navigate to='/login' replace />;
	};

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/sobre' element={<About />} />
				<Route path='/construtoras' element={<Construtoras />} />
				<Route
					path='/admin'
					element={
						<PrivateRoute>
							<Admin />
						</PrivateRoute>
					}
				/>
				<Route
					path='/perfil'
					element={
						<PrivateRoute>
							<Profile />
						</PrivateRoute>
					}
				/>
				<Route
					path='/create-property'
					element={
						<PrivateRoute>
							<CreateListing />
						</PrivateRoute>
					}
				/>
				{/* Redirecionar todas as rotas não existentes para a Home */}
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
			<Footer />
			<ToastContainer
				position='bottom-center'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
			/>
		</BrowserRouter>
	);
}

export default RoutesComponent;
