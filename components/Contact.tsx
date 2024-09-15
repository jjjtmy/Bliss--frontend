import { useState } from "react";
import { Box, Textarea, TextInput } from "@mantine/core";
import useToast from "./useToast";

export default function Contact() {
  const [result, setResult] = useState("");
  const { successToast, errorToast } = useToast();

  const onSubmit = async (event) => {
    event.preventDefault();

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setResult("Error: Access key is missing");
      return;
    }

    const formData = new FormData(event.target);
    formData.append("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        event.target.reset();
        successToast({
          title: "Form submitted successfully!",
          message: "The vendor will get back to you soon.",
        });
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.log("Error", error);
      errorToast();
    }
  };

  return (
    <div>
      <Box className="FormContainer" w="90%" m="5px auto" fontSize="12px">
        <form onSubmit={onSubmit}>
          <TextInput
            label="Name"
            name="Name"
            required
            style={{ width: "100%" }}
          />
          <TextInput
            label="Email"
            name="Email"
            required
            style={{ width: "100%" }}
          />
          <Textarea
            label="Message"
            name="Message"
            required
            autosize
            minRows={6}
            maxRows={6}
            placeholder="Type your message here"
            style={{ width: "100%" }}
          />
          <button className="button" type="submit" style={{ margin: "10px 0" }}>
            Send Email
          </button>
        </form>
        <div>{result}</div>
      </Box>
    </div>
  );
}
