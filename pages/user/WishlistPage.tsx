import "./WishlistPage.css";
import { Box, Image } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  getUserfromID,
  getUserIDFromToken,
  updateComment,
  deleteWishlistItem,
} from "../../service/users";
import { getVendorPage } from "../../service/vendors";
import { IconTrash } from "@tabler/icons-react";

export default function WishlistPage() {
  const [allVendors, setAllVendors] = useState<any[]>([]);
  const [wishlistFilled, setWishlistFilled] = useState(false);

  async function fetchData() {
    const userID = await getUserIDFromToken();
    // console.log("fetchData userID", userID);
    try {
      const user = await getUserfromID(userID);
      const wishlist = user.wishlist || []; // Ensure wishlist is an array

      setWishlistFilled(wishlist.length > 0); // Set wishlistFilled based on length

      if (wishlist.length > 0) {
        const vendors = wishlist.map((item: any) => item.vendorID);
        const vendorPromises = vendors.map((vendor: any) =>
          getVendorPage(vendor)
        );
        const allVendors = await Promise.all(vendorPromises);
        setAllVendors(allVendors as never[]);
      }
    } catch {
      console.error("Error fetching user details");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(
    event: React.MouseEvent<HTMLButtonElement>,
    vendorID: string
  ) {
    event.preventDefault();
    const userID = await getUserIDFromToken();
    const body = { userID, vendorID };
    deleteWishlistItem(body);
    fetchData();
  }

  const handleChange = async (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    vendorID: string // Specify the type of vendorID
  ) => {
    console.log("event", event.target.value);
    const userID = await getUserIDFromToken();
    const body = { userID, vendorID, comment: event.target.value };
    updateComment(body);
  };

  return (
    <>
      <Box>
        <h1>Wishlist</h1>
        {wishlistFilled ? (
          <div className="wishlist">
            {allVendors.map((vendor) => (
              <div key={vendor._id} className="wishlist-item">
                <Image src={vendor.image_url} alt={vendor.Name} />
                <h2>{vendor.Name}</h2>
                <div>
                  <p>
                    {vendor.MinCap} to {vendor.MaxCap} pax
                  </p>
                  <p>
                    ${vendor.MinPrice} to ${vendor.MaxPrice} per pax
                  </p>
                  <p>{vendor.Location}</p>
                </div>
                <textarea
                  className="comment"
                  placeholder="Write a comment"
                  rows={4}
                  onChange={(event) => handleChange(event, vendor._id)}
                />
                <button
                  onClick={(event) => handleDelete(event, vendor._id)}
                  className="button"
                  style={{
                    alignSelf: "flex-end",
                    padding: "0",
                  }}
                >
                  <IconTrash
                    style={{ width: "50px", backgroundColor: "#F5CAC3" }}
                  />{" "}
                  {/* TODO: fix icon size  */}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>Nothing in your wishlist yet!</div>
        )}
      </Box>
    </>
  );
}
