import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import { FaHome } from "react-icons/fa";

const NavBar = () => {
  return (
    <div id="navbar">
      <span>
        <img src={logo} alt="Website main logo" />
      </span>
      <div>
        <Link to="/">
          <FaHome />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
