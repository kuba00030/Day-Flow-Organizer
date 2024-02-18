import Form from "react-bootstrap/Form";
type TInputLabeled = {
  containerStyle?: string;
  inputType: string;
  inputWrapperStyle?: string;
  inputStyle: string;
  inputValue: string | number;
  inputPlaceholder?: string;
  onChange: (e?: any) => void;
  labelValue?: string;
  labelStyle?: string;
  animationData?: string;
  inputKey?: string;
  pattern?: string;
};
export default function InputLabeled(props: TInputLabeled) {
  return (
    <Form.Group
      className={`fw-semibold
        ${
          props.containerStyle
            ? props.containerStyle
            : "d-flex flex-column justify-content-center"
        } 
      `}
    >
      {props.labelValue ? (
        <Form.Label className={props.labelStyle ? props.labelStyle : ""}>
          {props.labelValue}
        </Form.Label>
      ) : null}
      <div
        data-animation={props.animationData}
        className={props.inputWrapperStyle}
      >
        <input
          pattern=""
          key={props.inputKey}
          className={props.inputStyle}
          type={props.inputType}
          placeholder={props.inputPlaceholder}
          value={props.inputValue}
          onChange={props.onChange}
          style={{ outline: "none" }}
        />
      </div>
    </Form.Group>
  );
}
