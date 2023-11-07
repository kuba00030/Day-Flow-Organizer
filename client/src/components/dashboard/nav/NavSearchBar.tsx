import "../../../styles/dashboard/dashboard-nav.css";
import { Container, FormControl } from "react-bootstrap";
import { AiOutlineSearch as SearchIcon } from "react-icons/ai";
export default function NavSearchBar() {
  return (
    <Container className="d-flex flex-row bg-light align-items-center search-bar rounded p-0 overflow-hidden">
      <SearchIcon
        className="ms-2 text-secondary"
        onClick={() => {
          console.log("search on click");
        }}
      />
      <FormControl
        size="sm"
        type="search"
        placeholder="Search"
        className="text-dark-emphasis border-0 shadow-none fw-semibold"
      />
    </Container>
  );
}
