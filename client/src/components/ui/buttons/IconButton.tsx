import { Button } from "react-bootstrap";
type TNavIconButton = {
  icon: React.ReactNode;
  txt?: string;
  size?: "sm" | "lg";
  buttonClass: string;
  buttonValClass?: string;
  function: () => void;
};
export default function IconButton(props: TNavIconButton) {
  return (
    <Button
      size={props.size}
      className={`d-flex ${props.buttonClass}`}
      onClick={props.function}
    >
      {props.icon}
      {props.txt ? (
        <span className={props.buttonValClass}>{props.txt}</span>
      ) : null}
    </Button>
  );
}
