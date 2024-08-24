import { useState, useEffect } from "react";
import "./AddReviewPage.css";
import NavBar from "../../../components/NavBar.tsx";
import {
  Box,
  Button,
  Text,
  TextInput,
  Textarea,
  Rating,
  Group,
  Autocomplete,
  Fieldset,
} from "@mantine/core";
import { getToken } from "../../../util/security.tsx";
import { addVendorReview, getVendorNames } from "../../../service/vendors.tsx";

export default function AddReviewPage(): JSX.Element {
  const [formState, setFormState] = useState({
    Venue: "",
    costperpax: "",
    food: 0,
    ambience: 1.5,
    preWeddingSupport: 1.5,
    dayOfSupport: 1.5,
    overall: 1.5,
    comments: "",
  });
  const [vendors, setVendors] = useState([]); //vendor names to autopopulate vendor name

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
  }, []);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const token = getToken();
      if (!token) {
        return;
      }
      const review = {
        token: token,
        review: formState,
      };
      console.log(`addreview req`, review);
      const res = await addVendorReview(review);
      console.log("addreview updated successfully:", res);
    } catch (error) {
      console.error("Add review error:", error);
    }
  }

  return (
    <>
      <NavBar />
      <Box className="FormContainer" w="60vw">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Text size="m" fw={700}>
            Venue:
          </Text>
          <Autocomplete
            placeholder="Enter a venue name"
            data={vendors}
            name="Venue"
            value={formState.Venue}
            onChange={(value) =>
              setFormState((prevState) => ({
                ...prevState,
                Venue: value, // Update the Venue field in formState directly
              }))
            }
          />

          <TextInput
            label="Cost per pax"
            name="costperpax"
            value={formState.costperpax}
            onChange={handleChange}
            required
          />
          <Fieldset legend="Ratings" c="black" align="left">
            <Group>
              <Text c="black">Food</Text>
              <Rating
                fractions={2}
                value={formState.food}
                onChange={(newValue) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    food: newValue,
                  }))
                }
              />
            </Group>
            <Group>
              <Text c="black">Ambience</Text>
              <Rating
                fractions={2}
                value={formState.ambience}
                onChange={(newValue) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    ambience: newValue,
                  }))
                }
              />
            </Group>
            <Group>
              <Text c="black">Pre-wedding Support</Text>
              <Rating
                fractions={2}
                value={formState.preWeddingSupport}
                onChange={(newValue) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    preWeddingSupport: newValue,
                  }))
                }
              />
            </Group>
            <Group>
              <Text c="black">Day-of Support</Text>
              <Rating
                fractions={2}
                value={formState.dayOfSupport}
                onChange={(newValue) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    dayOfSupport: newValue,
                  }))
                }
              />
            </Group>
            <Group>
              <Text c="black">Overall</Text>
              <Rating
                fractions={2}
                value={formState.overall}
                onChange={(newValue) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    overall: newValue,
                  }))
                }
              />
            </Group>
          </Fieldset>
          <Textarea
            label="Comments"
            name="comments"
            value={formState.comments}
            onChange={handleChange}
            required
            autosize
            minRows={2}
            maxRows={4}
            placeholder="Share your tips and comments here!"
          />
          <Button type="submit">Submit</Button>
        </form>
        <p className="error-message">&nbsp;</p>
      </Box>
    </>
  );
}
