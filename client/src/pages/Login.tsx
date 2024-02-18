import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import InputLabeled from "../components/ui/inputs/InputLabeled";
import { googleProvider } from "../firebase-config/firebaseConfig";
import handleSignInWithPasswordDB from "../utils/api/sign-in/signInWithPasswordDB";
import handleSignInWithProviderDB from "../utils/api/sign-in/signInWithProviderDB";
import IconButton from "../components/ui/buttons/IconButton";
import useRedirectOnAuth from "../hooks/useRedirectOnAuth";

export default function Login() {
  const { redirectOnAuth } = useRedirectOnAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassowrd] = useState<string>("");

  redirectOnAuth("dashboard", true);

  return (
    <div className="login-register-container">
      <div className="d-flex flex-column text-center mb-3">
        <div>
          <span className="txt-large my-color-light">
            Sign in to your account
          </span>
        </div>
        <div>
          <span className="txt-small my-color-light">
            to make your tasks management easier
          </span>
        </div>
      </div>
      <Form className="login-register-form bg-transparent d-flex flex-column gap-2 rounded">
        <InputLabeled
          labelValue="Email"
          labelStyle="my-color-light txt-medium"
          inputPlaceholder="Email@example.com"
          inputType="email"
          inputValue={email}
          inputStyle="shadowHover shadowFocus w-100 border-0 p-2 my-bg-dark my-color-light fw-semibold rounded"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <InputLabeled
          labelValue="Password"
          labelStyle="my-color-light txt-medium"
          inputPlaceholder="Password"
          inputValue={password}
          inputType="password"
          inputStyle="shadowHover shadowFocus w-100 border-0 p-2 my-bg-dark my-color-light fw-semibold rounded"
          onChange={(e) => {
            setPassowrd(e.target.value);
          }}
        />
        <Button
          className="rounded btn-purple fw-semibold small"
          onClick={() => {
            if (email !== "" && password !== "") {
              handleSignInWithPasswordDB(email, password);
            } else window.alert("Fill in email and password field.");
          }}
        >
          Sign in
        </Button>
        <Form.Text className="text-center txt-small my-color-light fw-semibold">
          or
        </Form.Text>
        <ButtonGroup className="d-flex flex-column gap-2">
          <IconButton
            buttonClass="flex-row rounded gap-2 btn-purple-outline align-items-center justify-content-center "
            buttonValClass="txt-small fw-semibold my-color-lighter"
            icon={<FcGoogle className="text-primary regular-icon" />}
            txt="Sign in with Google"
            function={() => {
              handleSignInWithProviderDB(googleProvider);
            }}
          />
        </ButtonGroup>
        <Form.Text className="text-center txt-smaller my-color-light">
          Don't have the account yet?
          <Link to="signup">Sign up here.</Link>
        </Form.Text>
      </Form>
    </div>
  );
}
