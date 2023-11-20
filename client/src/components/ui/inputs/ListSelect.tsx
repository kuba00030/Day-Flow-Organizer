import { Container } from "react-bootstrap";
type TListSelect = {
  containerStyle: string;
  options: any[];
  optionsProperty?: string;
  optionStyle: string;
  label: string;
  labelStyle: string;
  selectStyle: string;
  onChange: (e?: any) => void;
  selectValue: string;
};
export default function ListSelect(props: TListSelect) {
  return (
    <Container className={props.containerStyle}>
      <div>
        <span className={props.labelStyle}>{props.label}</span>
      </div>
      <select
        className={props.selectStyle}
        value={props.selectValue}
        onChange={props.onChange}
      >
        {props.options.map((option): React.ReactNode => {
          return (
            <option
              className={props.optionStyle}
              key={`category task details: ${
                props.optionsProperty ? option[props.optionsProperty] : option
              }`}
            >
              {props.optionsProperty ? option[props.optionsProperty] : option}
            </option>
          );
        })}
      </select>
    </Container>
  );
}
