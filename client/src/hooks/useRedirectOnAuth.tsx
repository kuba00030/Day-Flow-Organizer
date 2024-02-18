import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

export default function useRedirectOnAuth() {
  const { authContext } = useAuthContext();
  const navigate = useNavigate();

  const redirectOnAuth = (path: string, isLogged: boolean) => {
    useEffect(() => {
      if (authContext.isLogged === isLogged) {
        navigate(path);
      }
    }, [authContext]);
  };

  return {
    redirectOnAuth,
  };
}
