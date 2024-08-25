import "./VendorCard.css";
import { Box, Image } from "@mantine/core";
import { Link } from "react-router-dom";

export default function VendorCard({ vendor }) {
  return (
    <Box className="vendorCard">
      <Link to={`/vendors/${vendor._id}`}>
        <Image src={vendor.image_url} alt="vendor" />
        <Box>{vendor.Name}</Box>
        <Box>{vendor.Location}</Box>
      </Link>
    </Box>
  );
}
