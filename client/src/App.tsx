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
import {
  MainTaskChangesType,
  SubtasksChangesType,
  TaskType,
} from "./types/TaskType";
import { ModalContext } from "./context/modalContext";
import { TaskListType, TaskListsType } from "./types/CategoryListType";
import getTaskLists from "./utils/api/get-data/getTaskLists";
import getTasksInDaysRange from "./utils/task-list/getTasksInDaysRange";
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
    listID: "",
    listActive: true,
    tasks: [],
  });
  const [isTaskOpened, setIsTaskOpened] = useState<boolean>(false);
  const [taskDetails, setTaskDetails] = useState<TaskType | undefined>(
    undefined
  );
  const [mainTaskChanges, setMainTaskChanges] = useState<
    MainTaskChangesType | undefined
  >(undefined);
  const [subTasksChanges, setSubtasksChanges] = useState<
    SubtasksChangesType | undefined
  >(undefined);
  useEffect(() => {}, [taskDetails]);
  useEffect(() => {
    // authetntication observer.
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLogged(true);
        setUserID(user.uid);
        window.localStorage.setItem("isLogged", "true");
        const fetchedTaskLists = await getTaskLists(user.uid, false);
        setTaskLists([...fetchedTaskLists]);
        setTaskList({
          listName: "Today",
          listColor: "",
          listID: "",
          listActive: true,
          tasks: [...getTasksInDaysRange(fetchedTaskLists, 1).tasks],
        });
        setTaskDetails(getTasksInDaysRange(fetchedTaskLists, 1).tasks[0]);
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
            mainTaskChanges: mainTaskChanges,
            setMainTaskChanges: setMainTaskChanges,
            subTasksChanges: subTasksChanges,
            setSubtasksChanges: setSubtasksChanges,
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
                  {isLogged === true ? (
                    <Route path={`dashboard`} element={<Dashboard />} />
                  ) : null}
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
