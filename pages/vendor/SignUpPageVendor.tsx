import { useState } from "react";
import { signUp } from "../../service/users";
import { hashData } from "../../util/security";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextInput, PasswordInput } from "@mantine/core";
// import "./SignUpPageVendor.css";

export default function SignUpPageVendor() {
  const [formState, setFormState] = useState<{ [key: string]: string }>({});
  const [disable, setDisable] = useState(true);

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    let currForm = formState;
    currForm[evt.target.name] = evt.target.value;
    setDisable(checkPassword());
    setFormState(currForm);
  }

  // make sure check and password is the same
  function checkPassword(): boolean {
    // password validation
    // must have at least 1 uppercase, 1 lowercase, 1 special
    let currForm = formState;
    if (!currForm.password) {
      return true;
    }
    if (!currForm.confirm) {
      return true;
    }
    if (currForm.password !== currForm.confirm) {
      console.log(currForm.password);
      console.log(currForm.confirm);
      return true;
    }
    return false;
  }

  function hashPassword() {
    let currForm = formState;
    if (currForm.password) {
      // console.log(currForm.password)
      let hash = hashData(currForm.password);
      currForm.password = hash.hash;
      currForm.salt = hash.salt;
      currForm.iterations = hash.iterations;
    }
  }

  const navigate = useNavigate();
  async function handleSubmit(evt: React.FormEvent) {
    try {
      evt.preventDefault();
      // We don't want to send the 'error' or 'confirm' property,
      //  so let's make a copy of the state object, then delete them
      // highlight-start
      hashPassword();
      const formData = { ...formState };
      delete formData.error;
      delete formData.confirm;
      formData.role = "vendor";
      // highlight-end
      console.log(formData);
      const user = await signUp(formData);
      console.log(user);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Box>
      <div
        className="FormContainer"
        style={{ width: "60vw", margin: "50px auto" }}
      >
        <form autoComplete="off" onSubmit={handleSubmit}>
          <TextInput
            label="Name"
            name="name"
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
          <TextInput
            label="E-mail"
            name="email"
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
          <PasswordInput
            label="Password"
            name="password"
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
          <PasswordInput
            label="Confirm"
            name="confirm"
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
          <Button type="submit" disabled={disable} style={{ margin: "10px 0" }}>
            SIGN UP
          </Button>
        </form>
      </div>
      <p className="error-message">&nbsp;</p>
    </Box>
  );
}
