import { Button } from "react-bootstrap";
type TNavIconButton = {
  icon: React.ReactNode;
  txt: string;
  buttonStyle: string;
  function: () => void;
};
export default function IconButton(props: TNavIconButton) {
  return (
    <Button size="sm" className={props.buttonStyle} onClick={props.function}>
      {props.icon}
      <span className="accordion-item-txt">{props.txt}</span>
    </Button>
  );
}
