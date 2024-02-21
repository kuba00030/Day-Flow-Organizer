import { useEffect } from "react";
import { useAuthContext } from "../context/authContext";
import useNavigateTo from "./useNavigateTo";

export default function useRedirectOnAuth() {
  const { authContext } = useAuthContext();
  const { navigateTo } = useNavigateTo();

  const redirectOnAuth = (path: string) => {
    useEffect(() => {
      if (authContext.isLogged) {
        navigateTo(path);
      }
    }, [authContext]);
  };

  return {
    redirectOnAuth,
  };
}
