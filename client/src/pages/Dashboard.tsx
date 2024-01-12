import NavBar from "../components/dashboard/nav/NavBar";
import DefaultModal from "../components/modal/ModalDefault";
import { useModalContext } from "../context/modalContext";
import "../styles/custom-container.css";
import "../styles/dashboard/dashboard-nav.css";
import { Outlet } from "react-router-dom";
export default function Dashboard() {
  const { modalContext, setModalContext } = useModalContext();

  return (
    <div className="d-flex flex-row dashboard-container ">
      <NavBar />
      <div className="d-flex flex-row" style={{ flex: 1 }}>
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
