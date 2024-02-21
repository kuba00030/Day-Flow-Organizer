import { Modal } from "react-bootstrap";
export default function DefaultModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {props.modalcontent}
    </Modal>
  );
}
