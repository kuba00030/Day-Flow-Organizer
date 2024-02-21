import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config/firebaseConfig";
import { Note } from "../../../../context/noteContext";

export default async function setNoteDB(
  userID: string,
  givenNote: Note,
  index: number,
  existingNotes: Note[]
) {
  let editedNotes = [...existingNotes];

  editedNotes[index] = givenNote;

  await setDoc(
    doc(db, "users", userID),
    {
      notesDB: editedNotes,
    },
    { merge: true }
  );
}
