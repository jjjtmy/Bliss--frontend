import "./MyProfilePage.css";
import { Box, Input, Image } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  getUserfromID,
  getUserIDFromToken,
  editUser,
} from "../../service/users";
import { getReviewsByUser, deleteReview } from "../../service/vendors";
import { IconStarFilled } from "@tabler/icons-react";
import useToast from "../../components/useToast.tsx";

export default function MyProfilePage() {
  const [userDetails, setUserDetails] = useState(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  // const [imageURL, setImageURL] = useState("");
  const [showInput, setShowInput] = useState(false);
  const { successToast, errorToast } = useToast();

  async function fetchData() {
    const userID = await getUserIDFromToken();
    // console.log("fetchData userID", userID);
    try {
      const user = await getUserfromID(userID);
      console.log("fetchData user", user);
      const reviews = await getReviewsByUser(userID);
      console.log("getReviewsByUser reviews", reviews);
      // const vendor = await getVendorPage(reviews.vendorID);
      setUserDetails({
        name: user.name,
        image_url: user.image_url,
        reviews: reviews.userReviewsArray,
        // vendor: vendor.Name,
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
      successToast({
        title: "Review deleted successfully!",
        message: null,
      });
    } catch {
      console.error("Error deleting review");
      errorToast(error.message);
    }
  }

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="myprofile">
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
            <button onClick={handleEditButtonClick} className="button">
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
              <button onClick={handleUploadImageClick} className="button">
                Upload Image
              </button>
            </>
          )}
        </Box>
        <Box className="name">{userDetails.name}</Box>
      </Box>
      <Box className="reviews">
        <p
          className="title"
          style={{
            textAlign: "left",
            marginBottom: "0",
            fontSize: "38px",
            fontWeight: "bold",
          }}
        >
          Reviews
        </p>

        {userDetails.reviews.map((reviewItem, index) => (
          <div key={index} className="review">
            <button
              className="button"
              onClick={() => handleDeleteReview(reviewItem.review._id)}
              style={{
                fontSize: "20px",
                alignSelf: "flex-end",
                padding: "0 0.2em",
              }}
            >
              X
            </button>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "24px",
                marginTop: "-30px",
              }}
            >
              {reviewItem.vendorName}
            </p>
            <p>${reviewItem.review.costperpax}/pax</p>
            <div>
              <p>
                Food: {reviewItem.review.food}
                <IconStarFilled />
              </p>
              <p>
                Ambience: {reviewItem.review.ambience} <IconStarFilled />
              </p>
              <p>
                Pre-wedding support: {reviewItem.review.preWeddingSupport}
                <IconStarFilled />
              </p>
              <p>
                Day-of support: {reviewItem.review.dayOfSupport}
                <IconStarFilled />
              </p>
              <p>
                Overall: {reviewItem.review.overall}
                <IconStarFilled />
              </p>
            </div>
            <p>Comments: {reviewItem.review.comments}</p>
          </div>
        ))}
      </Box>
    </div>
  );
}
