import { Button } from "react-bootstrap";
type TNavAccordionItem = {
  header: string;
  headerStyle: string;
  itemStyle: string;
  icon: React.ReactNode;
  containerStyle: string;
  itemValue: number | string;
  onClick: (value: any) => void;
};
export default function NavAccordionItem(props: TNavAccordionItem) {
  return (
    <Button
      data-style={`navbar-list-${props.header}`}
      className={props.containerStyle}
      onClick={props.onClick}
    >
      <div
        style={{ pointerEvents: "none", display: "flex", alignItems: "center" }}
      >
        {props.icon}
      </div>
      <span className={props.headerStyle} style={{ pointerEvents: "none" }}>
        {props.header}
      </span>
      <span className={props.itemStyle} style={{ pointerEvents: "none" }}>
        {props.itemValue}
      </span>
    </Button>
  );
}
