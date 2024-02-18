import { Form } from "react-bootstrap";
import getCurrentDate from "../../../utils/task-list/get/getCurrentDate";
type TInputDate = {
  containerSyle: string;
  labelValue?: string;
  labelStyle?: string;
  inputWrapperStyle?: string;
  inputStyle: string;
  inputType: string;
  inputPlaceholder?: string;
  inputValue: string;
  onChange: (e?: any) => void;
  animationData?: string;
};
export default function InputDate(props: TInputDate) {
  return (
    <Form.Group className={`${props.containerSyle} `}>
      {props.labelValue ? (
        <Form.Label className={`${props.labelStyle ? props.labelStyle : ""}`}>
          {props.labelValue}
        </Form.Label>
      ) : null}
      <div
        className={props.inputWrapperStyle}
        data-animation={props.animationData}
      >
        <input
          className={props.inputStyle}
          type={props.inputType}
          placeholder={props.inputPlaceholder}
          value={props.inputValue}
          min={getCurrentDate()}
          onChange={props.onChange}
          style={{ outline: "none" }}
        />
      </div>
    </Form.Group>
  );
}
