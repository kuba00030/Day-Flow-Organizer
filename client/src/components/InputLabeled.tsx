import Form from "react-bootstrap/Form";
type TInputLabeled = {
  label: string;
  inputType: string;
  placeholder: string;
  setStateOnChange: (e: any) => void;
};
export default function InputLabeled(props: TInputLabeled) {
  return (
    <Form.Group>
      <Form.Label className="login-register-label">{props.label}</Form.Label>
      <Form.Control
        size="sm"
        type={props.inputType}
        placeholder={props.placeholder}
        onChange={(e) => {
          props.setStateOnChange(e.target.value);
        }}
      />
    </Form.Group>
  );
}
