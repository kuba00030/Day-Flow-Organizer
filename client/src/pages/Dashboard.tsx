import NavBar from "../components/dashboard/nav/NavBar";
import DefaultModal from "../components/modal/ModalDefault";
import { useModalContext } from "../context/modalContext";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  const { modalContext, setModalContext } = useModalContext();

  return (
    <div className="dashboard-container rounded position-relative overflow-hidden">
      <NavBar />
      <div
        className="d-flex flex-row flex-1 p-0"
        style={{ zIndex: 1, overflow: "auto" }}
      >
        <Outlet />
      </div>
      <DefaultModal
        show={modalContext.showModal}
        onHide={() =>
          setModalContext({
            ...modalContext,
            showModal: !modalContext.showModal,
          })
        }
        modalcontent={modalContext.modalContent}
      />
    </div>
  );
}
