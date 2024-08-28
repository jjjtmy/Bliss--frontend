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
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [wishlistFilled, setWishlistFilled] = useState(false);
  const [comments, setComments] = useState<{ [key: string]: string }>({});

  async function fetchData() {
    const userID = await getUserIDFromToken();
    try {
      const user = await getUserfromID(userID);
      const wishlist = user.wishlist || [];
      setWishlist(wishlist);
      setWishlistFilled(wishlist.length > 0);

      if (wishlist.length > 0) {
        const vendors = wishlist.map((item: any) => item.vendorID);
        const vendorPromises = vendors.map((vendor: any) =>
          getVendorPage(vendor)
        );
        const allVendors = await Promise.all(vendorPromises);
        setAllVendors(allVendors as never[]);
        fetchComments(wishlist);
      }
    } catch {
      console.error("Error fetching user details");
    }
  }

  async function fetchComments(wishlist: any[]) {
    const userID = await getUserIDFromToken();
    const user = await getUserfromID(userID);
    const commentsObj: { [key: string]: string } = {};

    wishlist.forEach((item) => {
      commentsObj[item.vendorID] = item.comment || "";
    });

    setComments(commentsObj);
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
    await deleteWishlistItem(body);
    fetchData();
  }

  const handleChange = async (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    vendorID: string
  ) => {
    const newComment = event.target.value;
    setComments((prevComments) => ({
      ...prevComments,
      [vendorID]: newComment,
    }));

    const userID = await getUserIDFromToken();
    const body = { userID, vendorID, comment: newComment };
    await updateComment(body);
  };

  return (
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
                value={comments[vendor._id] || ""}
                rows={4}
                onChange={(event) => handleChange(event, vendor._id)}
              />
              <button
                onClick={(event) => handleDelete(event, vendor._id)}
                className="button"
                style={{
                  alignSelf: "flex-end",
                  padding: "6px 0 0 0",
                  margin: "10px 0",
                }}
              >
                <IconTrash
                  style={{
                    width: "100%",
                    padding: 0,
                    backgroundColor: "#F5CAC3",
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>Nothing in your wishlist yet!</div>
      )}
    </Box>
  );
}
