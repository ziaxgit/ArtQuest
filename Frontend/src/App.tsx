import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Collections from "./Components/Collections";
import Exhibitions from "./Components/Exhibitions";
import ArtList from "./Components/ArtList";
import ChicagoArtList from "./Components/ChicagoArtList";
import ExhibitionDetail from "./Components/ExhibitionDetail";

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/exhibitions" element={<Exhibitions />} />
        <Route
          path="/exhibitions/:exhibitionName"
          element={<ExhibitionDetail />}
        />

        <Route path={"/clevelandmuseum"} element={<ArtList />} />
        <Route path={"/artwork/:artId"} element={<Collections />} />
        <Route path={"chichagoart"} element={<ChicagoArtList />} />
      </Routes>
    </>
  );
};

export default App;
