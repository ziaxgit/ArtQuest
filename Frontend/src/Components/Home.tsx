import { clearExhibitionsFromLocalStorage } from "../utils/exhibitionStorage";
import { Container } from "react-bootstrap";

import "../index.css";
import HeroSection from "./HeroSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <button
        onClick={() => clearExhibitionsFromLocalStorage()}
        className="mb-3"
      >
        Reset Local Cache
      </button>
    </div>
  );
}
