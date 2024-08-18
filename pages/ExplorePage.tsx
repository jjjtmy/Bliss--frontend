import { useEffect, useState } from "react";
import "./ExplorePage.css";
import { getVendorNames, getVendorByName } from "../service/vendors"; //TODO: code this function
import { Box, TextInput, Button } from "@mantine/core";
import VendorCard from "../components/VendorCard";

export default function ExplorePage() {
  const [vendors, setVendors] = useState([]);
  const [formState, setFormState] = useState("");
  const [searchResult, setSearchResult] = useState({});

  // // retrieve available vendors
  // async function getVendors() {
  //   try {
  //     const vendorNames = await getVendorNames();
  //     console.log("vendorNames", vendorNames);
  //     setVendors(vendorNames); //TODO: limit search input to vendors
  //   } catch {
  //     console.error("Error fetching vendors");
  //   }
  // }

  // useEffect(() => {
  //   getVendors();
  // }, []);

  //handle change for search bar
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setFormState(evt.target.value);
  }

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

  // on submit to search for vendors with the search term

  return (
    <div>
      <h1>Explore Page</h1>
      <Box className="searchBar">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <TextInput label="Search" name="search" onChange={handleChange} />
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
