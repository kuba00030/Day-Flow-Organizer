import { Button } from "react-bootstrap";
type IconButton = {
  icon: React.ReactNode;
  txt?: string;
  size?: "sm" | "lg";
  buttonClass: string;
  buttonValClass?: string;
  function: () => void;
};
export default function IconButton(props: IconButton) {
  return (
    <Button
      size={props.size}
      className={props.buttonClass}
      onClick={props.function}
    >
      {props.icon}
      {props.txt ? (
        <span className={props.buttonValClass}>{props.txt}</span>
      ) : (
        <></>
      )}
    </Button>
  );
}
