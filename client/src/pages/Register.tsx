import "../styles/custom-container.css";
import "../styles/login-register-form.css";
import Form from "react-bootstrap/Form";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import InputLabeled from "../components/InputLabeled";
export default function Register() {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [repeatPassword, setRepeatPassword] = useState<string | null>(null);
  // createUserWithEmail
  return (
    <Container
      className="login-register-container"
      style={{ maxWidth: "350px" }}
    >
      <div className="login-register-welcome-text mb-3">
        <div>
          <span className="login-register-txt-large">
            Sign up to create your account
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
          label="Passowrd"
          placeholder="Password"
          inputType="password"
          labelClass="login-register-label"
          setStateOnChange={setPassword}
        />
        <InputLabeled
          label="Repeat password"
          placeholder="Repeat your password"
          inputType="password"
          labelClass="login-register-label"
          setStateOnChange={setRepeatPassword}
        />
        <Button className="rounded">Sign up</Button>
        <Form.Text className="text-center">
          Already have account? <Link to="/">Sign in here</Link>
        </Form.Text>
      </Form>
    </Container>
  );
}
