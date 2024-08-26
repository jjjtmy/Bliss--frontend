import "./HomePage.css";

import { useNavigate } from "react-router-dom";

export default function HomePage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="homepageHeader">
        <h1>Make the most</h1>
        <h1> of your big day</h1>
        <h3> Let us help you every step of the way</h3>
        <button className="button" onClick={() => navigate("/explore")}>
          Find a Venue
        </button>
      </div>
    </div>
  );
}
