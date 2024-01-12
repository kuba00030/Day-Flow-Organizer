import "./App.css";

import AuthContextProvider from "./context/authContext";
import TasksContextProvider from "./context/tasksContext";
import ModalContextProvider from "./context/modalContext";
import Router from "./router/Router";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <TasksContextProvider>
          <ModalContextProvider>
            <Router />
          </ModalContextProvider>
        </TasksContextProvider>
      </AuthContextProvider>
    </div>
  );
}
export default App;
