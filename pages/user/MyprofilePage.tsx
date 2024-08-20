import "./MyProfilePage.css";
import { Box } from "@mantine/core";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { getUserfromID, getLoginDetails } from "../../service/users";
import {
  getReviewsByUser,
  getVendorPage,
  deleteReview,
} from "../../service/vendors";
import { getToken } from "../../util/security";

export default function MyProfilePage() {
  const [userDetails, setUserDetails] = useState(null);

  async function fetchData() {
    await getToken();
    const token = getToken();
    const email = token
      ? JSON.parse(atob(token.split(".")[1])).payload.email
      : null;
    console.log("email", email);
    const userCollection = await getLoginDetails(email);
    const userID = userCollection.data._id;
    console.log("userID", userID);
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
  }, []);

  //to see what is in userDetails
  // useEffect(() => {
  //   console.log("userDetails", userDetails);
  // }, [userDetails]);

  async function handleDeleteReview(reviewid) {
    console.log("deleterviewid", reviewid);
    try {
      await deleteReview(reviewid);
      console.log("Review deleted");
      // window.location.reload();
    } catch {
      console.error("Error deleting review");
    }
  }

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <Box className="userContainer">
        <Box className="profile">
          <Box className="image">Profile Picture </Box>
          <Box className="name">{userDetails.name}</Box>
        </Box>
        <Box className="reviews">
          <p className="title">Reviews</p>

          {userDetails.reviews.map((review) => (
            <div>
              <button onClick={() => handleDeleteReview(review._id)}>
                delete
              </button>
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
      </Box>
    </>
  );
}
