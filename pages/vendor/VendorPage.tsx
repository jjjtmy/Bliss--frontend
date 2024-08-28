import "./VendorPage.css";
import { Box, Image, Anchor } from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVendorPage } from "../../service/vendors";
import {
  addToWishlist,
  getUserIDFromToken,
  getUserRole,
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

  useEffect(() => {
    fetchData();
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
    successToast({
      title: "Added to Wishlist",
      message: "This vendor has been added to your wishlist.",
    });
  };

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
                style={{ margin: "0 10px" }}
              >
                Like
              </button>
              <button
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
              <IconStarFilled />
            </p>
            <p>
              Ambience: {vendorDetails.ambienceRating}
              <IconStarFilled />
            </p>
            <p>
              Pre-wedding support: {vendorDetails.preWeddingSupportRating}
              <IconStarFilled />
            </p>
            <p>
              Day-of support: {vendorDetails.dayOfSupportRating}
              <IconStarFilled />
            </p>
            <p style={{ fontWeight: "bold" }}>
              Overall: {vendorDetails.overallRating}
              <IconStarFilled />
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
            style={{ fontWeight: "bold", fontSize: "22px", marginTop: "20px" }}
          >
            Reviews
            {vendorDetails.reviews && vendorDetails.reviews.length > 0 ? (
              vendorDetails.reviews.map((review, index) => (
                <div className="eachreview" key={index}>
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    {review.username} said:
                  </p>
                  <p>${review.costperpax}/pax</p>
                  <div className="reviewratings">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: "0",
                      }}
                    >
                      <p>Food: {review.food}</p>
                      <IconStarFilled />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: "0",
                      }}
                    >
                      <p>Ambience: {review.ambience}</p>
                      <IconStarFilled />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: "0",
                      }}
                    >
                      <p>Pre-wedding support: {review.preWeddingSupport}</p>
                      <IconStarFilled />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: "0",
                      }}
                    >
                      <p>Day-of support: {review.dayOfSupport}</p>
                      <IconStarFilled />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: "0",
                      }}
                    >
                      <p>Overall: {review.overall}</p>
                      <IconStarFilled />
                    </div>
                  </div>
                  <p>Comments: {review.comments}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet</p>
            )}
          </Box>
        </div>
      </Box>
    </>
  );
}
