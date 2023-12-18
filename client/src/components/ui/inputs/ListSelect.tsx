import { Container } from "react-bootstrap";
import { TaskListsType } from "../../../types/CategoryListType";

type TListSelect = {
  containerStyle: string;
  options: TaskListsType;
  optionStyle: string;
  label: string;
  labelStyle: string;
  onChange: (e?: any) => void;
  selectStyle: string;
  selectedList: string;
};
export default function ListSelect(props: TListSelect) {
  return (
    <Container className={props.containerStyle}>
      <div>
        <span className={props.labelStyle}>{props.label}</span>
      </div>
      <select
        className={props.selectStyle}
        value={props.selectedList}
        onChange={props.onChange}
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
