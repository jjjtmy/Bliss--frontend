import "./UserProfilePage.css";
import { Box } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { getUserfromID } from "../../service/users";
import { getReviewsByUser, getVendorPage } from "../../service/vendors";

export default function UserProfilePage() {
  const { userID } = useParams();
  const [userDetails, setUserDetails] = useState({});

  async function fetchData() {
    try {
      const user = await getUserfromID(userID);
      const reviews = await getReviewsByUser(userID);
      console.log("getReviewsByUser reviews", reviews);
      const vendor = await getVendorPage(reviews.vendorID);
      setUserDetails({
        ...userDetails,
        name: user.name,
        reviews: reviews.userReviewsArray,
        vendor: vendor.Name,
      });
    } catch {
      console.error("Error fetching user details");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  //to see what is in userDetails
  useEffect(() => {
    console.log("userDetails", userDetails);
  }, [userDetails]);

  return (
    <>
      <NavBar />
      <Box className="vendorContainer">
        <div className="details">
          <Box>Profile Picture goes here</Box>
          <Box>{userDetails.name}</Box>
          <Box>
            Reviews
            {userDetails.reviews.map((review) => (
              <div>
                <p>Venue: {userDetails.vendor}</p>
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
