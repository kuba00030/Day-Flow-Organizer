import "./App.css";
import "./styles/custom-container.css";
import "./styles/dashboard/dashboard.css";
import "./styles/login-register-form.css";
import AuthContextProvider from "./context/authContext";
import TasksContextProvider from "./context/tasksContext";
import ModalContextProvider from "./context/modalContext";
import Router from "./routes/Router";
import NotesContextProvider from "./context/noteContext";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <TasksContextProvider>
          <ModalContextProvider>
            <NotesContextProvider>
              <Router />
            </NotesContextProvider>
          </ModalContextProvider>
        </TasksContextProvider>
      </AuthContextProvider>
    </div>
  );
}
export default App;
