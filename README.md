# Content

- [Day Flow Organizer](#day-flow-organizer)
- [Project Description](#project-description)
- [Usage](#usege)
  - [Go to](#go-to)
  - [Sign in and sign up](#sign-in-and-sign-up)
  - [Adding new list](#adding-new-list)
  - [Edit list](#edit-list)
  - [Adding tasks](#adding-tasks)
  - [View your task](#view-your-task)
  - [Sticky notes](#sticky-notes)
  - [Calendar](#calendar)
- [Code examples](#code-examples)
  - [UI components](#ui-components)
    - [IconButton](#iconButton)
    - [AddButton](#addButton)
    - [ListSelect](#listSelect)
    - [InputDate](#inputDate)
    - [InputLabeled](#inputLabeled)
    - [TxtAreaLabeled](#txtAreaLabeled)
  - [Custom hooks](#custom-hooks)
    - [useNavigateTo](#useNavigateTo)
    - [useCompareTasks](#useCompareTasks)
    - [useRedirectOnAuth](#useRedirectOnAuth)
    - [useTaskDetailsAnimation](#useTaskDetailsAnimation)
    - [useOpenSection](#useOpenSection)

# Day Flow Organizer

The Day Flow Organizer app is a task management tool that allows the user to schedule, view and edit their tasks.

# Project Description

The application allows you to add sticky notes, tasks, subtasks with their due dates, completion status and edit them. Tasks are organized by belonging to previously created lists. The way they are displayed is subject to user control (they are displayed in the form of a list with the option of sorting by the date the task was added or based on the status [done, ongoing], or in the form of a calendar). Each task is editable, as is the subtask and the list to which it belongs. Some elements, such as subtasks, tasks displayed in the calendar and sticky notes, are movable.

# Technologies

- React with TypeScript
- HTML
- CSS
- dnd kit
- Framer Motion
- Bootstrap 5
- Fullcalendar
- React-icons
- Firebase

# Usage

## Go to

- https://kuba00030.github.io/Day-Flow-Organizer/

## Sign in and sign up

- Sign up using your google account by clicking "Sign in with Google" button.
- If you want, create new account using your email and password by navigating to sign up form by clicking "Sign up here" link below "Sign in with Google" button.

![Screenshot (522)](https://github.com/kuba00030/Day-Flow-Organizer/assets/83354878/e74113f3-bb38-4b39-a6e2-2143711b2b78)

- After signing in / up you will be redirected to the dahsboard.

## Adding new list

- Create new list by clicking the "Add new list" button (this is required otherwise you will not be able to add tasks).
  ![Screenshot (524)](https://github.com/kuba00030/Day-Flow-Organizer/assets/83354878/58069df8-b087-4274-ad9a-0c7a7b026dad)
- A window will appear where you can configure a new list.
  ![Screenshot (525)](https://github.com/kuba00030/Day-Flow-Organizer/assets/83354878/68b7f6dc-4d36-49a2-950c-891bf877dbd1)
- Enter the data and confirm it by using the button that will automatically change its style if the form is validated.
  ![Screenshot (526)](https://github.com/kuba00030/Day-Flow-Organizer/assets/83354878/3fd429b6-7ea2-44b1-bd87-9cb848b83047)
- The newly created list will appear in the "Lists" tab located on the left side of the screen above the "Add new list" button.

## Edit list

- To edit a list, use the "Edit lists" button located next to the "Add new list" button on the left side of the screen.

## Adding tasks

- Navigate to the list of your choice. Add a new task using the "Add task" button located at the very top of the displayed list.
  ![Screenshot (527)](https://github.com/kuba00030/Day-Flow-Organizer/assets/83354878/be57bad8-dc5c-4192-be5d-1833f90c75ec)
- A window will appear in which you can configure your task.
  ![Screenshot (529)](https://github.com/kuba00030/Day-Flow-Organizer/assets/83354878/3da804a9-b10f-45f1-abe4-844715ee7575)
- After completing the task form, confirm it or add tasks using the "Add subtask" button.
- If you want to cancel a subtask or remove its description, slide out the options panel for a given subtask located in its right corner.
  ![Screenshot (533)](https://github.com/kuba00030/Day-Flow-Organizer/assets/83354878/99a726fb-cb12-42db-abc3-450873309e3b)
  ![Screenshot (531)](https://github.com/kuba00030/Day-Flow-Organizer/assets/83354878/c12cc5f0-ebc1-4a6c-a17b-e1ba863e7079)
- To change the order of subtasks, grab it and move it to the desired position.
- Don't worry if you try to add a subtask without a title and description, it will be automatically deleted.

## View your task

- The newly created task will appear in a given list, which can be sorted by specific criteria: date (oldest, latest) and task status (done, ongoing).
- From this level you can mark a specific task as "Done" using the small button located on the left side of the displayed task.
  ![Screenshot (535)](https://github.com/kuba00030/Day-Flow-Organizer/assets/83354878/5e3778dc-821f-4953-986c-def4a975f15f)
- Information about the task selected from the list is displayed on the right side of the screen. All fields except the displayed subtasks (if the task has them) are editable.
- To edit a subtask's data, click on it and a window will appear allowing you to edit it. It is only possible to edit the order of subtasks by grabbing and moving it to the desired position or marking the subtask as "done" using the small button located on the right side of the displayed subtask.
- To delete the selected task, use the "Delete task" button located at the very bottom right of the screen.

## Sticky notes

- Navigate to sticky notes and add a new note using the "Add note" button located at the very top of the sticky notes section.
  ![Screenshot (536)](https://github.com/kuba00030/Day-Flow-Organizer/assets/83354878/18e783f2-482a-4466-9024-6889c1907f83)
- Enter the data and confirm it by using the button that will automatically change its style if the form is validated.
  ![Screenshot (537)](https://github.com/kuba00030/Day-Flow-Organizer/assets/83354878/903977c1-9808-4d4b-acfd-2328fed62291)
- To edit or delete a specific note, click on it to view its information and then edit or delete it. It is also possible to edit the order of displayed notes. To do this, grab the 'drag indicator' located on the right side next to the note title and move it to the desired position.

## Calendar

- Navigate to calendar. Tasks can be sorted by specific criteria: task status (done, ongoing).
- To change the way tasks are displayed, select the configuration: day, week, month by using the buttons located in the upper right corner of the screen.
- To add a new task, use the button located at the top left of the calendar.
  ![Screenshot (538)](https://github.com/kuba00030/Day-Flow-Organizer/assets/83354878/0c5b8fce-c08c-4c71-8d9c-5806ccaae39f)
- To edit task data, click it once to open the editing window.
- If you only want to change the start or end date, grab the top or bottom edge of the task. To change the day for which a task is scheduled, you can also grab and drag the selected task to another day in the calendar.

# Code examples

## UI components

### IconButton

```typescript
type IconButton = {
  icon: React.ReactNode;
  txt?: string;
  size?: "sm" | "lg";
  buttonClass: string;
  buttonValClass?: string;
  function: () => void;
};

export default function IconButton(props: IconButton) {
  return (
    <Button
      size={props.size}
      className={props.buttonClass}
      onClick={props.function}
    >
      {props.icon}
      {props.txt ? (
        <span className={props.buttonValClass}>{props.txt}</span>
      ) : (
        <></>
      )}
    </Button>
  );
}
```

#### PROPS:

- icon (type: React.ReactNode): Icon displayed inside the button
- txt (type: string, optional): Text displayed next to the icon inside the button
- size (type: "sm" | "lg", optional): Button size (small - "sm" or large - "lg")
- buttonClass (type: string): CSS class for button styling
- buttonValClass (type: string, optional): CSS class for styling button text
- function (type: () => void): Function that will be called when the button is clicked

#### USAGE:

```typescript
<IconButton
  icon={<FontAwesomeIcon icon={faCoffee} className="example-css-class"/>}
  txt="example button text"
  size="sm"
  buttonClass="example-css-class"
  buttonValClass="example-css-class"
  function={() => exampleFunction();}
/>
```

### AddButton

#### Explanation

- The component is a previously prepared button, used in many places in the same way, but with a different function activated during the action.

```typescript
type AddButton = {
  function: () => void;
  buttonTxt: string;
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
```

#### PROPS:

- function: () => void: Function that will be called when the button is clicked.
- buttonTxt: Text value displayed inside the button.

#### USAGE:

```typescript
<AddButton
  function={() => {
    exampleFunction();
  }}
/>
```

### ListSelect

```typescript
type ListSelect = {
  containerStyle: string;
  options: string[];
  optionStyle: string;
  label?: string;
  labelStyle?: string;
  onChange: (e?: any) => void;
  selectStyle: string;
  selectedList: string;
  animationData?: string;
};

export default function ListSelect(props: ListSelect) {
  return (
    <div className={props.containerStyle}>
      <div>
        <span className={props.labelStyle}>{props.label}</span>
      </div>
      <select
        className={props.selectStyle}
        value={props.selectedList}
        onChange={props.onChange}
        data-animation={props.animationData}
      >
        {props.options.map((option): React.ReactNode => {
          return (
            <option
              className={props.optionStyle}
              key={`option selected: ${option}`}
            >
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}
```

#### PROPS:

- containerStyle (type: string): CSS class for styling the component container
- options (type: string[]): An array of options available for selection in a list
- optionStyle (type: string): CSS class for styling individual options in a list
- label (type: string, optional): Label text that can be displayed above the selection list
- labelStyle (type: string, optional): CSS class for label text styling
- onChange (type: (e?: any) => void): Function that will be called when the selected option is changed
- selectStyle (type: string): CSS class for styling the "select" element itself
- animationData (type: string, optional): Used to retrieve elements with the same attribute to animate them
- selectedList (type: string): Currently selected option from the list

#### USAGE:

```typescript
const [sortOption, setSortOption] = useState<string>("Option 1");

<ListSelect
  containerStyle="example-css-class"
  options={["Option 1", "Option 2", "Option 3"]}
  optionStyle="example-css-class"
  label="Example text"
  labelStyle="example-css-class"
  onChange={(e) => setSortOption(e.target.value)}
  selectStyle="my-custom-select"
  selectedList={sortOption}
  animationData="example-data"
/>;
```

### InputDate

```typescript
type InputDate = {
  containerSyle: string;
  labelValue?: string;
  labelStyle?: string;
  inputWrapperStyle?: string;
  inputStyle: string;
  inputType: string;
  inputValue: string;
  onChange: (e?: any) => void;
  animationData?: string;
};

export default function InputDate(props: InputDate) {
  return (
    <Form.Group className={props.containerSyle}>
      {props.labelValue ? (
        <Form.Label className={props.labelStyle}>{props.labelValue}</Form.Label>
      ) : (
        <></>
      )}
      <div
        className={props.inputWrapperStyle}
        data-animation={props.animationData}
      >
        <input
          className={props.inputStyle}
          type={props.inputType}
          value={props.inputValue}
          min={getCurrentDate()}
          onChange={props.onChange}
          style={{ outline: "none" }}
        />
      </div>
    </Form.Group>
  );
}
```

#### PROPS:

- containerSyle (type: string): CSS class for styling the component container.
- labelValue (type: string, optional): Label text.
- labelStyle (type: string, optional): CSS class for label text styling.
- inputWrapperStyle (type: string, optional): CSS class for styling an additional container around the date input field.
- inputStyle (type: string): CSS class for styling the date input field itself.
- inputType (type: string): Type of the date input field (e.g. 'date', 'datetime-local'.).
- inputValue (type: string): Current value of the entered date.
- onChange (type: (e?: any) => void): Function that will be called when the value of the entered date changes.
- animationData (type: string, optional): Used to retrieve elements with the same attribute to animate them.

#### USAGE:

```typescript
const [date, setDate] = useSate<string>("");

<InputDate
  containerSyle="example-css-class"
  labelValue="Example text"
  labelStyle="example-css-class"
  inputStyle="example-css-class"
  inputType="date"
  inputValue="date"
  onChange={(e) => setDate(e.target.value)}
  animationData="example-data"
/>;
```

### InputLabeled

```typescript
type InputLabeled = {
  containerStyle?: string;
  inputType: string;
  inputWrapperStyle?: string;
  inputStyle: string;
  inputValue: string | number;
  inputPlaceholder?: string;
  onChange: (e?: any) => void;
  labelValue?: string;
  labelStyle?: string;
  animationData?: string;
  inputKey?: string;
  pattern?: string;
};

export default function InputLabeled(props: InputLabeled) {
  return (
    <Form.Group className={props.containerStyle}>
      {props.labelValue ? (
        <Form.Label className={props.labelStyle}>{props.labelValue}</Form.Label>
      ) : null}
      <div
        data-animation={props.animationData}
        className={props.inputWrapperStyle}
      >
        <input
          pattern={props.pattern}
          key={props.inputKey}
          className={props.inputStyle}
          type={props.inputType}
          placeholder={props.inputPlaceholder}
          value={props.inputValue}
          onChange={props.onChange}
          style={{ outline: "none" }}
        />
      </div>
    </Form.Group>
  );
}
```

#### PROPS:

- containerStyle (type: string, optional): CSS class for styling the component container.
- inputType (type: string): The type of the input field (e.g. 'text', 'number', 'email', etc.).
- inputWrapperStyle (type: string, optional): CSS class for styling an additional container around the input field.
- inputStyle (type: string): CSS class for styling the input field itself.
- inputValue (type: string | number): Current value of the entered field.
- inputPlaceholder (type: string, optional): Placeholder text displayed inside the field when it is empty.
- onChange (type: (e?: any) => void): Function that will be called when the value of the input field changes.
- labelValue (type: string, optional): Label text.
- labelStyle (type: string, optional): CSS class for label text styling.
- animationData (type: string, optional): Used to retrieve elements with the same attribute to animate them.
- inputKey (type: string, optional): A unique identification key for an input field, useful for dynamic rendering.
- pattern (type: string, optional): A pattern that can be used to impose restrictions on input.

##### USAGE:

```typescript
const [inputValue, setInputValue] = useState<string>("");

<InputLabeled
  containerStyle="example-css-class"
  labelValue="Example text"
  labelStyle="example-css-class"
  inputType="text"
  inputValue="inputValue"
  onChange={(e) => setInputValue(e.target.value)}
  animationData="example-data"
/>;
```

### TxtAreaLabeled

```typescript
type TxtAreaLabeled = {
  containerClass?: string;
  inputWrapperClass?: string;
  labelValue: string;
  labelClass: string;
  txtAreaValue: string;
  txtAreaClass: string;
  animationData?: string;
  placeholder?: string;
  onChange: (e?: any) => void;
};

export default function TxtAreaLabeled(props: TxtAreaLabeled) {
  return (
    <Form.Group className={props.containerClass}>
      <Form.Label className={props.labelClass}>{props.labelValue}</Form.Label>
      <div
        data-animation={props.animationData}
        className={props.inputWrapperClass}
      >
        <textarea
          placeholder={props.placeholder}
          value={props.txtAreaValue}
          onChange={props.onChange}
          className={props.txtAreaClass}
          style={{ resize: "none" }}
        />
      </div>
    </Form.Group>
  );
}
```

#### PROPS:

- containerClass (type: string, optional): CSS class for styling the component container.
- inputWrapperClass (type: string, optional): CSS class for styling an additional container around the text area.
- labelValue (type: string): Label text.
- labelClass (type: string, optional): CSS class for label text styling.
- txtAreaValue (type: string): The current value of the text area.
- txtAreaClass (type: string): CSS class for styling the text area itself.
- animationData (type: string, optional): Used to retrieve elements with the same attribute to animate them.
- placeholder (type: string, optional): Placeholder text displayed in the text area when empty.
- onChange (type: (e?: any) => void): Function that will be called when the value of the text area changes.

#### USAGE:

```typescript
const [inputValue, setInputValue] = (useState<string> = "");

<TxtAreaLabeled
  containerClass="exmaple-css-class"
  labelValue="Example text"
  inputWrapperClass="exmaple-css-class"
  labelClass="exmaple-css-class"
  txtAreaClass="exmaple-css-class"
  txtAreaValue={inputValue}
  onChange={(e) => {
    setInputValue(e.target.value);
  }}
  animationData="example-data"
/>;
```

## Custom hooks

### useNavigateTo

```typescript
import { useNavigate } from "react-router-dom";

export default function useNavigateTo() {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };
  return { navigateTo };
}
```

#### Description:

- The useNavigateTo hook provides a navigateTo function that allows you to navigate to a specific path in your application using the useNavigate hook from react-router-dom.

#### Props:

-path: The path to which the user will be redirected

#### Usage:

```typescript
import useNavigateTo from "../../../hooks/useNavigateTo";

const { navigateTo } = useNavigateTo();

<button
  onClick={() => {
    navigateTo("example-path");
  }}
/>;
```

### useCompareTasks

```typescript
import { useEffect, useState } from "react";
import { compareTaskChanges } from "../utils/task-details/CompareTaskChanges";
import { Task } from "../context/tasksContext";

... type Task = {
  start: string;
  end: string;
  description: string;
  taskStatus: boolean;
  title: string;
  taskID: string;
  list: string;
  listColor: string;
  subtasks: SubtaskType[];
};

export function useCompareTasks(currentTask: Task, editedTask: Task) {
  const [taskHasChanged, setTaskHasChanged] = useState<boolean>(false);

  useEffect(() => {
    compareTaskChanges(currentTask, editedTask, setTaskHasChanged);
  }, [editedTask]);

  return taskHasChanged;
}
```

#### Description:

- The useCompareTasks hook allows you to compare two task objects (currentTask and editedTask) and set "taskHasChanged" state, indicating whether any changes occur between the tasks.
- currentTask is the currently displayed task and editedTask is an additional state with the same value that is modified by the user. Then, after making changes to the editedTask, the changes are compared.

#### Props:

- currentTask: Selected / Currently displayed task.
- editedTask: The value that the user edits compared with the initial value (currentTask).
- setTaskHasChanged: A function that determines whether a change has occurred.

#### Usage:

```typescript
import { useCompareTasks } from "../../../../hooks/useCompareTasks";
const [currentTask, setCurrentTask] = useState<Task>({
  /* ... */
});
const [editedTask, setEditedTask] = useState<Task>({
  /* ... */
});

const taskHasChanged = useCompareTasks(currentTask, editedTask);
```

### useRedirectOnAuth

```typescript
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
```

#### Description:

- The useRedirectOnAuth hook allows you to automatically redirect the user to a specific path if he is logged in based on the 'isLogged' state value which is part of the 'authContext' object.

#### Props:

- path: The path to which the user will be redirected.

#### Usage:

```typescript
import useRedirectOnAuth from "../hooks/useRedirectOnAuth";

const { redirectOnAuth } = useRedirectOnAuth();
redirectOnAuth("example-path");
```

### useTaskDetailsAnimation

```typescript
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
```

#### Description:

- useTaskDetailsAnimation adds a "slidIngRight" animation on all elements with the data-animation="slide-animation" attribute.
- The animation duration for the first element is equal to the value of the "animationDuration" parameter passed to the hook, and for each subsequent element this value is increased by 100 ms.
- The animation is performed each time the list of displayed tasks is selected, right after setting the first task on the list as "currentTask" and each time the user selects a new task for viewing.

#### Props:

- animationDuration: Animation time in milliseconds.

#### Usage:

```typescript
import useTaskDetailsAnimation from "../../../../hooks/useTaskDetailsAnimation";

const { taskDetailsAnimation } = useTaskDetailsAnimation();

taskDetailsAnimation(example - number);
```

### useOpenSection

```typescript
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
```

#### Description:

- The useOpenSection hook allows you to handle opening and closing sections on a page in a responsive way. When you resize the browser window, the hook automatically adjusts the position of the section.

#### Props:

- endTriggerWidth: Parameter specifies the point at which the animation will be deactivated.
- sectionRef: Ref of an object that represents the section to open/close.
- sectionOpenerRef: Ref object that represents the section opener/closer.
- isOpened: State indicating whether the section is open.
- setIsOpened: Function to set the open/closed state of a section.
- slideInFrom: The direction of the section opening/closing animation (value "right" or "left").

#### Usage:

```typescript
import useOpenSection from "../../../../hooks/useOpenSection";

const [exampleSectionIsOpened, setExampleSectionIsOpened] =
  useState<boolean>(false);
const exampleSectionRef = useRef(null);
const exampleOpenerRef = useRef(null);
const { openSection } = useOpenSection();

openSection(
  exampleSectionRef,
  exampleOpenerRef,
  exampleSectionIsOpened,
  setExampleSectionIsOpened,
  "right",
  example - width
);

<div ref={exampleSectionRef}>
  <div
    ref={exampleOpenerRef}
    onClick={() => {
      setExampleSectionIsOpened(!exampleSectionIsOpened);
    }}
  ></div>
</div>;
```
