import { createContext } from "react";
type TAuthDefaultContext = {
  userEmail: string;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthContext = createContext<TAuthDefaultContext | null>(null);
