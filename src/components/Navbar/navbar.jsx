import "./navbar.css";

// Components
import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
  BsList,
} from "react-icons/bs";

import { useState } from "react";

// Hooks
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { logout, reset } from "../../slices/authSlice";

export default function Navbar() {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <>
      <nav id="nav">
        <Link to="/" className="logo">
          ReactGram
        </Link>
        <form id="search-form" onSubmit={handleSearch}>
          <BsSearch />
          <input
            type="text"
            placeholder="Pesquisar"
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <BsList />
        </div>
        <ul id="nav-links" className={menuOpen ? "active" : ""}>
          {auth ? (
            <>
              <li>
                <NavLink to="/" onClick={() => setMenuOpen(false)}>
                  <BsHouseDoorFill />
                </NavLink>
              </li>
              {user && (
                <li>
                  <NavLink
                    to={`/users/${user._id}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <BsFillCameraFill />
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/profile" onClick={() => setMenuOpen(false)}>
                  <BsFillPersonFill />
                </NavLink>
              </li>
              <li>
                <span
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                >
                  Sair
                </span>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                  Entrar
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" onClick={() => setMenuOpen(false)}>
                  Cadastrar
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
