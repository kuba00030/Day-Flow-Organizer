import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase-config/firebaseConfig";

export type ContextProviderProps = {
  children: React.ReactNode;
};
type Auth = {
  userID: string;
  isLogged: boolean;
};

type AuthContext = {
  authContext: Auth;
};

export const AuthContext = createContext<AuthContext | null>(null);

export default function AuthContextProvider({
  children,
}: ContextProviderProps) {
  const [authContext, setAuthContext] = useState<Auth>({
    userID: window.localStorage.getItem("userID")
      ? window.localStorage.getItem("userID")
      : "",
    isLogged: false || window.localStorage.getItem("isLogged") === "true",
  });

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthContext({
          userID: user.uid,
          isLogged: true,
        });
        window.localStorage.setItem("isLogged", "true");
        window.localStorage.setItem("userID", user.uid);
      } else {
        window.localStorage.clear();
        setAuthContext({ userID: "", isLogged: false });
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext should be used within a AuthContextProvider"
    );
  }
  return context;
}
