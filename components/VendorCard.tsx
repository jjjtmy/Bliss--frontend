import "./VendorCard.css";
import { Box } from "@mantine/core";
import { Link } from "react-router-dom";

export default function VendorCard({ vendor }) {
  return (
    <Box className="vendorCard">
      <Link to={`/vendors/${vendor._ID}`}>
        <Box>IMAGE GOES HERE</Box>
        <Box>{vendor.Name}</Box>
        <Box>{vendor.Location}</Box>
      </Link>
    </Box>
  );
}
