// src/App.js
import "./App.css";
import Footer from "./components/Footer/footer";
import Menu from "./components/Menu/menu";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import './firebase/firebaseConfig'; // Importa o arquivo firebase para garantir que o Firebase seja inicializado

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
