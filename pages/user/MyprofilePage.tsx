import "./MyProfilePage.css";
import { Box, Input, Image } from "@mantine/core";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import {
  getUserfromID,
  getUserIDFromToken,
  editUser,
} from "../../service/users";
import {
  getReviewsByUser,
  getVendorPage,
  deleteReview,
} from "../../service/vendors";

export default function MyProfilePage() {
  const [userDetails, setUserDetails] = useState(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  // const [imageURL, setImageURL] = useState("");
  const [showInput, setShowInput] = useState(false);

  async function fetchData() {
    const userID = await getUserIDFromToken();
    // console.log("fetchData userID", userID);
    try {
      const user = await getUserfromID(userID);
      console.log("fetchData user", user);
      const reviews = await getReviewsByUser(userID);
      console.log("getReviewsByUser reviews", reviews);
      const vendor = await getVendorPage(reviews.vendorID);
      setUserDetails({
        name: user.name,
        image_url: user.image_url,
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

  const handleEditButtonClick = () => {
    setShowInput(true);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event file", event.target.files[0]);
    const file = event.target.files[0];
    setImageFile(file);
    if (!file) return;
  };

  const handleUploadImageClick = async () => {
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "vendor_image");
    data.append("cloud_name", "dagpbzoqq");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dagpbzoqq/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const uploadedImageURL = await res.json();
    editUser({ ...userDetails, image_url: uploadedImageURL.url });
    fetchData();
    setShowInput(false);
  };

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
          <Image
            src={userDetails.image_url}
            radius="md"
            h={200}
            w="auto"
            fit="contain"
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          />
          {!showInput ? (
            <button onClick={handleEditButtonClick}>
              Edit profile picture
            </button>
          ) : (
            <>
              {" "}
              <Input
                name="image_url"
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
              />{" "}
              <button onClick={handleUploadImageClick}>Upload Image</button>
            </>
          )}
        </Box>
        {/* {image && (
            <Image
              cloudName="your_cloud_name"
              publicId={userDetails.image_url}
              width="300"
              crop="scale"
            />
          )} */}
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
    </>
  );
}
