import { UIProvider } from "@yamada-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./AppShow/Home";
import About from "./AppShow/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Kazyougaki from "./AppShow/Kazyougaki";

function App() {
  return (
    <div>
      <UIProvider>
        <BrowserRouter>
          <Header />
          <br />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<h1>Not Found Page</h1>} />
            <Route path="/Kazyougaki" element={<Kazyougaki />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UIProvider>
    </div>
  );
}

export default App;
