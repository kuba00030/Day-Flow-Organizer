import "../styles/custom-container.css";
import "../styles/login-register-form.css";
import Form from "react-bootstrap/Form";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Register() {
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
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email@example.com"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Repeat password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repeat your password"
          ></Form.Control>
        </Form.Group>
        <Button className="rounded">Sign up</Button>
        <Form.Text className="text-center">
          Already have account? <Link to="/">Sign in here</Link>
        </Form.Text>
      </Form>
    </Container>
  );
}
