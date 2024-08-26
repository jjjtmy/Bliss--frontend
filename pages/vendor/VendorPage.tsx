import "./VendorPage.css";
import { Box, Button, Image } from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVendorPage } from "../../service/vendors";
import { addToWishlist } from "../../service/users";
import { IconStarFilled } from "@tabler/icons-react";

export default function VendorPage() {
  const navigate = useNavigate();
  const { vendorID } = useParams();
  const [vendorDetails, setVendorDetails] = useState(null);

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
      <Box className="vendorContainer">
        <Image className="image" src={vendorDetails.image_url} alt="vendor" />
        <div className="details">
          <Button className="button" onClick={handleLike}>
            Like
          </Button>
          <Button
            className="button"
            onClick={() =>
              navigate("/addreview", {
                state: { vendorName: vendorDetails.Name },
              })
            }
          >
            Review this Venue
          </Button>
          <p style={{ fontWeight: "bold", fontSize: "22px" }}>
            {vendorDetails.Name}
          </p>
          <p> {vendorDetails.Description}</p>
          <div className="eachSection">
            <p>
              Capacity: {vendorDetails.MinCap} to {vendorDetails.MaxCap} pax
            </p>
            <p>
              Price: ${vendorDetails.MinPrice} to ${vendorDetails.MaxPrice}
            </p>
          </div>
          <div className="eachSection">
            <p>{vendorDetails.Location}</p>
            <p>{vendorDetails.Email}</p>
            <p>{vendorDetails.Phone}</p>
          </div>
          <Box
            className="reviews"
            style={{ fontWeight: "bold", fontSize: "22px", marginTop: "20px" }}
          >
            Reviews
            {vendorDetails.reviews.map((review, index) => (
              <div className="eachreview" key={index}>
                <p
                  style={{
                    fontWeight: "bold",
                    textAlign: "left",
                    marginLeft: "10px",
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
            ))}
          </Box>
        </div>
      </Box>
    </>
  );
}
