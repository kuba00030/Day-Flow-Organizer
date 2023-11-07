import { Button } from "react-bootstrap";
type TNavAccordionItem = {
  header: string;
  icon: React.ReactNode;
};
export default function NavAccordionItem(props: TNavAccordionItem) {
  return (
    <Button
      size="sm"
      className={`d-flex flex-row align-items-center rounded border-0 bg-transparent fw-semibold`}
    >
      {props.icon}
      <span
        className={`accordion-item-txt text-secondary
        }`}
      >
        {props.header}
      </span>
      <span
        className={`accordion-item-txt text-secondary ms-auto
        }`}
      >
        10
      </span>
    </Button>
  );
}
