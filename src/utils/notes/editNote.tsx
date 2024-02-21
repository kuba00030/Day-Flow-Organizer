import { Note } from "../../context/noteContext";

export default function editNote(
  editedNote: Note,
  index: number,
  notes: Note[],
  setNotes: (notes: Note[]) => void
) {
  let editedNotes = [...notes];

  editedNotes[index] = editedNote;

  setNotes(editedNotes);
}
