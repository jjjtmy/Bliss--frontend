import "./VendorPage.css";
import { Card, Box, Image, Anchor, Pagination, Text } from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVendorPage } from "../../service/vendors";
import {
  addToWishlist,
  getUserIDFromToken,
  getUserRole,
  getUserfromID,
} from "../../service/users";
import { IconStarFilled } from "@tabler/icons-react";
import useToast from "../../components/useToast.tsx";

export default function VendorPage() {
  const navigate = useNavigate();
  const { vendorID } = useParams();
  const [vendorDetails, setVendorDetails] = useState(null);
  const { successToast, errorToast } = useToast();
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [vendorRatings, setVendorRatings] = useState({
    food: 0,
    ambience: 0,
    preWeddingSupport: 0,
    dayOfSupport: 0,
    overall: 0,
  });
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 2;
  const [liked, setLiked] = useState(false);

  async function fetchData() {
    try {
      const vendor = await getVendorPage(vendorID);
      console.log(`vendorpage vendor`, vendor);
      setVendorDetails(vendor);
    } catch (error) {
      console.error("Error fetching vendor details", error);
      errorToast(error.message);
    }
  }

  async function checkUser() {
    try {
      const role = await getUserRole();
      setIsClient(role === "client");

      const userID = await getUserIDFromToken();
      console.log("userID", userID);
      console.log("vendorDetails userid", vendorDetails.UserID);
      if (userID === vendorDetails.UserID) {
        console.log("user is owner");
        setIsOwner(true);
      }
    } catch (error) {
      console.error("Error checking user", error);
    }
  }

  async function checkLiked() {
    try {
      const userID = await getUserIDFromToken();
      console.log("userID checkliked", userID);
      const userDetails = await getUserfromID(userID);
      console.log("userDetails wishlist", userDetails.wishlist);
      for (let i = 0; i < userDetails.wishlist.length; i++) {
        if (userDetails.wishlist[i].vendorID === vendorID) {
          setLiked(true);
        }
      }
    } catch (error) {
      console.error("Error checking if liked", error);
    }
  }

  useEffect(() => {
    fetchData();
    checkLiked();
  }, [vendorID]);

  useEffect(() => {
    checkUser();
  }, [vendorDetails]);

  if (!vendorDetails) {
    return <div>Loading...</div>;
  }

  const handleLike = (event) => {
    event.preventDefault();
    addToWishlist(vendorID);
    setLiked(true);
    successToast({
      title: "Added to Wishlist",
      message: "This vendor has been added to your wishlist.",
    });
  };

  function paginate(array, pageSize, pageNumber) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  return (
    <>
      <Box className="vendorContainer">
        <Image
          className="image"
          src={vendorDetails.image_url}
          alt={vendorDetails.Name || "vendor image"}
        />
        <div className="details">
          {isClient && (
            <>
              <button
                className="button"
                onClick={handleLike}
                style={{
                  margin: "0 10px",
                  padding: "2px 10px",
                  backgroundColor: liked ? "#f28482" : "#f5cac3",
                }}
              >
                Like
              </button>
              <button
                style={{ padding: "2px 10px" }}
                className="button"
                onClick={() =>
                  navigate("/addreview", {
                    state: { vendorName: vendorDetails.Name },
                  })
                }
              >
                Review this Venue
              </button>
            </>
          )}
          {isOwner && (
            <button
              className="button"
              onClick={() => navigate("/editvendorpage")}
            >
              Edit Details
            </button>
          )}
          <p style={{ fontWeight: "bold", fontSize: "22px" }}>
            {vendorDetails.Name}
          </p>
          <p>{vendorDetails.Description}</p>

          <Box className="vendorRatings">
            <p>
              Food: {vendorDetails.foodRating}
              <IconStarFilled style={{ height: "20px" }} />
            </p>
            <p>
              Ambience: {vendorDetails.ambienceRating}
              <IconStarFilled style={{ height: "20px" }} />
            </p>
            <p>
              Pre-wedding support: {vendorDetails.preWeddingSupportRating}
              <IconStarFilled style={{ height: "20px" }} />
            </p>
            <p>
              Day-of support: {vendorDetails.dayOfSupportRating}
              <IconStarFilled style={{ height: "20px" }} />
            </p>
            <p style={{ fontWeight: "bold" }}>
              Overall: {vendorDetails.overallRating}
              <IconStarFilled style={{ height: "20px" }} />
            </p>
          </Box>
          <div className="eachSection">
            <p>
              Capacity: {vendorDetails.MinCap} to {vendorDetails.MaxCap} pax
            </p>
            <p>
              Price: ${vendorDetails.MinPrice} to ${vendorDetails.MaxPrice}
            </p>
          </div>
          <div className="eachSection">
            <p>
              <Anchor
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  vendorDetails.Location
                )}`}
                target="_blank"
              >
                {vendorDetails.Location}
              </Anchor>
            </p>
            <p>
              <Anchor href={`mailto:${vendorDetails.Email}`}>
                {vendorDetails.Email}
              </Anchor>
            </p>
            <p>{vendorDetails.Phone}</p>
          </div>

          <Box
            className="reviews"
            style={{
              fontWeight: "bold",
              fontSize: "22px",
              marginTop: "20px",
              color: "rgb(32, 32, 32)",
              width: "50vw",
            }}
          >
            Reviews
            {vendorDetails.reviews && vendorDetails.reviews.length > 0 ? (
              paginate(vendorDetails.reviews, itemsPerPage, activePage).map(
                (review, index) => (
                  <Card className="eachreview" key={index}>
                    <p style={{ fontWeight: "bold", textAlign: "left" }}>
                      {review.username} said:
                    </p>
                    <p>${review.costperpax}/pax</p>
                    <div className="reviewratings">
                      <p style={{ display: "flex", alignItems: "center" }}>
                        Food: {review.food}
                        <IconStarFilled style={{ height: "20px" }} />
                      </p>
                      <p style={{ display: "flex", alignItems: "center" }}>
                        Ambience: {review.ambience}
                        <IconStarFilled style={{ height: "20px" }} />
                      </p>
                      <p style={{ display: "flex", alignItems: "center" }}>
                        Pre-wedding support: {review.preWeddingSupport}
                        <IconStarFilled style={{ height: "20px" }} />
                      </p>
                      <p style={{ display: "flex", alignItems: "center" }}>
                        Day-of support: {review.dayOfSupport}
                        <IconStarFilled style={{ height: "20px" }} />
                      </p>
                      <p style={{ display: "flex", alignItems: "center" }}>
                        Overall: {review.overall}
                        <IconStarFilled style={{ height: "20px" }} />
                      </p>
                    </div>
                    <p>Comments: {review.comments}</p>
                  </Card>
                )
              )
            ) : (
              <p>No reviews yet</p>
            )}
          </Box>

          {vendorDetails.reviews &&
            vendorDetails.reviews.length > itemsPerPage && (
              <Pagination
                total={Math.ceil(vendorDetails.reviews.length / itemsPerPage)}
                value={activePage}
                onChange={setActivePage}
                mt="sm"
              />
            )}
        </div>
      </Box>
    </>
  );
}
