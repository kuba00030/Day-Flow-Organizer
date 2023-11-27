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
    <Button size="sm" className={props.containerStyle} onClick={props.onClick}>
      {props.icon}
      <span className={props.headerStyle}>{props.header}</span>
      <span className={props.itemStyle}>{props.itemValue}</span>
    </Button>
  );
}
