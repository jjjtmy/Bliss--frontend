import { useState, useEffect } from "react";
import {
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
} from "../../service/vendors.tsx";
import { getUserfromUser, getUser } from "../../service/users.tsx";
import { getToken } from "../../util/security.tsx";
import useToast from "../../components/useToast.tsx";

export default function EditVendorPage() {
  const [formState, setFormState] = useState<{
    [key: string]: string | number;
  }>({});
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState("");
  const [fetchedData, setfetchedData] = useState(false);
  const { successToast, errorToast } = useToast();

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
    const file = event.target.files[0];
    setImageFile(file);
    if (!file) return;
  };

  const handleUploadImageClick = async () => {
    if (!imageFile) return;
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
    console.log("uploadedImageURL", uploadedImageURL);
    setImageURL(uploadedImageURL.url);
  };

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    try {
      const token = getToken();
      if (!token) return;

      const username = await getUser();
      const user = await getUserfromUser(username);
      const userID = user[0]._id;

      const updatedFormState = {
        ...formState,
        image_url: imageURL,
        UserID: userID,
      };

      console.log("updatedFormState", updatedFormState);

      const pageDetails = {
        token: token,
        vendorPage: updatedFormState,
      };

      console.log("pageDetails", pageDetails);
      const res = await editVendorPage(pageDetails);
      successToast({
        title: "Success!",
        message: "Your details have been updated",
      });
    } catch (error) {
      console.error("Edit vendor error:", error);
      errorToast(error.message);
    }
  }

  async function fetchData() {
    try {
      const username = await getUser();
      const user = await getUserfromUser(username);
      const vendorID = await getVendorbyUserID(user[0]._id);
      const vendor = await getVendorPage(vendorID.data._id);
      console.log("fetchData vendor", vendor);
      if (vendor) {
        setFormState(vendor);
        setImageURL(vendor.image_url || "");
      } else {
        setfetchedData(true);
      }
    } catch (error) {
      console.error("Error fetching vendor details", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!formState) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="FormContainer"
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          width: "80vw",
        }}
      >
        <Image
          src={imageURL || formState.image_url}
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
        <button
          className="button"
          style={{ width: "20%", marginLeft: "5px", padding: "2px 0 " }}
          onClick={handleUploadImageClick}
        >
          Upload Image
        </button>
        <TextInput
          label="Name"
          name="Name"
          onChange={handleChange}
          value={formState.Name || ""}
          required
        />
        <TextInput
          label="Location"
          name="Location"
          onChange={handleChange}
          value={formState.Location || ""}
          required
        />
        <TextInput
          label="Email"
          name="Email"
          onChange={handleChange}
          value={formState.Email || ""}
          required
        />
        <TextInput
          label="Phone"
          name="Phone"
          onChange={handleChange}
          value={formState.Phone || ""}
          required
        />
        <Textarea
          label="Description"
          name="Description"
          onChange={handleChange}
          value={formState.Description || ""}
          required
        />
        <Fieldset legend="Seating Capacity">
          <NumberInput
            label="Minimum Capacity"
            name="MinCap"
            hideControls
            onChange={(value) => handleNumberChange("MinCap", value || 0)}
            value={formState.MinCap || 0}
          />
          <NumberInput
            label="Maximum Capacity"
            name="MaxCap"
            hideControls
            onChange={(value) => handleNumberChange("MaxCap", value || 0)}
            value={formState.MaxCap || 0}
          />
        </Fieldset>
        <Fieldset legend="Estimated Price">
          <NumberInput
            label="Minimum price per pax"
            name="MinPrice"
            hideControls
            onChange={(value) => handleNumberChange("MinPrice", value || 0)}
            value={formState.MinPrice || 0}
          />
          <NumberInput
            label="Maximum price per pax"
            name="MaxPrice"
            hideControls
            onChange={(value) => handleNumberChange("MaxPrice", value || 0)}
            value={formState.MaxPrice || 0}
          />
        </Fieldset>
        <button className="button" type="submit">
          Submit
        </button>
        <p className="error-message">{error}</p>
      </form>
    </>
  );
}
