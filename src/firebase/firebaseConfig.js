import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCyuXUdufYsi36HlunlXcjgbnXnNcTOHyg",
  authDomain: "ecobasket-36c62.firebaseapp.com",
  projectId: "ecobasket-36c62",
  storageBucket: "ecobasket-36c62.appspot.com",
  messagingSenderId: "348931516716",
  appId: "1:348931516716:web:3274207124dcd699ea2489",
  measurementId: "G-3RM66111KS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


export default app;