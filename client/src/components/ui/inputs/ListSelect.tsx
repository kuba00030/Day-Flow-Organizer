import { Container } from "react-bootstrap";

type ListSelect = {
  containerStyle: string;
  options: string[];
  optionStyle: string;
  label?: string;
  labelStyle?: string;
  onChange: (e?: any) => void;
  selectStyle: string;
  selectedList: string;
  animationData?: string;
};
export default function ListSelect(props: ListSelect) {
  return (
    <Container className={props.containerStyle}>
      <div>
        <span className={props.labelStyle}>{props.label}</span>
      </div>
      <select
        className={props.selectStyle}
        value={props.selectedList}
        onChange={props.onChange}
        data-animation={props.animationData}
      >
        {props.options.map((option): React.ReactNode => {
          return (
            <option
              className={props.optionStyle}
              key={`option selected: ${option}`}
            >
              {option}
            </option>
          );
        })}
      </select>
    </Container>
  );
}
