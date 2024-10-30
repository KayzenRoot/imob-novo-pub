import React from "react";
import { createRoot } from "react-dom/client";
import RoutesComponent from "./routes";

const root = createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<RoutesComponent />
	</React.StrictMode>
);
