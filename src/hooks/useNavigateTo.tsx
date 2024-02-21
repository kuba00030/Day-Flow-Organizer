import { useNavigate } from "react-router-dom";

export default function useNavigateTo() {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };
  return { navigateTo };
}
