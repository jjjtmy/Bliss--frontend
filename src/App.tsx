import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/login/LoginPage";
import SignUpPage from "../pages/login/SignUpPage";
import SignUpPageVendor from "../pages/vendor/SignUpPageVendor";
import AddReviewPage from "../pages/user/AddReviewPage";
import EditVendorPage from "../pages/vendor/EditVendorPage";
import VendorPage from "../pages/vendor/VendorPage";
import UserProfilePage from "../pages/user/UserProfilePage";
import ExplorePage from "../pages/ExplorePage";
import MyProfilePage from "../pages/user/MyProfilePage";
import WishlistPage from "../pages/user/WishlistPage";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function App() {
  return (
    <MantineProvider>
      <main className="App">
        <NavBar />;
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signupvendor" element={<SignUpPageVendor />} />
          <Route path="/addreview" element={<AddReviewPage />} />
          <Route path="/editvendorpage" element={<EditVendorPage />} />
          <Route path="/vendors/:vendorID" element={<VendorPage />} />
          <Route path="/users/:userID" element={<UserProfilePage />} />
          <Route path="/myprofile" element={<MyProfilePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
        <Footer />;
      </main>
    </MantineProvider>
  );
}

export default App;
