import { useEffect, useRef, useState } from "react";
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
import { CategoryListType } from "./types/CategoryListType";
function App() {
  const [isLogged, setIsLogged] = useState<boolean>(true);
  const [token, setToken] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isTaskOpened, setIsTaskOpened] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );
  const [tasksList, setTasksList] = useState<TaskType[]>([
    {
      taskID: "002AB42",
      title: "Title 1",
      description: "Description 1",
      list: "work",
      listColor: "yellow",
      date: "2023-11-09",
      subtasks: [
        {
          subtaskID: "001A2B41",
          title: "shopping",
          description: "buy some onion",
          subtaskStatus: false,
        },
        {
          subtaskID: "001A2B42",
          title: "shopping",
          description: "buy some bannanas",
          subtaskStatus: false,
        },
        {
          subtaskID: "001A2B43",
          title: "shopping",
          subtaskStatus: false,
        },
        ,
      ],
      taskStatus: false,
    },
  ]);
  const [taskDetails, setTaskDetails] = useState<TaskType>({
    taskID: "002AB42",
    title: "Title 1",
    description: "Description 1",
    list: "work",
    listColor: "red",
    date: "2023-11-09",
    subtasks: [
      {
        subtaskID: "001A2B41",
        title: "shopping",
        description: "buy some onion",
        subtaskStatus: false,
      },
      {
        subtaskID: "001A2B42",
        title: "shopping",
        description: "buy some onion",
        subtaskStatus: false,
      },
      {
        subtaskID: "001A2B41",
        title: "shopping",
        description: "buy some onion",
        subtaskStatus: false,
      },
      {
        subtaskID: "001A2B41",
        title: "shopping",
        description: "buy some onion",
        subtaskStatus: false,
      },
      {
        subtaskID: "001A2B41",
        title: "shopping",
        description: "buy some onion",
        subtaskStatus: false,
      },
      {
        subtaskID: "001A2B41",
        title: "shopping",
        description: "buy some onion",
        subtaskStatus: false,
      },
      {
        subtaskID: "001A2B41",
        title: "shopping",
        description: "buy some onion",
        subtaskStatus: false,
      },
    ],
    taskStatus: false,
  });
  const [mainTaskChanges, setMainTaskChanges] = useState<MainTaskChangesType>({
    taskID: "002AB42",
    title: "Title 1",
    description: "Description 1",
    list: "work",
    listColor: "red",
    date: "2023-11-09",
    taskStatus: false,
  });
  const [subTasksChanges, setSubtasksChanges] = useState<SubtasksChangesType>([
    {
      subtaskID: "001A2B41",
      title: "shopping",
      description: "buy some onion",
      subtaskStatus: false,
    },
    {
      subtaskID: "001A2B42",
      title: "shopping",
      description: "buy some onion",
      subtaskStatus: false,
    },
    {
      subtaskID: "001A2B41",
      title: "shopping",
      description: "buy some onion",
      subtaskStatus: false,
    },
    {
      subtaskID: "001A2B41",
      title: "shopping",
      description: "buy some onion",
      subtaskStatus: false,
    },
    {
      subtaskID: "001A2B41",
      title: "shopping",
      description: "buy some onion",
      subtaskStatus: false,
    },
    {
      subtaskID: "001A2B41",
      title: "shopping",
      description: "buy some onion",
      subtaskStatus: false,
    },
    {
      subtaskID: "001A2B41",
      title: "shopping",
      description: "buy some onion",
      subtaskStatus: false,
    },
  ]);
  const [categoryList, setCategoryList] = useState<CategoryListType>([
    { category: "personal", color: "#ff0000" },
    { category: "work", color: "#001bff" },
    { category: "projects", color: "#eeff00" },
  ]);
  useEffect(() => {
    // create 'isLogged' in local storage as a value of 'isLogged' state
  }, [isLogged]);
  useEffect(() => {
    // authetntication observer.
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
        window.localStorage.setItem("isLogged", "true");
      } else {
        setIsLogged(false);
        window.localStorage.clear();
      }
    });
    // console.log(isLogged);
  }, []);

  // router with protected 'dashboard' route
  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          token,
          userEmail,
          isLogged,
          setIsLogged,
          setToken,
          setUserEmail,
        }}
      >
        <TasksContext.Provider
          value={{
            tasksList: tasksList,
            setTasksList: setTasksList,
            taskDetails: taskDetails,
            setTaskDetails: setTaskDetails,
            categoryList: categoryList,
            setCategoryList: setCategoryList,
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
                  {/* {isLogged === true ? (
                <Route path="dashboard" element={<Dashboard />} />
              ) : null} */}
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
