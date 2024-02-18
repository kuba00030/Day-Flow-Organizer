import { Button } from "react-bootstrap";
import { MdAdd as AddIcon } from "react-icons/md";
type AddButton = {
  txt?: string;
  size?: "sm" | "lg";
  buttonClass: string;
  buttonValClass?: string;
  onClick: () => void;
};
export default function AddButton(props: AddButton) {
  return (
    <Button
      size={props.size}
      className={`d-flex flex-row fw-semibold align-items-center rounded btn-purple  ${props.buttonClass}`}
      onClick={props.onClick}
    >
      <AddIcon className="regular-icon my-color-lighter" />
      {props.txt ? (
        <span className={`my-color-lighter ${props.buttonValClass}`}>
          {props.txt}
        </span>
      ) : null}
    </Button>
  );
}
