import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import TasksPanel from "../pages/TasksPanel";
import Calendar from "../pages/Calendar";
import StickyNotes from "../pages/StickyNotes";
import PageNotFound from "../pages/PageNotFound";
import { useAuthContext } from "../context/authContext";

export default function Router() {
  const { authContext } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="signup" element={<Register />} />

          {authContext.isLogged && (
            <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<TasksPanel />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="sticky_notes" element={<StickyNotes />} />
            </Route>
          )}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
