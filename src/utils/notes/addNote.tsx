import { Note } from "../../context/noteContext";

export default function addNote(
  newNote: Note,
  notes: Note[],
  setNotes: (notes: Note[]) => void
) {
  const updatedNoets = [...notes];

  updatedNoets.push(newNote);

  setNotes(updatedNoets);
}
