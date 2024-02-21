import { useEffect, useState } from "react";
import {
  Button,
  Container,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import InputLabeled from "../../../ui/inputs/InputLabeled";
import { useModalContext } from "../../../../context/modalContext";
import { compareTaskChanges } from "../../../../utils/task-details/CompareTaskChanges";
import { Note, useNotesContext } from "../../../../context/noteContext";
import deleteNote from "../../../../utils/notes/deleteNote";
import { useAuthContext } from "../../../../context/authContext";
import editNote from "../../../../utils/notes/editNote";
import TxtAreaLabeled from "../../../ui/inputs/TxtAreaLabeled";
import setNoteDB from "../../../../utils/api/post-data/post/setNote.DB";

type EditNoteModalContent = {
  note: Note;
  index: number;
};

export default function EditNoteModalContent(props: EditNoteModalContent) {
  const { modalContext, setModalContext } = useModalContext();
  const { authContext } = useAuthContext();
  const { notes, setNotes } = useNotesContext();
  const [editedNote, setEditedNote] = useState<Note>(props.note);
  const [noteHasChanged, setNoteHasChanged] = useState<boolean>(false);

  const compareNotes = compareTaskChanges;
  useEffect(() => {
    compareNotes(editedNote, props.note, setNoteHasChanged);
  }, [editedNote]);

  return (
    <>
      <ModalHeader className="my-bg-darker my-color-light border-0">
        <ModalTitle
          id="contained-modal-title-vcenter"
          className="my-color-light border-0"
        >
          Edit note
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="d-flex flex-column gap-4 border-0 my-bg-darker">
        <InputLabeled
          containerStyle="fw-semibold d-flex flex-column justify-content-center gap-2"
          labelValue="Title"
          labelStyle="my-color-light fw-semibold mb-1 txt-small"
          inputType="text"
          inputValue={editedNote.title}
          inputStyle="shadowHover shadowFocus w-100 border-0 p-2 my-bg-dark my-color-light fw-semibold rounded"
          onChange={(e) => {
            setEditedNote({ ...editedNote, title: e.target.value });
          }}
        />
        <InputLabeled
          containerStyle="fw-semibold d-flex flex-column justify-content-center gap-2"
          labelValue="Color"
          labelStyle="my-color-light fw-semibold mb-1 txt-small"
          inputType="color"
          inputValue={editedNote.noteColor}
          inputStyle="shadowHover shadowFocus border-0 p-2 my-bg-dark my-color-light fw-semibold rounded"
          onChange={(e) => {
            setEditedNote({ ...editedNote, noteColor: e.target.value });
          }}
        />
        <TxtAreaLabeled
          containerClass="fw-semibold d-flex flex-column justify-content-center gap-2"
          labelValue="Description"
          labelClass="my-color-light fw-semibold mb-1 txt-small"
          txtAreaClass="modal-description w-100 txt-small shadowHover shadowFocus my-bg-dark rounded border-0 my-color-light p-2 fw-semibold"
          txtAreaValue={editedNote.description}
          onChange={(e) => {
            setEditedNote({ ...editedNote, description: e.target.value });
          }}
        />
      </ModalBody>
      <ModalFooter className="my-bg-darker border-0">
        <Container className="d-flex flex-row gap-4">
          <Button
            className={
              "fw-semibold btn-purple-outline my-color-lighter txt-small"
            }
            style={{ flex: 1 }}
            onClick={() => {
              setModalContext({
                ...modalContext,
                showModal: !modalContext.showModal,
              });
            }}
          >
            Close
          </Button>
          <Button
            className={`${
              !noteHasChanged
                ? "btn-purple my-color-lighter"
                : "bg-warning text-secondary"
            } border-0 fw-semibold txt-small`}
            style={{ flex: 1 }}
            onClick={async () => {
              if (noteHasChanged) {
                setModalContext({
                  ...modalContext,
                  showModal: !modalContext.showModal,
                });
                setNoteDB(authContext.userID, editedNote, props.index, notes);
                editNote(editedNote, props.index, notes, setNotes);
              } else {
                deleteNote(notes, setNotes, props.index);
                setModalContext({
                  ...modalContext,
                  showModal: !modalContext.showModal,
                });
              }
            }}
          >
            {noteHasChanged ? "Save Changes" : "Delete"}
          </Button>
        </Container>
      </ModalFooter>
    </>
  );
}
