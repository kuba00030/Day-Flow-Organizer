import { useSortable } from "@dnd-kit/sortable";
import { useModalContext } from "../../../context/modalContext";
import EditNoteModalContent from "../../modal/sticky-note/edit-note/EditNoteModalContent";
import { CSS } from "@dnd-kit/utilities";
import { Note } from "../../../context/noteContext";
import breakLines from "../../../utils/notes/breakLines";
import { GrDrag as DragIcon } from "react-icons/gr";

type SwappableElement = {
  note: Note;
  index: number;
};

export default function (props: SwappableElement) {
  const { modalContext, setModalContext } = useModalContext();
  const {
    attributes,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.note.id });
  const styles = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={styles}
      onClick={() => {
        setModalContext({
          modalContent: (
            <EditNoteModalContent note={props.note} index={props.index} />
          ),
          showModal: !modalContext.showModal,
        });
      }}
    >
      <div
        className={`my-bg-dark d-flex flex-column shadowHover sticky-note rounded p-4 gap-4 ${
          props.note.noteColor !== "" ? "" : "sticky-note-border-color"
        }`}
        style={
          props.note.noteColor !== ""
            ? {
                border: `solid 2px ${props.note.noteColor}`,
              }
            : {}
        }
      >
        <div className="d-flex flex-row justify-content-between">
          <div className="txt-large my-color-lighter text-truncate">
            {props.note.title}
          </div>
          <div
            className="draggable-handle my-color-lighter d-flex align-items-center"
            {...listeners}
            ref={setActivatorNodeRef}
          >
            <DragIcon className="regular-icon my-color-lighter" />
          </div>
        </div>
        <div className="my-color-light" style={{ wordBreak: "break-word" }}>
          {breakLines(props.note.description)}
        </div>
      </div>
    </div>
  );
}
