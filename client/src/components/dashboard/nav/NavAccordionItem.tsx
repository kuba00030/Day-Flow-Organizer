import { Button } from "react-bootstrap";
type TNavAccordionItem = {
  header: string;
  headerStyle: string;
  itemStyle: string;
  icon: React.ReactNode;
  containerStyle: string;
};
export default function NavAccordionItem(props: TNavAccordionItem) {
  return (
    <Button size="sm" className={props.containerStyle}>
      {props.icon}
      <span className={props.headerStyle}>{props.header}</span>
      <span className={props.itemStyle}>10</span>
    </Button>
  );
}
