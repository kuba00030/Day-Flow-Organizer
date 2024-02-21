import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config/firebaseConfig";
import { Note } from "../../../../context/noteContext";

export default async function setNotesDB(
  userID: string,
  newNote: Note,
  existingNotes: Note[]
) {
  await setDoc(
    doc(db, "users", userID),
    {
      notesDB: [newNote, ...existingNotes],
    },
    { merge: true }
  );
}
