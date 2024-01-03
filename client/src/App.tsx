import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import AuthContextProvider from "./context/authContext";
import TasksContextProvider from "./context/tasksContext";
import ModalContextProvider from "./context/modalContext";
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <TasksContextProvider>
          <ModalContextProvider>
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
          </ModalContextProvider>
        </TasksContextProvider>
      </AuthContextProvider>
    </div>
  );
}
export default App;
