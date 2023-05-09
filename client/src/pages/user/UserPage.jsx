import { Link, Outlet, useLoaderData } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import Header from "../../components/structure/Header";
import "./UserPage.css";
import { useRef } from "react";

export async function loader() {
  return JSON.parse(localStorage.getItem("user"));
}

function UserPage() {
  const user = useLoaderData();
  const refMenu = useRef(null);

  function handleToggleMenu() {
    refMenu.current.classList.toggle("navbar-user__user-menu__menu--show");
  }

  return (
    <div>
      <Header>
        <div className="navbar-user">
          <div>¡Hola, {user.username}!</div>
          <div className="navbar-user__user-menu" onClick={handleToggleMenu}>
            <AiOutlineUser  />
            <div className="navbar-user__user-menu__menu" ref={refMenu}>
              <Link to={"/user/profile"} className="navbar-user__user-menu__menu__item">Perfil</Link>
              <Link to={"/user/chats"} className="navbar-user__user-menu__menu__item">Chats</Link>
              <Link to={"/"} className="navbar-user__user-menu__menu__item navbar-user__user-menu__menu__logout-item" onClick={() => localStorage.removeItem("user")}>Cerrar sesión</Link>
            </div>
          </div>
        </div>
      </Header>
      <Outlet />
    </div>
  );
}

export default UserPage;
