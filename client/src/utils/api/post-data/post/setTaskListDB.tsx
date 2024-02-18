import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config/firebaseConfig";
import "firebase/firestore";
import { newList } from "../../../../components/modal/add-list/AddNewListModalContent";

export default async function setTaskListDB(
  userID: string,
  givenList: newList
) {
  await setDoc(
    doc(db, "users", userID, "task-lists", givenList.listName),
    {
      list_name: givenList.listName,
      list_color: givenList.listColor,
    },
    { merge: true }
  );
}
