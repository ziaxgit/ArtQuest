import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Collections from "./Components/Collections";
import Exhibitions from "./Components/Exhibitions";
import ArtList from "./Components/ArtList";
import ChicagoArtList from "./Components/ChicagoArtList";
import ExhibitionDetail from "./Components/ExhibitionDetail";
import Explore from "./Components/Explore";
import Footer from "./Components/Footer";

const App: React.FC = () => {
  return (
    <section className="app-container">
      <NavBar />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/exhibitions" element={<Exhibitions />} />
          <Route path="/explore" element={<Explore />} />
          <Route
            path="/exhibitions/:exhibitionName"
            element={<ExhibitionDetail />}
          />

          <Route path={"/clevelandmuseum"} element={<ArtList />} />
          <Route path={"/artwork/:artId"} element={<Collections />} />
          <Route path={"chichagoart"} element={<ChicagoArtList />} />
        </Routes>
      </main>
      <Footer />
    </section>
  );
};

export default App;
