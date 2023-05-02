import { NavLink, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { useState } from "react";
import "./NavbarMenu.css";

function NavbarMenu({ setShowSignin, setShowSignup, isLogged }) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  function handleMenu() {
    setShowMenu((prev) => !prev);
  }

  function handleOpenSignin() {
    setShowSignin((prev) => !prev);
  }

  function handleOpenSignup() {
    setShowSignup((prev) => !prev);
  }

  return (
    <div className="navbar__section">
      <button className="navbar__section__btn-menu" onClick={handleMenu}>
        <HiMenu />
      </button>
      <ul
        className={`navbar__list navbar__list__menu ${
          showMenu && "navbar__list__menu--show"
        }`}
      >
        {!isLogged ? (
          <>
            <li
              className="navbar__list__link navbar__list__link--menu"
              onClick={handleOpenSignin}
            >
              Iniciar sesión
            </li>
            <li
              className="navbar__list__link navbar__list__link--menu"
              onClick={handleOpenSignup}
            >
              Registrarse
            </li>
          </>
        ) : (
          <>
            <NavLink
              to="/chats"
              className={`navbar__list__link ${
                showMenu && "navbar__list__link--menu"
              }`}
            >
              Chats
            </NavLink>
            <li
              className={`navbar__list__link ${
                showMenu && "navbar__list__link--menu"
              }`}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              Cerrar sesión
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default NavbarMenu;
