import { useEffect } from "react";
import getElementsBySelector from "../utils/task-list/get/getElementsBySelector";
import { useTasksContext } from "../context/tasksContext";

export default function useTaskDetailsAnimation() {
  const { currentTask } = useTasksContext();

  const taskDetailsAnimation = (animationDuration: number) => {
    useEffect(() => {
      getElementsBySelector('[data-animation="slide-animation"]').forEach(
        (element: HTMLDivElement) => {
          element.classList.remove("slideInRight");
          element.style.animationDuration = `${animationDuration}ms`;

          setTimeout(() => {
            element.classList.add("slideInRight");
            element.classList.remove("opacity_0");
          }, 1);

          animationDuration += 100;
        }
      );
    }, [currentTask]);
  };
  return { taskDetailsAnimation };
}
