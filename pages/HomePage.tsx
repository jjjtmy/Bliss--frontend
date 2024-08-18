import "./HomePage.css";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { getToken } from "../util/security";

export default function HomePage(): JSX.Element {
  const navigate = useNavigate();
  const handleClick = () => {
    const token = getToken();
    if (!token) {
      navigate("/login");
    } else {
      const role = JSON.parse(atob(token.split(".")[1])).payload.role;
      if (role === "client") {
        navigate("/addreview");
      } else if (role === "vendor") {
        console.log("Unauthorized");
      }
    }
  };

  return (
    <div className="container">
      <NavBar />
      <div className="Header">
        <h1>Bliss</h1>
        <h2>Make the most of your big day</h2>
        <div className="button-container">
          <button className="Buttons">Find a Venue</button>
          <button className="Buttons" onClick={handleClick}>
            Review a Venue
          </button>
        </div>
      </div>
    </div>
  );
}
