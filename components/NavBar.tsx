import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useState } from "react";
import { getUser, logoutUser } from "../service/users";

export default function NavBar() {
  const [user, setUser] = useState<string | null>(getUser());

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  async function handleLogOut() {
    const user = await logoutUser(); //returns username
    console.log("user", user);
    setUser(user);
    navigate("/");
  }
  return (
    <div className="header">
      <h1 onClick={() => navigate("/")}>Bliss</h1>
      {user ? (
        <>
          <div className="title-container">
            <h3>Welcome, {user}!</h3>
          </div>
          <button className="button" onClick={handleLogOut}>
            Logout
          </button>
        </>
      ) : (
        <button className="button" onClick={handleLoginClick}>
          Login
        </button>
      )}
    </div>
  );
}
