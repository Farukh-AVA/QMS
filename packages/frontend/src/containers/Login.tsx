import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import LoaderButton from "../components/LoaderButton.tsx";
import { Amplify } from "aws-amplify";
import { Auth } from "aws-amplify";
import customerConfig  from "../CustomerConfig";
import adminConfig from "../AdminConfig";
import { useAppContext } from "../lib/contextLib";
import { onError } from "../lib/errorLib";
import "./Login.css";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userHasAuthenticated } = useAppContext();  

  //console.log(Amplify)  
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const configOption = email === "admin@example.com"? adminConfig : customerConfig;
    Amplify.configure(configOption);

    setIsLoading(true);

    try { 
        await Auth.signIn(email, password);
        const user = await Auth.currentAuthenticatedUser()
        const userType = user.attributes["custom:type"]
        sessionStorage.setItem('userType', userType)
        userHasAuthenticated(true);
    } catch (error) {
      onError(error);
      setIsLoading(false);
    }
}

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Stack gap={3}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              size="lg"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              size="lg"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <LoaderButton
            size="lg"
            type="submit"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Login
          </LoaderButton>
        </Stack>
      </Form>
    </div>
  );
}