import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <nav className="navbar mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand m-0" to="/">
          <img className="logo-image" src="images/walter_logo.png" alt="logo" />
        </Link>
        <div className="d-flex search-box">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link
            to={`search?searchTerm=${searchTerm}`}
            className="search-button"
          >
            <img
              alt="search"
              className="search-image"
              src="/images/search.png"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
