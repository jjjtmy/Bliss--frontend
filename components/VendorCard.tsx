import "./VendorCard.css";
import { Box, Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconMapPin } from "@tabler/icons-react";

export default function VendorCard({ vendor }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/vendors/${vendor._id}`);
  };

  return (
    <Box className="vendorCard">
      <div onClick={handleClick}>
        <Image src={vendor.image_url} alt="vendor" />
        <p className="vendorname">{vendor.Name}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            margin: 0,
          }}
        >
          <IconMapPin />
          <p className="vendorlocation">{vendor.Location}</p>
        </div>
      </div>
    </Box>
  );
}
