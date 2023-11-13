import { createContext } from "react";

type TModalContext = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalContent: React.ReactNode;
  setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
};

export const ModalContext = createContext<TModalContext | null>(null);
