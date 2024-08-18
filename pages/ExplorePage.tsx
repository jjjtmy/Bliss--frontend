import { useEffect, useState } from "react";
import "./ExplorePage.css";
import { getVendorNames, getVendorByName } from "../service/vendors";
import { Box, Button, Autocomplete } from "@mantine/core";
import VendorCard from "../components/VendorCard";

export default function ExplorePage() {
  const [vendors, setVendors] = useState([]);
  const [formState, setFormState] = useState("");
  const [searchResult, setSearchResult] = useState({});

  // retrieve available vendors
  async function getVendors() {
    try {
      const vendorNames = await getVendorNames();
      const vendorNamelist = vendorNames.data.map((vendor) => vendor.Name);
      console.log("vendorNamelist", vendorNamelist);
      setVendors(vendorNamelist);
    } catch {
      console.error("Error fetching vendors");
    }
  }

  useEffect(() => {
    getVendors();
  }, []);

  //handle submit for search bar
  async function handleSubmit(evt: React.FormEvent) {
    try {
      evt.preventDefault();
      const result = await getVendorByName(formState);
      console.log("getVendorByName result", result);
      setSearchResult(result);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <h1>Explore Page</h1>
      <Box className="searchBar">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Autocomplete
            label="Search"
            placeholder="Enter a venue name"
            data={vendors}
            onChange={setFormState}
          />
          <Button type="submit">Go</Button>
        </form>
      </Box>

      <Box>
        <VendorCard vendor={searchResult} />
      </Box>

      {/* <Box className="vendorContainer">
        {searchResults.map((vendor) => (
          <VendorCard vendor={vendor} />
        ))}
      </Box> */}
    </div>
  );
}
