import "./HomePage.css";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
export default function HomePage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="container">
      <NavBar />
      <div className="Header">
        <h1>Make the most</h1>
        <h1> of your big day</h1>
        <h3> Let us help you every step of the way</h3>
        <button className="Buttons" onClick={() => navigate("/explore")}>
          Find a Venue
        </button>
      </div>
    </div>
  );
}
