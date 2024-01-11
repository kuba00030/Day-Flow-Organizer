import { Container } from "react-bootstrap";
import { TaskLists } from "../../../context/tasksContext";

type ListSelect = {
  containerStyle: string;
  options: TaskLists;
  optionStyle: string;
  label: string;
  labelStyle: string;
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
              key={`category task details: ${option.listName}`}
            >
              {option.listName}
            </option>
          );
        })}
      </select>
    </Container>
  );
}
