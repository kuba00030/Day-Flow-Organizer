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
function App() {
  const [isLogged, setIsLogged] = useState<boolean>(true);
  const [token, setToken] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isTaskOpened, setIsTaskOpened] = useState<boolean>(false);
  const [tasksList, setTasksList] = useState<TaskType[]>([
    {
      title: "Title 1",
      description: "Description 1",
      list: "List 1",
      date: "2023-11-09",
      subtasks: [
        {
          title: "shopping",
          description: "buy some onion",
          isDone: false,
        },
      ],
      taskStatus: false,
    },
  ]);
  const [taskDetails, setTaskDetails] = useState<TaskType>({
    title: "Title 1",
    description: "Description 1",
    list: "List 1",
    date: "2023-11-09",
    subtasks: [
      {
        title: "shopping",
        description: "buy some onion",
        isDone: false,
      },
    ],
    taskStatus: false,
  });
  const [changedTask, setChangedTask] = useState<TaskType>({
    title: "Title 1",
    description: "Description 1",
    list: "List 1",
    date: "2023-11-09",
    subtasks: [
      {
        title: "shopping",
        description: "buy some onion",
        isDone: false,
      },
    ],
    taskStatus: false,
  });
  const [list, setLists] = useState();
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
            isTaskOpened: isTaskOpened,
            setIsTaskOpened: setIsTaskOpened,
            changedTask: changedTask,
            setChangedTask: setChangedTask,
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
        </TasksContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}
export default App;
