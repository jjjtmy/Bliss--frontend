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
    <div className="loginpage">
      <Box className="Form">
        <Box className="FormContainer">
          <form onSubmit={handleSubmit}>
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
              styles={{
                visibilityToggle: {
                  backgroundColor: "#f5cac3",
                },
              }}
            />
            <Button className="button" type="submit">
              LOG IN
            </Button>
            {/* TODO: fix background of loginbutton */}
          </form>
          <Text c="dimmed" size="sm" ta="center" mt={10}>
            Do not have an account yet?{" "}
            <Anchor size="sm" href="/signup" mt={-10}>
              Create account
            </Anchor>
          </Text>
          <p className="error-message"></p>
        </Box>
      </Box>
    </div>
  );
}
