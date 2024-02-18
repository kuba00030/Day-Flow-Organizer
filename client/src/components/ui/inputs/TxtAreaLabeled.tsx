import { Form } from "react-bootstrap";

type TxtAreaLabeled = {
  containerClass?: string;
  inputWrapperClass?: string;
  labelValue: string;
  labelClass: string;
  txtAreaValue: string;
  txtAreaClass: string;
  animationData?: string;
  placeholder?: string;
  onChange: (e?: any) => void;
};

export default function TxtAreaLabeled(props: TxtAreaLabeled) {
  return (
    <Form.Group
      className={`fw-semibold 
    ${
      props.containerClass
        ? props.containerClass
        : "d-flex flex-column justify-content-center"
    }
  `}
    >
      <Form.Label className={props.labelClass ? props.labelClass : ""}>
        {props.labelValue}
      </Form.Label>
      <div
        data-animation={props.animationData}
        className={props.inputWrapperClass}
      >
        <textarea
          placeholder={props.placeholder}
          value={props.txtAreaValue}
          onChange={props.onChange}
          className={` ${props.txtAreaClass}`}
          style={{ resize: "none" }}
        />
      </div>
    </Form.Group>
  );
}
