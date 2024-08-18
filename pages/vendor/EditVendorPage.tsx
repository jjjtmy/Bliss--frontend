import "./EditVendorPage.css";
import { useState } from "react";
import {
  Button,
  TextInput,
  Textarea,
  NumberInput,
  Fieldset,
} from "@mantine/core";
import { editVendorPage } from "../../service/vendors.tsx";
import { getToken } from "../../util/security.tsx";
import NavBar from "../../components/NavBar.tsx";

export default function EditVendorPage() {
  const [formState, setFormState] = useState<{
    [key: string]: string | number;
  }>({});
  const [error, setError] = useState<string | null>(null);

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setFormState((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  }

  function handleNumberChange(name: string, value: number) {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    try {
      const token = getToken();
      if (!token) {
        // navigate("/login");
        // console.log(`no token`);
        return;
      }
      const pageDetails = {
        token: token,
        vendorPage: formState,
      };
      console.log(`editvendorpage req`, pageDetails);
      const res = await editVendorPage(pageDetails);
      // navigate(`/myprofile`);
      console.log("editvendorpage updated successfully:", res);
    } catch (error) {
      console.error("Edit vendor error:", error);
    }
  }

  return (
    <>
      <NavBar />
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="formcontainer"
      >
        <TextInput label="Name" name="Name" onChange={handleChange} required />
        <TextInput
          label="Location"
          name="Location"
          onChange={handleChange}
          required
        />
        <TextInput
          label="Email"
          name="Email"
          onChange={handleChange}
          required
        />
        <TextInput
          label="Phone"
          name="Phone"
          onChange={handleChange}
          required
        />
        <Textarea
          label="Description"
          name="Description"
          onChange={handleChange}
          required
        />
        <Fieldset legend="Seating Capacity">
          <NumberInput
            label="Minimum Capacity"
            name="MinCap"
            hideControls
            onChange={(value) => handleNumberChange("MinCap", value || 0)}
          />
          <NumberInput
            label="Maximum Capacity"
            name="MaxCap"
            hideControls
            onChange={(value) => handleNumberChange("MaxCap", value || 0)}
          />
        </Fieldset>
        <Fieldset legend="Estimated Price">
          <NumberInput
            label="Minimum price per pax"
            name="MinPrice"
            hideControls
            onChange={(value) => handleNumberChange("MinPrice", value || 0)}
          />
          <NumberInput
            label="Maximum price per pax"
            name="MaxPrice"
            hideControls
            onChange={(value) => handleNumberChange("MaxPrice", value || 0)}
          />
        </Fieldset>
        <Button type="submit">Submit</Button>
        <p className="error-message">{error}</p>
      </form>
    </>
  );
}
