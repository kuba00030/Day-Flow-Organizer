import { Note } from "../../context/noteContext";

export default function deleteNote(
  notes: Note[],
  setNotes: (notes: Note[]) => void,
  noteIndex: number
) {
  const updatedNotes = [...notes];

  updatedNotes.splice(noteIndex, 1);

  setNotes(updatedNotes);
}
