import "./HomePage.css";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
export default function HomePage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="container">
      <NavBar />
      <div className="Header">
        <h1>Bliss</h1>
        <h2>Make the most of your big day</h2>
        <div className="button-container">
          <button className="Buttons" onClick={() => navigate("/explore")}>
            Find a Venue
          </button>
        </div>
      </div>
    </div>
  );
}
