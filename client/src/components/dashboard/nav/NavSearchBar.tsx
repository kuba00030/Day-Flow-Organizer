import "../../../styles/dashboard/dashboard-nav.css";
import { Container } from "react-bootstrap";
import { AiOutlineSearch as SearchIcon } from "react-icons/ai";
import { Task, TaskList, useTasksContext } from "../../../context/tasksContext";
export default function NavSearchBar() {
  const { taskLists, currentList, setCurrentList } = useTasksContext();

  const handleSearch = (searchValue: string) => {
    const searchedTasks: Task[] = [];

    // Przeszukaj wszystkie taski w poszczególnych listach
    taskLists.forEach((list) => {
      list.tasks.forEach((task) => {
        // Sprawdź, czy tytuł taska zawiera wprowadzoną wartość
        if (task.title.toLowerCase().includes(searchValue.toLowerCase())) {
          searchedTasks.push(task);
        }
      });
    });

    // Utwórz nową listę zawierającą znalezione taski
    const searchedList: TaskList = {
      listName: "Searched tasks",
      listColor: "", //
      listActive: true,
      tasks: searchedTasks,
    };

    // Ustaw nową listę jako bieżącą listę
    setCurrentList(searchedList);
  };
  return (
    <Container
      className="d-flex flex-row bg-light align-items-center bg-transparent rounded p-0 border border-dark-subtle shadowHover"
      data-style="search-bar"
    >
      <SearchIcon className="ms-2 text-secondary regular-icon" />
      <input
        type="text"
        placeholder="Search"
        className="border-0 p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
        onFocus={() => {
          document
            .querySelector('[data-style="search-bar"]')
            .classList.add("shadowFocused");
        }}
        onBlur={() => {
          document
            .querySelector('[data-style="search-bar"]')
            .classList.remove("shadowFocused");
        }}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        style={{ flex: 1, outline: "none" }}
      />
    </Container>
  );
}
