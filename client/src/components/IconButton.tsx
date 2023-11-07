import { Button } from "react-bootstrap";
type TNavIconButton = {
  icon: React.ReactNode;
  txt: string;
  buttonStyle: string;
};
export default function IconButton(props: TNavIconButton) {
  return (
    <Button
      size="sm"
      className={props.buttonStyle}
      onClick={() => {
        console.log("navigate to " + props.txt);
      }}
    >
      {props.icon}
      <span className="accordion-item-txt">{props.txt}</span>
    </Button>
  );
}
