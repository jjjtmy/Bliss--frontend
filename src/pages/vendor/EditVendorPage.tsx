import "./EditVendorPage.css";
import { useState, useEffect } from "react";
import {
  Button,
  TextInput,
  Textarea,
  NumberInput,
  Fieldset,
  Input,
  Image,
} from "@mantine/core";
import {
  editVendorPage,
  getVendorPage,
  getVendorbyUserID,
} from "../../../service/vendors.tsx";
import { getUserfromUser, getUser } from "../../../service/users.tsx";
import { getToken } from "../../../util/security.tsx";
import NavBar from "../../../components/NavBar.tsx";

export default function EditVendorPage() {
  const [prefilledForm, setPrefilledForm] = useState({});
  const [formState, setFormState] = useState<{
    [key: string]: string | number;
  }>({});
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState("");
  const [fetchedData, setfetchedData] = useState(false);

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event file", event.target.files[0]);
    const file = event.target.files[0];
    setImageFile(file);
    if (!file) return;
  };

  const handleUploadImageClick = async () => {
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "vendor_image");
    data.append("cloud_name", "dagpbzoqq");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dagpbzoqq/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const uploadedImageURL = await res.json();
    console.log("uploadedImageURL", uploadedImageURL.url);
    setImageURL(uploadedImageURL.url);
  };

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    try {
      const token = getToken();
      if (!token) {
        // navigate("/login");
        // console.log(`no token`);
        return;
      }

      const username = await getUser();
      console.log("username", username);
      const user = await getUserfromUser(username);
      console.log("user", user);
      const userID = user[0]._id;

      // Update the form state with userID
      const updatedFormState = {
        ...formState,
        image_url: imageURL,
        UserID: userID,
      };

      const pageDetails = {
        token: token,
        vendorPage: updatedFormState,
      };

      console.log(`editvendorpage req`, pageDetails);
      const res = await editVendorPage(pageDetails);
      // navigate(`/myprofile`);
      console.log("editvendorpage updated successfully:", res);
    } catch (error) {
      console.error("Edit vendor error:", error);
    }
  }

  async function fetchData() {
    try {
      //get userID from user in token - 66bf41d937c3e815af6da5bb
      const username = await getUser();
      console.log("username", username);
      const user = await getUserfromUser(username);
      console.log("user", user[0]._id);
      const vendorID = await getVendorbyUserID(user[0]._id);
      console.log("vendorID", vendorID);
      // get vendorpage by vendorid - 66c4a4c756d770941bcc2776
      const vendor = await getVendorPage(vendorID.data._id);
      console.log(`vendorpage vendor`, vendor);
      return vendor
        ? (setPrefilledForm(vendor), setFormState(vendor))
        : setfetchedData(true);
    } catch {
      console.error("Error fetching vendor details", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!prefilledForm) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="formcontainer"
      >
        <Image
          src={imageURL ? imageURL : prefilledForm.image_url}
          radius="md"
          h={200}
          w="auto"
          fit="contain"
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
        <Input
          name="image_url"
          type="file"
          onChange={handleImageUpload}
          accept="image/*"
        />{" "}
        <button onClick={handleUploadImageClick}>Upload Image</button>
        <TextInput
          label="Name"
          name="Name"
          onChange={handleChange}
          value={prefilledForm.Name || undefined}
          required
        />
        <TextInput
          label="Location"
          name="Location"
          onChange={handleChange}
          value={prefilledForm.Location || undefined}
          required
        />
        <TextInput
          label="Email"
          name="Email"
          onChange={handleChange}
          value={prefilledForm.Email || undefined}
          required
        />
        <TextInput
          label="Phone"
          name="Phone"
          onChange={handleChange}
          value={prefilledForm.Phone || undefined}
          required
        />
        <Textarea
          label="Description"
          name="Description"
          onChange={handleChange}
          value={prefilledForm.Description || undefined}
          required
        />
        <Fieldset legend="Seating Capacity">
          <NumberInput
            label="Minimum Capacity"
            name="MinCap"
            hideControls
            onChange={(value) => handleNumberChange("MinCap", value || 0)}
            value={prefilledForm.MinCap || undefined}
          />
          <NumberInput
            label="Maximum Capacity"
            name="MaxCap"
            hideControls
            onChange={(value) => handleNumberChange("MaxCap", value || 0)}
            value={prefilledForm.MaxCap || undefined}
          />
        </Fieldset>
        <Fieldset legend="Estimated Price">
          <NumberInput
            label="Minimum price per pax"
            name="MinPrice"
            hideControls
            onChange={(value) => handleNumberChange("MinPrice", value || 0)}
            value={prefilledForm.MinPrice || undefined}
          />
          <NumberInput
            label="Maximum price per pax"
            name="MaxPrice"
            hideControls
            onChange={(value) => handleNumberChange("MaxPrice", value || 0)}
            value={prefilledForm.MaxPrice || undefined}
          />
        </Fieldset>
        <Button type="submit">Submit</Button>
        <p className="error-message">{error}</p>
      </form>
    </>
  );
}
