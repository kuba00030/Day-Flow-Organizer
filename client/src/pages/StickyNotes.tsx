import Header from "../components/Header";
import AddButton from "../components/ui/buttons/AddButton";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useNotesContext } from "../context/noteContext";
import NoteSwappable from "../components/dashboard/notes/NoteSwappable";
import { useModalContext } from "../context/modalContext";
import AddNoteModalContent from "../components/modal/sticky-note/add-note/AddNoteModalContent";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config/firebaseConfig";
import { useAuthContext } from "../context/authContext";

export default function StickyNotes() {
  const { notes, setNotes } = useNotesContext();
  const { modalContext, setModalContext } = useModalContext();
  const { authContext } = useAuthContext();
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const onDragEnd = async (e) => {
    const { active, over } = e;
    if (active.id === over.id) {
      return;
    }

    const oldIndex = notes.findIndex((note) => note.id === active.id);
    const newIndex = notes.findIndex((note) => note.id === over.id);
    const reorderedNotes = arrayMove(notes, oldIndex, newIndex);

    setNotes([...reorderedNotes]);

    await setDoc(doc(db, "users", authContext.userID), {
      notes: reorderedNotes,
    });
  };
  return (
    <div className="d-flex flex-column flex-1 p-2 gap-4 fadeIn">
      <Header
        txt="Notes"
        keyProp="Calendar"
        className="txt-larger fw-semibold ms-2 mb-2 my-color-light fadeIn"
      />

      <AddButton
        txt="Add note"
        buttonClass="flex-row txt-small me-auto"
        buttonValClass="my-color-lighter"
        onClick={() => {
          setModalContext({
            showModal: !modalContext.showModal,
            modalContent: <AddNoteModalContent />,
          });
        }}
      />
      <div
        className="p-3 my-scrollbar sticky-notes-container rounded"
        style={{ flex: 1 }}
      >
        {notes.length ? (
          <div className="sticky-note-container gap-4">
            <DndContext
              onDragEnd={onDragEnd}
              collisionDetection={closestCenter}
              sensors={sensors}
            >
              <SortableContext items={notes} strategy={rectSortingStrategy}>
                {notes.map((note, index) => (
                  <NoteSwappable key={note.id} note={note} index={index} />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        ) : (
          <div className="my-color-light fw-semibold d-flex flex-1 h-100 align-items-center justify-content-center">
            Create your first note
          </div>
        )}
      </div>
    </div>
  );
}
