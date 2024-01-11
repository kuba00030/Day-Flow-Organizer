import Form from "react-bootstrap/Form";
type TInputLabeled = {
  inputType: string;
  inputStyle: string;
  inputValue: string | number;
  inputPlaceholder?: string;
  onChange: (e?: any) => void;
  labelValue?: string;
  labelStyle?: string;
  animationData?: string;
  inputKey?: string;
};
export default function InputLabeled(props: TInputLabeled) {
  return (
    <Form.Group className="d-flex flex-column justify-content-center">
      {props.labelValue ? (
        <Form.Label className={props.labelStyle ? props.labelStyle : ""}>
          {props.labelValue}
        </Form.Label>
      ) : null}
      <input
        key={props.inputKey}
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
