import { createContext } from "react";
type TAuthDefaultContext = {
  userID: string;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setUserID: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthContext = createContext<TAuthDefaultContext | null>(null);
