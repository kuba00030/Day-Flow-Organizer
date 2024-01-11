import { Form } from "react-bootstrap";
type TInputDate = {
  containerSyle: string;
  labelValue?: string;
  labelStyle?: string;
  inputStyle: string;
  inputType: string;
  inputPlaceholder?: string;
  inputValue: string;
  onChange: (e?: any) => void;
  animationData?: string;
};
export default function InputDate(props: TInputDate) {
  return (
    <Form.Group className={props.containerSyle}>
      {props.labelValue ? (
        <Form.Label className={props.labelStyle ? props.labelStyle : ""}>
          {props.labelValue}
        </Form.Label>
      ) : null}
      <input
        className={props.inputStyle}
        type={props.inputType}
        placeholder={props.inputPlaceholder}
        value={props.inputValue}
        onChange={props.onChange}
        style={{ outline: "none" }}
        data-animation={props.animationData}
      />
    </Form.Group>
  );
}
