import "./App.css";
import Footer from "./components/Footer/footer";
// import Home from "./components/Home/home";
// import  Produtcs from './components/Products/products';
import Menu from "./components/Menu/menu";

import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    // <div className="App">
    //   <Menu />

    //   <Footer />
    // </div>
    <BrowserRouter>
      <Menu />
      <Routes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
