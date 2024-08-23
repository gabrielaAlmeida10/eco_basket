// src/App.js
import "./App.css";
import Footer from "./components/Footer/footer";
import Menu from "./components/Menu/menu";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import './firebase/firebaseConfig'; 

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Menu />
        <div className="main-content">
          <Routes />
        </div>
        <Footer className='footer'/>
      </BrowserRouter>
    </div>
  );
}

export default App;
