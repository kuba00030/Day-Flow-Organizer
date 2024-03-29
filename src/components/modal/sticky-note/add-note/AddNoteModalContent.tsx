import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import InputLabeled from "../../../ui/inputs/InputLabeled";
import { useState } from "react";
import { Note, useNotesContext } from "../../../../context/noteContext";
import { useModalContext } from "../../../../context/modalContext";
import addNote from "../../../../utils/notes/addNote";
import { useAuthContext } from "../../../../context/authContext";
import TxtAreaLabeled from "../../../ui/inputs/TxtAreaLabeled";
import setNotesDB from "../../../../utils/api/post-data/post/setNotesDB";

export default function AddNoteModalContent() {
  const { setModalContext, modalContext } = useModalContext();
  const { authContext } = useAuthContext();
  const { setNotes, notes } = useNotesContext();
  const [newNote, setNewNote] = useState<Note>({
    title: "",
    noteColor: "#FFFFFF",
    description: "",
    id: new Date().getTime(),
  });

  const noteIsValid = () => {
    return newNote.title !== "" &&
      newNote.description !== "" &&
      newNote.noteColor !== ""
      ? true
      : false;
  };

  return (
    <>
      <ModalHeader className="my-bg-darker my-color-light border-0">
        <ModalTitle
          id="contained-modal-title-vcenter"
          className="my-color-light border-0"
        >
          Add note
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="d-flex flex-column gap-4 border-0 my-bg-darker modal-body overflow-auto">
        <InputLabeled
          containerStyle="fw-semibold d-flex flex-column justify-content-center gap-2"
          labelValue="Title"
          labelStyle="my-color-light fw-semibold mb-1 txt-small"
          inputType="text"
          inputPlaceholder="Title..."
          inputValue={newNote.title}
          inputStyle="shadowHover shadowFocus w-100 border-0 p-2 my-bg-dark my-color-light fw-semibold rounded"
          onChange={(e) => {
            setNewNote({ ...newNote, title: e.target.value });
          }}
        />
        <InputLabeled
          containerStyle="fw-semibold d-flex flex-column justify-content-center gap-2"
          labelValue="Color"
          labelStyle="my-color-light fw-semibold mb-1 txt-small"
          inputType="color"
          inputValue={newNote.noteColor}
          inputStyle="shadowHover shadowFocus border-0 p-2 my-bg-dark my-color-light fw-semibold rounded"
          onChange={(e) => {
            setNewNote({ ...newNote, noteColor: e.target.value });
          }}
        />
        <TxtAreaLabeled
          containerClass="fw-semibold d-flex flex-column flex-grow-1 gap-2"
          labelValue="Description"
          placeholder="Description..."
          labelClass="my-color-light fw-semibold mb-1 txt-small"
          inputWrapperClass="d-flex flex-grow-1 shadowHover shadowFocus rounded my-bg-dark overflow-hidden p-2"
          txtAreaClass="flex-grow-1 txt-small  border-0 bg-transparent my-color-light fw-semibold overflow-auto"
          txtAreaValue={newNote.description}
          onChange={(e) => {
            setNewNote({ ...newNote, description: e.target.value });
          }}
        />
      </ModalBody>
      <ModalFooter className="my-bg-darker border-0">
        <Button
          className={`${
            !noteIsValid()
              ? "btn-purple my-color-lighter"
              : "bg-warning text-secondary"
          } border-0 fw-semibold  txt-small`}
          onClick={async () => {
            if (noteIsValid()) {
              await setNotesDB(authContext.userID, newNote, notes);
              addNote(newNote, notes, setNotes);
              setModalContext({
                ...modalContext,
                showModal: !modalContext.showModal,
              });
            } else {
              setModalContext({
                ...modalContext,
                showModal: !modalContext.showModal,
              });
            }
          }}
        >
          {noteIsValid() ? "Add task" : "Close"}
        </Button>
      </ModalFooter>
    </>
  );
}
