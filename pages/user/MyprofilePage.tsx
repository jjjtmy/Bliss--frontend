import "./MyProfilePage.css";
import { Box, Input, Image, Pagination, Text, Card } from "@mantine/core";
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
  const [showInput, setShowInput] = useState(false);
  const { successToast, errorToast } = useToast();
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 3;

  async function fetchData() {
    const userID = await getUserIDFromToken();
    try {
      const user = await getUserfromID(userID);
      const reviews = await getReviewsByUser(userID);
      setUserDetails({
        name: user.name,
        image_url: user.image_url,
        reviews: reviews.userReviewsArray,
      });
    } catch {
      console.error("Error fetching user details");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditButtonClick = () => {
    setShowInput(true);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    await editUser({ ...userDetails, image_url: uploadedImageURL.url });
    fetchData();
    setShowInput(false);
  };

  async function handleDeleteReview(reviewid) {
    try {
      await deleteReview(reviewid);
      successToast({
        title: "Review deleted successfully!",
        message: null,
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting review");
      errorToast(error.message);
    }
  }

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  function paginate(array, pageSize, pageNumber) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  return (
    <div className="myprofile">
      <Box className="userContainer">
        <Box className="profile">
          <Image
            src={userDetails.image_url}
            h="200px"
            w="200px"
            fit="cover"
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          />
          {!showInput ? (
            <button onClick={handleEditButtonClick} className="button">
              Edit profile picture
            </button>
          ) : (
            <>
              <Input
                name="image_url"
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
              />
              <button onClick={handleUploadImageClick} className="button">
                Upload Image
              </button>
            </>
          )}
        </Box>
        <Box className="name">{userDetails.name}</Box>
      </Box>
      <Box className="reviews" style={{ margin: "10px 0 50px 0" }}>
        <p
          className="title"
          style={{
            marginBottom: "0",
            fontSize: "38px",
            fontWeight: "bold",
          }}
        >
          Reviews
        </p>
        {userDetails.reviews.length === 0 ? (
          <div>No reviews yet</div>
        ) : (
          paginate(userDetails.reviews, itemsPerPage, activePage).map(
            (reviewItem, index) => (
              <Card key={index} className="review">
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
                  <p style={{ display: "flex", justifyContent: "center" }}>
                    Food: {reviewItem.review.food}
                    <IconStarFilled style={{ height: "20px" }} />
                  </p>
                  <p style={{ display: "flex", justifyContent: "center" }}>
                    Ambience: {reviewItem.review.ambience}
                    <IconStarFilled style={{ height: "20px" }} />
                  </p>
                  <p style={{ display: "flex", justifyContent: "center" }}>
                    Pre-wedding support: {reviewItem.review.preWeddingSupport}
                    <IconStarFilled style={{ height: "20px" }} />
                  </p>
                  <p style={{ display: "flex", justifyContent: "center" }}>
                    Day-of support: {reviewItem.review.dayOfSupport}
                    <IconStarFilled style={{ height: "20px" }} />
                  </p>
                  <p style={{ display: "flex", justifyContent: "center" }}>
                    Overall: {reviewItem.review.overall}
                    <IconStarFilled style={{ height: "20px" }} />
                  </p>
                </div>
                <p>Comments: {reviewItem.review.comments}</p>
              </Card>
            )
          )
        )}
        <Pagination
          total={Math.ceil(userDetails.reviews.length / itemsPerPage)}
          value={activePage}
          onChange={setActivePage}
          mt="sm"
          mb="xl"
        />
      </Box>
    </div>
  );
}
