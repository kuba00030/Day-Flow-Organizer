import { useEffect } from "react";

export default function onLoggedRedirectHook(
  loggedState: boolean,
  func: (path: string) => void
) {
  useEffect(() => {
    if (loggedState === true) {
      func("/dashboard");
    } else {
      func("/");
    }
  }, [loggedState]);
}
