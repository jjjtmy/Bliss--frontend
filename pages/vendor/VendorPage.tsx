import "./VendorPage.css";
import { Box, Button, Image } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVendorPage } from "../../service/vendors";
import { addToWishlist } from "../../service/users";
import NavBar from "../../components/NavBar";

import { useNavigate } from "react-router-dom";

export default function VendorPage() {
  const navigate = useNavigate();
  // const fetchData await getVendorPage(vendor) try catch fnally
  const { vendorID } = useParams();
  const [vendorDetails, setVendorDetails] = useState(null);

  // const handleClick = () => {
  //   const token = getToken();
  //   if (!token) {
  //     navigate("/login");
  //   } else {
  //     const role = JSON.parse(atob(token.split(".")[1])).payload.role;
  //     if (role === "client") {
  //       navigate("/addreview");
  //     } else if (role === "vendor") {
  //       console.log("Unauthorized");
  //     }
  //   }
  // };

  async function fetchData() {
    try {
      const vendor = await getVendorPage(vendorID);
      console.log(`vendorpage vendor`, vendor);
      setVendorDetails(vendor);
    } catch {
      console.error("Error fetching vendor details", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [vendorID]);

  if (!vendorDetails) {
    return <div>Loading...</div>;
  }

  const handleLike = (event) => {
    event.preventDefault();
    addToWishlist(vendorID);
  };

  return (
    <>
      <NavBar />
      <Box className="vendorContainer">
        <Image src={vendorDetails.image_url} alt="vendor" />
        <div className="details">
          <Button onClick={handleLike}>Like</Button>
          <Button
            onClick={() =>
              navigate("/addreview", {
                state: { vendorName: vendorDetails.Name },
              })
            }
          >
            Review a Venue
          </Button>
          <Box fw={700}>{vendorDetails.Name}</Box>
          <Box> {vendorDetails.Description}</Box>
          <Box>
            <p>
              Capacity: {vendorDetails.MinCap} to
              {vendorDetails.MaxCap}
            </p>
            <p>
              Price: {vendorDetails.MinPrice} to {vendorDetails.MaxPrice}
            </p>
          </Box>
          <Box>
            <p>Location: {vendorDetails.Location}</p>
            <p>Email: {vendorDetails.Email}</p>
            <p>Phone: {vendorDetails.Phone}</p>
          </Box>
          <Box className="reviews">
            Reviews
            {vendorDetails.reviews.map((review) => (
              <div>
                <p>{review.username} said:</p>
                <p>Cost per pax: {review.costperpax}</p>
                <p>Food: {review.food}</p>
                <p>Ambience: {review.ambience}</p>
                <p>Pre-wedding support: {review.preWeddingSupport}</p>
                <p>Day-of support: {review.dayOfSupport}</p>
                <p>Overall: {review.overall}</p>
                <p>Comments: {review.comments}</p>
              </div>
            ))}
          </Box>
        </div>
      </Box>
    </>
  );
}
