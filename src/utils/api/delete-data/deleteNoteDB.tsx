import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { Note } from "../../../context/noteContext";
import { db } from "../../../firebase-config/firebaseConfig";

export default async function deleteNoteDB(userID: string, note: Note) {
  const noteRef = doc(db, "users", userID, "sticky-note", `${note.id}`);

  await setDoc(noteRef, {});
  await deleteDoc(noteRef);
}
