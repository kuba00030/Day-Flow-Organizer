import { ReactNode } from "react";

export default function (text: string): ReactNode {
  const lines = text.split("\n");

  return lines.map((line): ReactNode => {
    return (
      <>
        {line}
        <br />
      </>
    );
  });
}
