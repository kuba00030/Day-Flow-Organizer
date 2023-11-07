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
function App() {
  // when user visit page without previous signing in, set 'isLogged' to false.
  const [isLogged, setIsLogged] = useState<boolean>(true);
  // false || window.localStorage.getItem("isLogged") === "true"
  const [token, setToken] = useState("");
  const [userEmail, setUserEmail] = useState("");
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
    console.log(isLogged);
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
      </AuthContext.Provider>
    </div>
  );
}
export default App;
