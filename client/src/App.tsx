import { useEffect, useRef, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase-config/firebaseConfig";
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
import {
  collection,
  doc,
  getDoc,
  getDocFromCache,
  getDocs,
  setDoc,
} from "firebase/firestore";
function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState("");
  const [isTaskOpened, setIsTaskOpened] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );
  const [tasksList, setTasksList] = useState<TaskType[]>([]);
  const [taskDetails, setTaskDetails] = useState<TaskType | undefined>(
    undefined
  );
  const [mainTaskChanges, setMainTaskChanges] = useState<
    MainTaskChangesType | undefined
  >(undefined);
  const [subTasksChanges, setSubtasksChanges] = useState<
    SubtasksChangesType | undefined
  >(undefined);
  const [categoryList, setCategoryList] = useState<
    CategoryListType | undefined
  >([]);
  useEffect(() => {
    // authetntication observer.
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLogged(true);
        window.localStorage.setItem("isLogged", "true");
        try {
          // get data from db
          // const docRef = doc(db, `users/${user.uid}.categoryList.personal`);
        } catch (error) {
          console.log(error);
        }
        console.log(user);
      } else {
        setIsLogged(false);
        window.localStorage.clear();
      }
    });
  }, []);

  // router with protected 'dashboard' route
  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          userEmail,
          isLogged,
          setIsLogged,
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
                  {isLogged === true ? (
                    <Route path="dashboard" element={<Dashboard />} />
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
