import React from "react";
import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import webfont from "webfontloader";
import Home from "./component/Home/Home.js";

function App() {
  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
