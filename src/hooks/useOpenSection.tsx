import { useEffect } from "react";

export default function useOpenSection() {
  const openSection = (
    sectionRef: any,
    sectionOpenerRef: any,
    isOpened: boolean,
    setIsOpened: (isOpened: boolean) => void,
    slideInFrom: "right" | "left",
    endTriggerWidth: number
  ) => {
    let windowWidth: number = window.innerWidth;

    window.addEventListener("resize", () => {
      windowWidth = window.innerWidth;
      if (windowWidth > endTriggerWidth && sectionRef.current !== null) {
        sectionRef.current.style[slideInFrom === "left" ? "left" : "right"] =
          "0px";
        setIsOpened(false);
      }
      if (windowWidth <= endTriggerWidth && sectionRef.current !== null) {
        const sectionOpenerWidth: number = sectionOpenerRef.current.offsetWidth;
        const width = sectionRef.current.offsetWidth;
        if (isOpened) {
          sectionRef.current.style[slideInFrom === "left" ? "left" : "right"] =
            "0px";
        } else {
          sectionRef.current.style[
            slideInFrom === "left" ? "left" : "right"
          ] = `-${width - sectionOpenerWidth}px`;
        }
      }
    });

    useEffect(() => {
      const width = sectionRef.current.offsetWidth;
      const sectionOpenerWidth: number = sectionOpenerRef.current.offsetWidth;
      if (windowWidth <= endTriggerWidth && sectionRef.current !== null) {
        if (isOpened) {
          sectionRef.current.style[slideInFrom === "left" ? "left" : "right"] =
            "0px";
        } else {
          sectionRef.current.style[
            slideInFrom === "left" ? "left" : "right"
          ] = `-${width - sectionOpenerWidth}px`;
        }
      }
    }, [isOpened]);
  };
  return { openSection };
}
