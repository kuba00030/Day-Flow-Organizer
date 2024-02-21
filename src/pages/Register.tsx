import Form from "react-bootstrap/Form";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import InputLabeled from "../components/ui/inputs/InputLabeled";
import signUpWithEmailAndPassword from "../utils/api/sign-up/signUpWithEmailAndPassword";
import useNavigateTo from "../hooks/useNavigateTo";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const { navigateTo } = useNavigateTo();

  const registerValidation = (): boolean => {
    if (
      email !== "" &&
      password !== "" &&
      password.length > 7 &&
      repeatPassword === password
    ) {
      return true;
    }
    return false;
  };

  return (
    <Container
      className="login-register-container"
      style={{ maxWidth: "350px" }}
    >
      <div className="d-flex flex-column text-center mb-3">
        <div>
          <span className="txt-large my-color-light">
            Sign up to create your account
          </span>
        </div>
      </div>
      <Form className="login-register-form d-flex flex-column gap-2 rounded">
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
          labelValue="Passowrd"
          labelStyle="my-color-light txt-medium"
          inputPlaceholder="Password"
          inputType="password"
          inputValue={password}
          inputStyle="shadowHover shadowFocus w-100 border-0 p-2 my-bg-dark my-color-light fw-semibold rounded"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <InputLabeled
          labelValue="Password repeat"
          labelStyle="my-color-light txt-medium"
          inputPlaceholder="Repeat your password"
          inputType="password"
          inputValue={repeatPassword}
          inputStyle="shadowHover shadowFocus w-100 border-0 p-2 my-bg-dark my-color-light fw-semibold rounded"
          onChange={(e) => {
            setRepeatPassword(e.target.value);
          }}
        />

        <Button
          className="rounded btn-purple fw-semibold txt-small"
          onClick={async () => {
            if (registerValidation() === true) {
              await signUpWithEmailAndPassword(email, password).then(() => {
                navigateTo("/dashboard");
              });
            } else {
              window.alert(
                `All fields must be filled in.\n"Password" must contains at least 7 characters.\n"Password" and "Password repeat" must be the same.`
              );
            }
          }}
        >
          Sign up
        </Button>
        <Form.Text className="text-center fw-semibold txt-smaller my-color-light">
          Already have account? <Link to="/">Sign in here</Link>
        </Form.Text>
      </Form>
    </Container>
  );
}
