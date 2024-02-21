import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { IoIosArrowUp as ArrowIcon } from "react-icons/io";
import Card from "react-bootstrap/Card";
import React, { useState } from "react";
type NavAccordion = {
  header: string;
  items: any[];
};
export default function NavAccordion(props: NavAccordion) {
  const [isOpened, setIsOpened] = useState(false);

  const renderItems = (): React.ReactNode => {
    return props.items.map((item, index) => {
      return React.cloneElement(item, { key: index });
    });
  };

  const AccordionToggle = ({ children, eventKey }) => {
    const toogle = useAccordionButton(eventKey, () => {
      setIsOpened(!isOpened);
    });
    return (
      <button
        className="d-flex flex-row align-items-center border-0 bg-transparent w-100 accordion-toogle-btn my-color-light"
        type="button"
        onClick={toogle}
      >
        {children}
      </button>
    );
  };

  return (
    <Accordion defaultActiveKey="1">
      <Card className="border-0 bg-transparent">
        <Card.Header className="border-0 bg-transparent p-2">
          <AccordionToggle eventKey="0">
            <span className="d-flex flex-1 txt-smaller my-color-light fw-bold">
              {props.header}
            </span>
            <ArrowIcon
              style={{
                transform: `rotate(${isOpened === false ? 180 : 0}deg)`,
              }}
            />
          </AccordionToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="d-flex flex-column rounded p-1 gap-2 my-bg-dark">
            {props.items.length > 0 ? (
              renderItems()
            ) : (
              <div className="text-center my-color-light fw-semibold txt-small">
                Add your first list
              </div>
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
