import { Button } from "react-bootstrap";
type NavAccordionItem = {
  header: string;
  icon: React.ReactNode;
  itemValue: number | undefined;
  onClick: (value: any) => void;
};
export default function NavAccordionItem(props: NavAccordionItem) {
  return (
    <Button
      data-style={`navbar-list-${props.header}`}
      className="d-flex flex-row align-items-center rounded border-0 fw-semibold nav-accordion-item pt-2 pe-2 pb-2 "
      onClick={props.onClick}
    >
      <div
        className="d-flex align-items-center"
        style={{ pointerEvents: "none" }}
      >
        {props.icon}
      </div>
      <span className="txt-small" style={{ pointerEvents: "none" }}>
        {props.header}
      </span>
      {props.itemValue === undefined ? (
        <></>
      ) : (
        <span className="txt-small ms-auto" style={{ pointerEvents: "none" }}>
          {props.itemValue}
        </span>
      )}
    </Button>
  );
}
