import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config/firebaseConfig";
import PageNotFound from "./pages/PageNotFound";
import { AuthContext } from "./context/authContext";
import { TasksContext } from "./context/tasksContext";
import { TaskType } from "./types/TaskType";
import { ModalContext } from "./context/modalContext";
import { TaskListType, TaskListsType } from "./types/CategoryListType";
import getTaskLists from "./utils/api/get-data/getTaskLists";
import getTasksInDaysRange from "./utils/task-list/get/getTasksInDaysRange";
function App() {
  const [userID, setUserID] = useState("");
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );
  const [taskLists, setTaskLists] = useState<TaskListsType>([]);
  const [taskList, setTaskList] = useState<TaskListType>({
    listName: "Today",
    listColor: "",
    listActive: true,
    tasks: [],
  });
  const [isTaskOpened, setIsTaskOpened] = useState<boolean>(false);
  const [taskDetails, setTaskDetails] = useState<TaskType | undefined>(
    undefined
  );
  const [taskChanges, setTaskChanges] = useState<TaskType | undefined>(
    undefined
  );
  useEffect(() => {
    console.log(taskLists);
  }, [taskLists]);
  // onAuthObserver
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        window.localStorage.setItem("isLogged", "true");
        setIsLogged(true);
        setUserID(user.uid);
        const fetchedTaskLists = await getTaskLists(user.uid, false);
        setTaskLists([...fetchedTaskLists]);
        setTaskList({
          listName: "Today",
          listColor: "",
          listActive: true,
          tasks: [...getTasksInDaysRange(fetchedTaskLists, 0).tasks],
        });
        setTaskDetails(getTasksInDaysRange(fetchedTaskLists, 0).tasks[0]);
        setTaskChanges(getTasksInDaysRange(fetchedTaskLists, 0).tasks[0]);
      } else {
        setIsLogged(false);
        window.localStorage.clear();
      }
    });
  }, []);
  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          userID,
          isLogged,
          setIsLogged,
          setUserID,
        }}
      >
        <TasksContext.Provider
          value={{
            taskList: taskList,
            setTaskList: setTaskList,
            taskDetails: taskDetails,
            setTaskDetails: setTaskDetails,
            taskLists: taskLists,
            setTaskLists: setTaskLists,
            isTaskOpened: isTaskOpened,
            setIsTaskOpened: setIsTaskOpened,
            taskChanges: taskChanges,
            setTaskChanges: setTaskChanges,
          }}
        >
          <ModalContext.Provider
            value={{
              showModal: modalShow,
              setShowModal: setModalShow,
              modalContent: modalContent,
              setModalContent: setModalContent,
            }}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/">
                  <Route index element={<Login />} />
                  <Route path="signup" element={<Register />} />
                  <Route path="dashboard" element={<Dashboard />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
          </ModalContext.Provider>
        </TasksContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}
export default App;
