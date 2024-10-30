import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyA7PmA0etLhWGX2_r8kNnhydOTVl2VbKnw",
	authDomain: "kroma-imob-2024.firebaseapp.com",
	projectId: "kroma-imob-2024",
	storageBucket: "kroma-imob-2024.appspot.com",
	messagingSenderId: "698475779511",
	appId: "1:698475779511:web:e4adfe5aad608bb3e38432",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
