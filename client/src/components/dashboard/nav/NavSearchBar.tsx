import "../../../styles/dashboard/dashboard-nav.css";
import { Container } from "react-bootstrap";
import { AiOutlineSearch as SearchIcon } from "react-icons/ai";
export default function NavSearchBar() {
  return (
    <Container className="d-flex flex-row bg-light align-items-center rounded p-0">
      <SearchIcon
        className="ms-2 text-secondary regular-icon"
        style={{ cursor: "pointer" }}
        onClick={() => {
          console.log("search on click");
        }}
      />
      <input
        type="text"
        placeholder="Search"
        className="border-0 p-2 bg-transparent rounded text-secondary fw-semibold txt-regular"
        style={{ flex: 1, outline: "none" }}
      />
    </Container>
  );
}
