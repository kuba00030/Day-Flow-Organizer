import { MdAdd as AddIcon } from "react-icons/md";
import IconButton from "./IconButton";

type AddButton = {
  function: () => void;
  buttonTxt?: string;
};

export default function AddButton(props: AddButton) {
  return (
    <IconButton
      size="sm"
      txt={props.buttonTxt}
      buttonValClass="my-color-lighter txt-small"
      buttonClass="flex-row d-flex flex-row fw-semibold align-items-center rounded btn-purple me-auto"
      icon={<AddIcon className="regular-icon my-color-lighter" />}
      function={() => {
        props.function();
      }}
    />
  );
}
