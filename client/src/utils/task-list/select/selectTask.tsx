import { Task } from "../../../context/tasksContext";

export default async function selectTask(
  durationMS: number,
  durationIncr: number,
  className: string,
  setCurrentTask: (task: Task) => void,
  currentTask: Task,
  setEditedTask: (task: Task) => void
) {
  let animationDuration = durationMS;

  // all element from TaskDetails component having certain class
  const taskElements = document.querySelectorAll(className);

  if (taskElements.length) {
    // before task update set taskElements opacity = 0 (so its not possible to see task being updated)
    taskElements.forEach((element: HTMLDivElement) => {
      element.style.transition = "0ms";
      element.classList.add("opacity_0");
    });

    // wait for task update
    await new Promise<void>((resolve) => {
      setCurrentTask(currentTask);
      setEditedTask(currentTask);
      setTimeout(resolve, 1);
    });

    const newTaskElements = document.querySelectorAll(className);

    newTaskElements.forEach((element: HTMLDivElement) => {
      element.classList.remove("slideInRight");
      element.style.animationDuration = `${animationDuration}ms`;

      setTimeout(() => {
        element.classList.add("slideInRight");
        element.classList.remove("opacity_0");
      }, 1);

      animationDuration += durationIncr;
    });

    newTaskElements.forEach((element: HTMLDivElement) => {
      element.style.transition = `${300}ms`;
    });
  } else {
    setCurrentTask(currentTask);

    setEditedTask(currentTask);
  }
  animationDuration = durationMS;
}
