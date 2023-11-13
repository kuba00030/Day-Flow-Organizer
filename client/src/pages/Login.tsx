import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "../styles/custom-container.css";
import "../styles/login-register-form.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import InputLabeled from "../components/InputLabeled";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  auth,
  facebookProvider,
  googleProvider,
  twitterProvider,
} from "../firebase-config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../context/authContext";
export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassowrd] = useState<string>("");
  const { setToken, isLogged } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogged === true) {
      navigate("/dashboard");
      console.log(isLogged);
    }
  }, [isLogged]);

  /* instead of writing separeted funciton for each provider used,
  check which instance of provider was used and return its class
  imported from firebase
  (needed for credential while signing in with certain authentication provider) 
   */
  const handleProviderCheck = (provider: any) => {
    switch (provider) {
      case googleProvider:
        return GoogleAuthProvider;
        break;
      case facebookProvider:
        return FacebookAuthProvider;
        break;
      case twitterProvider:
        return TwitterAuthProvider;
        break;
      default:
        return null;
    }
  };

  // login with given provide (google,facebook,twitter) as parameter
  const handleSignInWithProvider = (provider: any) => {
    signInWithPopup(auth, provider)
      .then((result: any) => {
        const credential =
          handleProviderCheck(provider).credentialFromResult(result);
        // google acces token
        const token = credential.accessToken;
        // user info
        const user = result.user;
        setToken(token);
        // sett all app components states
      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
  // sign in with email & password
  const handleSignInWithPassword = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

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
          label="Email"
          placeholder="Email@example.com"
          inputType="email"
          labelClass="login-register-label"
          setStateOnChange={setEmail}
        />
        <InputLabeled
          label="Password"
          placeholder="Password"
          inputType="password"
          labelClass="login-register-label"
          setStateOnChange={setPassowrd}
        />
        <Button
          variant="primary"
          className="rounded"
          size="sm"
          onClick={handleSignInWithPassword}
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
              handleSignInWithProvider(googleProvider);
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
              handleSignInWithProvider(facebookProvider);
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
              handleSignInWithProvider(twitterProvider);
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
