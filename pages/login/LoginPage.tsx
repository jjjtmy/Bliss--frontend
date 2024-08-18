import { useState } from "react";
import {
  Box,
  Button,
  Anchor,
  Text,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import { getLoginDetails, loginUser } from "../../service/users";
import { hashDataWithSaltRounds, storeToken } from "../../util/security";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import NavBar from "../../components/NavBar";

export default function LoginPage() {
  const [formState, setFormState] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setFormState((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  }

  async function handleSubmit(evt: React.FormEvent) {
    try {
      evt.preventDefault();
      const formData = { ...formState };
      delete formData.error;
      delete formData.confirm;

      const loginDetails = await getLoginDetails(formData.email);
      console.log("loginpage getLoginDetails", loginDetails);
      const hashedPassword = hashDataWithSaltRounds(
        formData.password,
        loginDetails.data.salt,
        loginDetails.data.iterations
      );
      formData.password = hashedPassword;
      console.log("formData", formData);
      const token = await loginUser(formData);
      storeToken(token);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <NavBar />
      <Box className="FormContainer">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            name="email"
            onChange={handleChange}
            required
          />
          <PasswordInput
            label="Password"
            name="password"
            onChange={handleChange}
            required
          />
          <Button type="submit">LOG IN</Button>
        </form>
        <Text c="dimmed" size="sm" ta="center" mt={10}>
          Do not have an account yet?{" "}
          <Anchor size="sm" href="/signup" mt={-10}>
            Create account
          </Anchor>
        </Text>
        {/* <Text c="dimmed" size="sm" ta="center" mt={10}>
          Are you a vendor?{" "}
          <Anchor size="sm" href="/signupvendor" mt={-10}>
            Create a vendor account
          </Anchor>
        </Text> */}
        <p className="error-message">&nbsp;</p>
      </Box>
    </>
  );
}
