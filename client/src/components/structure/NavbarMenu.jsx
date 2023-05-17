import { NavLink } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { useState } from "react";
import ModalConfirmation from "../modals/ModalConfirmation";
import "./NavbarMenu.css";

function NavbarMenu({ setShowSignin, setShowSignup, isLogged, setIsLogged }) {
  const [showMenu, setShowMenu] = useState(false);
  const [modalConfirm, setModalConfirm] = useState({
    show: false,
    question: ""
  });

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
    <>
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
                to="/user/chats"
                className={`navbar__list__link ${
                  showMenu && "navbar__list__link--menu"
                }`}
              >
                Chats
              </NavLink>
              <li
                className={`navbar__list__logout-link`}
                onClick={() => {
                  setModalConfirm({
                    show: true,
                    question: "¿Estás seguro de que quieres cerrar sesión?",
                    onConfirm: () => {
                      localStorage.removeItem("user");
                      setIsLogged(false);
                      setModalConfirm({show: false, question: ""});
                    },
                    onCancel: () => {setModalConfirm({show: false, question: ""})}
                  })  
                }}
              >
                Cerrar sesión
              </li>
            </>
          )}
        </ul>
      </div>
      {modalConfirm?.show && (
        <ModalConfirmation
          question={modalConfirm.question}
          onConfirm={modalConfirm.onConfirm}
          onCancel={modalConfirm.onCancel}
        />
      )}
    </>
  );
}

export default NavbarMenu;
