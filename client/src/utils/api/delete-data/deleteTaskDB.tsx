export default async function deleteTaskDB() {
  const taskListSnapshot = await getDocs(
    query(collection(db, "users", userID, "task-lists"))
  );
  if (taskListSnapshot.docs.length) {
    taskListSnapshot.forEach((doc) => console.log(doc.data()));
  }
}
