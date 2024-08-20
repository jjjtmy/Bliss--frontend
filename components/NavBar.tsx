import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useState } from "react";
import { getUser, logoutUser, getUserRole } from "../service/users";

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

  async function handleMyProfile() {
    const role = await getUserRole();
    role === "client" ? navigate("/myprofile") : navigate("/editvendorpage");
  }

  return (
    <div className="header">
      <h1 onClick={() => navigate("/")}>Bliss</h1>
      {user ? (
        <>
          <div className="title-container">
            <h3>Welcome, {user}!</h3>
            <button onClick={handleMyProfile}>My profile</button>
            <button className="button" onClick={handleLogOut}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <button className="button" onClick={handleLoginClick}>
          Login
        </button>
      )}
    </div>
  );
}
