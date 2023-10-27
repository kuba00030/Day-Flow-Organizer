import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "../styles/custom-container.css";
import "../styles/login-register-form.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaTwitter } from "react-icons/fa";
export default function Login() {
  return (
    <Container
      className="login-register-container"
      style={{ maxWidth: "350px" }}
    >
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
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email@example.com" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button className="rounded">Sign in</Button>
        <Form.Text className="text-center">or</Form.Text>
        <ButtonGroup className="d-flex flex-column gap-2">
          <Button className="d-flex flex-row rounded gap-2 bg-light border-0 border-bottom bg-white text-dark align-items-center justify-content-center">
            <FcGoogle className="login-register-provider-icon" />
            <span>Sign in with Google</span>
          </Button>
          <Button className="d-flex flex-row rounded gap-2 bg-light border-0 border-bottom bg-white text-dark align-items-center justify-content-center">
            <FaFacebook className="text-primary login-register-provider-icon" />
            <span>Sign in with Facebook</span>
          </Button>
          <Button className="d-flex flex-row rounded gap-2 bg-light border-0 border-bottom bg-white text-dark align-items-center justify-content-center">
            <FaTwitter className="text-primary login-register-provider-icon" />
            <span>Sign in with Twitter</span>
          </Button>
        </ButtonGroup>
        <Form.Text className="text-center">
          Don't have the account yet? <Link to="signup">Sign up here.</Link>
        </Form.Text>
      </Form>
    </Container>
  );
}
