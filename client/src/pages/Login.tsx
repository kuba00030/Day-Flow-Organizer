import "../styles/custom-container.css";
import "../styles/login-register-form.css";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { useState } from "react";
import InputLabeled from "../components/ui/inputs/InputLabeled";
import {
  facebookProvider,
  googleProvider,
  twitterProvider,
} from "../firebase-config/firebaseConfig";
import { useAuthContext } from "../context/authContext";
import handleSignInWithPasswordDB from "../utils/api/sign-in/signInWithPasswordDB";
import handleSignInWithProviderDB from "../utils/api/sign-in/signInWithProviderDB";
import onLoggedRedirectHook from "../utils/hooks/onLoggedRedirectHook";
export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassowrd] = useState<string>("");
  const { authContext } = useAuthContext();
  const navigate = useNavigate();
  onLoggedRedirectHook(authContext.isLogged, navigate);
  return (
    <div className="login-register-container">
      <div className="login-register-welcome-text mb-3">
        <div>
          <span className="login-register-txt-large">
            Sign in to your account
          </span>
        </div>
        <div>
          <span className="login-register-txt-small">
            to make your tasks management easier icon
          </span>
        </div>
      </div>
      <Form className="login-register-form d-flex flex-column gap-2 rounded">
        <InputLabeled
          labelValue="Email"
          labelStyle="login-register-label"
          inputPlaceholder="Email@example.com"
          inputType="email"
          inputValue={email}
          inputStyle="border p-2 bg-transparent rounded text-secondary fw-semibold txt-small focus-ring"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <InputLabeled
          labelValue="Password"
          labelStyle="login-register-label"
          inputPlaceholder="Password"
          inputValue={password}
          inputType="password"
          inputStyle="border p-2 bg-transparent rounded text-secondary fw-semibold txt-small focus-ring"
          onChange={(e) => {
            setPassowrd(e.target.value);
          }}
        />
        <Button
          variant="primary"
          className="rounded"
          size="sm"
          onClick={() => {
            handleSignInWithPasswordDB(email, password);
          }}
        >
          <span className="login-register-txt-small">Sign in</span>
        </Button>
        <Form.Text className="text-center login-register-txt-small">
          or
        </Form.Text>
        <ButtonGroup className="d-flex flex-column gap-2">
          <Button
            className="d-flex flex-row rounded gap-2 border-0 border-bottom bg-white text-dark align-items-center justify-content-center"
            onClick={() => {
              handleSignInWithProviderDB(googleProvider);
            }}
          >
            <FcGoogle className="login-register-provider-icon" />
            <span className="login-register-txt-small">
              Sign in with Google
            </span>
          </Button>
          <Button
            className="d-flex flex-row rounded gap-2 border-0 border-bottom bg-white text-dark align-items-center justify-content-center"
            onClick={() => {
              handleSignInWithProviderDB(facebookProvider);
            }}
          >
            <FaFacebook className="text-primary login-register-provider-icon" />
            <span className="login-register-txt-small">
              Sign in with Facebook
            </span>
          </Button>
          <Button
            className="d-flex flex-row rounded gap-2 border-0 border-bottom bg-white text-dark align-items-center justify-content-center"
            onClick={() => {
              handleSignInWithProviderDB(twitterProvider);
            }}
          >
            <FaTwitter className="text-primary login-register-provider-icon" />
            <span className="login-register-txt-small">
              Sign in with Twitter
            </span>
          </Button>
        </ButtonGroup>
        <Form.Text className="text-center">
          <span className="login-register-txt-small">
            Don't have the account yet?
          </span>
          <Link to="signup" className="login-register-txt-small">
            Sign up here.
          </Link>
        </Form.Text>
      </Form>
    </div>
  );
}
