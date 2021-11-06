import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ setLibStatus, libStatus }) => {
  return (
    <nav>
      <h1>Soft-Player</h1>
      <button onClick={() => setLibStatus(!libStatus)}>
        Library <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};
export default Nav;
