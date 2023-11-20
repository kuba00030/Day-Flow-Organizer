import { Button } from "react-bootstrap";
type TNavIconButton = {
  icon: React.ReactNode;
  txt?: string;
  size?: "sm" | "lg";
  buttonClass: string;
  function: () => void;
};
export default function IconButton(props: TNavIconButton) {
  return (
    <Button
      size={props.size}
      className={props.buttonClass}
      onClick={props.function}
    >
      {props.icon}
      {props.txt ? (
        <span className="accordion-item-txt">{props.txt}</span>
      ) : null}
    </Button>
  );
}
