import { useEffect } from "react";

export default function useSlideInOnClick(
  ref: any,
  isOpened: boolean,
  setIsOpened: (isOpened: boolean) => void,
  slideInFrom: "right" | "left",
  originPositionOffset: number,
  endTriggerWidth: number
) {
  let width: number = window.innerWidth;

  window.addEventListener("resize", () => {
    width = window.innerWidth;
    if (width >= endTriggerWidth && ref.current !== null) {
      if (slideInFrom === "left") {
        if (isOpened) {
          ref.current.style.left = "0px";
        } else {
          ref.current.style.left = `0px`;
          setIsOpened(false);
        }
      } else {
        if (isOpened) {
          ref.current.style.right = "0px";
        } else {
          ref.current.style.right = `0px`;
          setIsOpened(false);
        }
      }
    }
    if (width < endTriggerWidth && ref.current !== null) {
      if (slideInFrom === "left") {
        if (isOpened) {
          ref.current.style.left = "0px";
        } else {
          const width = ref.current.offsetWidth;
          ref.current.style.left = `-${width - originPositionOffset}px`;
          setIsOpened(false);
        }
      } else {
        if (isOpened) {
          ref.current.style.right = "0px";
        } else {
          const width = ref.current.offsetWidth;
          ref.current.style.right = `-${width - originPositionOffset}px`;
          setIsOpened(false);
        }
      }
    }
  });

  useEffect(() => {
    if (width < endTriggerWidth) {
      if (slideInFrom === "left") {
        if (isOpened) {
          ref.current.style.left = "0px";
        } else {
          const width = ref.current.offsetWidth;
          ref.current.style.left = `-${width - originPositionOffset}px`;
        }
      } else {
        if (isOpened) {
          ref.current.style.right = "0px";
        } else {
          const width = ref.current.offsetWidth;
          ref.current.style.right = `-${width - originPositionOffset}px`;
        }
      }
    }
  }, [isOpened]);
}
