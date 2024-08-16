import { Link } from "react-router-dom";
import "./Nav.scss";

const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav__logo">
        <Link
          to={"/"}
        >
          Logo
        </Link>
      </div>
      <ul className="nav__links">
        <li className="nav__link">
          <Link
            to={"/home"}
          >
            Home
          </Link>
        </li>
        <li className="nav__link">
          <Link
            to={"/projects"}
          >
            Projects
          </Link>
        </li>
        <li className="nav__link">
          <Link
            to={"/blog"}
          >
            Blog
          </Link>
        </li>
        <li className="nav__link">
          <Link
            to={"/contact"}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  )};

export default Nav;