import "../styles/custom-container.css";
import "../styles/login-register-form.css";
import Form from "react-bootstrap/Form";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import InputLabeled from "../components/ui/inputs/InputLabeled";
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
          labelValue="Email"
          labelStyle="login-register-label"
          inputPlaceholder="Email@example.com"
          inputType="email"
          inputValue={email}
          inputStyle="border p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <InputLabeled
          labelValue="Passowrd"
          labelStyle="login-register-label"
          inputPlaceholder="Password"
          inputType="password"
          inputValue={password}
          inputStyle="border p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <InputLabeled
          labelValue="Repeat password"
          labelStyle="login-register-label"
          inputPlaceholder="Repeat your password"
          inputType="password"
          inputValue={repeatPassword}
          inputStyle="border p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
          onChange={(e) => {
            setRepeatPassword(e.target.value);
          }}
        />
        <Button className="rounded">Sign up</Button>
        <Form.Text className="text-center">
          Already have account? <Link to="/">Sign in here</Link>
        </Form.Text>
      </Form>
    </Container>
  );
}
