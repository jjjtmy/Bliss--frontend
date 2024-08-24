import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useEffect, useState } from "react";
import { getUser, logoutUser, getUserRole } from "../service/users";

export default function NavBar() {
  const [user, setUser] = useState<string | null>(getUser());
  const [isClient, setIsClient] = useState<boolean>(false);
  const navigate = useNavigate();

  async function checkUserRole() {
    const role = await getUserRole();
    setIsClient(role === "client");
  }

  useEffect(() => {
    checkUserRole();
  }, []);

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
    if (isClient) {
      navigate("/myprofile");
    } else {
      navigate("/editvendorpage");
    }
  }

  async function handleMyWishlist() {
    navigate("/wishlist");
  }

  return (
    <div className="header">
      <h1 onClick={() => navigate("/")}>Bliss</h1>
      {user ? (
        <>
          <div className="title-container">
            <h3>Welcome, {user}!</h3>
            <button onClick={handleMyProfile}>My profile</button>
            {isClient ? (
              <button onClick={handleMyWishlist}>My wishlist</button>
            ) : null}
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
