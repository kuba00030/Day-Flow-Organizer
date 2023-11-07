import { createContext } from "react";
type TAuthDefaultContext = {
  token: string;
  userEmail: string;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};
const authDefaultContext: TAuthDefaultContext = {
  token: "",
  userEmail: "",
  isLogged: false,
  setIsLogged: () => {},
  setUserEmail: () => {},
  setToken: () => {},
};

export const AuthContext = createContext(authDefaultContext);
