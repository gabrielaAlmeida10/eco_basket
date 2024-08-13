import "./App.css";
import Footer from "./components/Footer/footer";
import Home from "./components/Home/home";
import Menu from "./components/Menu/menu";

function App() {
  return (
    <div className="App">
      <Menu />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
