import { useEffect, useState } from "react";
import "./ExplorePage.css";
import { getVendorNames, getVendorByName } from "../service/vendors";
import { Box, Button, Autocomplete, RangeSlider, Text } from "@mantine/core";
import VendorCard from "../components/VendorCard";
import NavBar from "../components/NavBar";

export default function ExplorePage() {
  const [vendors, setVendors] = useState([]); //vendor names to autopopulate search bar
  const [formState, setFormState] = useState(""); //search bar
  const [searchResult, setSearchResult] = useState({}); //result from search bar
  const [allVendors, setAllVendors] = useState([]); //all vendors when page loads
  const [filteredVendors, setFilteredVendors] = useState([]); //filtered vendors
  const [priceFilter, setPriceFilter] = useState([0, 500]);
  const [capFilter, setCapFilter] = useState([0, 500]);

  // retrieve available vendors
  async function getVendors() {
    try {
      const vendorNames = await getVendorNames();
      const vendorNamelist = vendorNames.data.map((vendor) => vendor.Name);
      console.log("vendorNamelist", vendorNamelist);
      setVendors(vendorNamelist); //setVendor state
    } catch {
      console.error("Error fetching vendors");
    }
  }

  useEffect(() => {
    getVendors();
    setSearchResult(null); //null so that all vendors show when page loads
  }, []);

  // retrieve all vendors
  async function fetchAllVendors() {
    try {
      const vendorPromises = vendors.map(async (vendor) => {
        return await getVendorByName(vendor);
      });
      const allVendors = await Promise.all(vendorPromises);
      console.log("fetchAllVendors", allVendors);
      setAllVendors(allVendors);
    } catch {
      console.error("Error fetching all vendors");
    }
  }
  useEffect(() => {
    fetchAllVendors();
  }, [vendors]);

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

  //when filter changes, filter vendors
  async function submitFilters() {
    const filteredVendors = allVendors.filter((vendor) => {
      return (
        vendor.MinCap >= capFilter[0] &&
        vendor.MaxCap <= capFilter[1] &&
        vendor.MinPrice >= priceFilter[0] &&
        vendor.MaxPrice <= priceFilter[1]
      );
    });
    console.log("filteredVendors", filteredVendors);
    setFilteredVendors(filteredVendors);
  }

  return (
    <>
      <NavBar />
      <div className="explorePage">
        <Box>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Text size="m" fw={700}>
              Search:
            </Text>
            <Autocomplete
              placeholder="Enter a venue name"
              data={vendors}
              onChange={setFormState}
            />
            <Button type="submit">Go</Button>
          </form>
        </Box>

        <Box className="filters">
          <Text size="m" mt="xl" fw={700}>
            Capacity
          </Text>
          <RangeSlider
            defaultValue={[0, 500]}
            min={0}
            max={500}
            step={50}
            label={(value) => `${value} pax`}
            onChange={setCapFilter}
          />
          <Text size="sm">
            Capacity Filter: {capFilter[0]} to {capFilter[1]} pax
          </Text>
          <Text size="m" fw={700}>
            Price per pax
          </Text>
          <RangeSlider
            defaultValue={[0, 500]}
            min={0}
            max={500}
            step={50}
            label={(value) => `$${value}`}
            onChange={setPriceFilter}
          />
          <Text size="sm">
            Price Filter: ${priceFilter[0]} to ${priceFilter[1]}
          </Text>
          <Button onClick={submitFilters} mt={10}>
            Filter
          </Button>
        </Box>

        <Box className="vendorcardgrid">
          {searchResult ? (
            <VendorCard vendor={searchResult} />
          ) : filteredVendors.length === 0 ? (
            allVendors.map((vendor, index) => (
              <VendorCard key={index} vendor={vendor} />
            ))
          ) : (
            filteredVendors.map((vendor, index) => (
              <VendorCard key={index} vendor={vendor} />
            ))
          )}
        </Box>

        {/* <Box className="vendorContainer">
        {searchResults.map((vendor) => (
          <VendorCard vendor={vendor} />
        ))}
      </Box> */}
      </div>
    </>
  );
}
