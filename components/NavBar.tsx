import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useEffect, useState } from "react";
import { getUser, logoutUser, getUserRole } from "../service/users";
import { Drawer, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function NavBar() {
  const [user, setUser] = useState<string | null>(getUser());
  const [isClient, setIsClient] = useState<boolean>(false);
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  async function checkUserRole() {
    const role = await getUserRole();
    console.log("role", role);
    console.log("user", user);
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
    close();
    if (isClient) {
      navigate("/myprofile");
    } else {
      navigate("/editvendorpage");
    }
  }

  async function handleMyWishlist() {
    close();
    navigate("/wishlist");
  }

  return (
    <div className="header">
      <h1 onClick={() => navigate("/")}>Bliss</h1>
      {user ? (
        <>
          <div className="header">
            <Drawer
              opened={opened}
              onClose={close}
              position="right"
              size="xs"
              className="drawer"
            >
              <h5>Welcome, {user}!</h5>
              <div className="divider">
                <button className="navbuttons" onClick={handleMyProfile}>
                  My profile
                </button>
                {isClient ? (
                  <button className="navbuttons" onClick={handleMyWishlist}>
                    My wishlist
                  </button>
                ) : null}
              </div>
            </Drawer>
            <Burger onClick={open} size="xl" mr={20} />
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
