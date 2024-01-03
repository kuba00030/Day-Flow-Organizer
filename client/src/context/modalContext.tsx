import { createContext, useContext, useState } from "react";
import { ContextProviderProps } from "./authContext";

type Modal = {
  modalContent: React.ReactNode | null;
  showModal: boolean;
};

type ModalContext = {
  modalContext: Modal;
  setModalContext: React.Dispatch<React.SetStateAction<Modal>>;
};

export const ModalContext = createContext<ModalContext | null>(null);

export default function ModalContextProvider({
  children,
}: ContextProviderProps) {
  const [modalContext, setModalContext] = useState<Modal>({
    modalContent: null,
    showModal: false,
  });

  return (
    <ModalContext.Provider
      value={{
        modalContext,
        setModalContext,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "useModalContext should be used within a  ModalContextProvider"
    );
  }
  return context;
}
