// import "./UserProfilePage.css";
import { Box, Card } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserfromID } from "../../service/users";
import { getReviewsByUser, getVendorPage } from "../../service/vendors";

export default function UserProfilePage() {
  const { userID } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  async function fetchData() {
    try {
      const user = await getUserfromID(userID);
      const reviews = await getReviewsByUser(userID);
      console.log("getReviewsByUser reviews", reviews);
      const vendor = await getVendorPage(reviews.vendorID);
      setUserDetails({
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
  }, [userID]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box className="userContainer">
        <Box className="profile">
          <Box className="image">Profile Picture </Box>
          <Box className="name">{userDetails.name}</Box>
        </Box>
        <Box className="reviews">
          <p className="title">Reviews</p>
          {userDetails.reviews.map((review) => (
            <Card>
              <p>Venue: {userDetails.vendor}</p>
              <p>Cost per pax: {review.costperpax}</p>
              <p>Food: {review.food}</p>
              <p>Ambience: {review.ambience}</p>
              <p>Pre-wedding support: {review.preWeddingSupport}</p>
              <p>Day-of support: {review.dayOfSupport}</p>
              <p>Overall: {review.overall}</p>
              <p>Comments: {review.comments}</p>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}
