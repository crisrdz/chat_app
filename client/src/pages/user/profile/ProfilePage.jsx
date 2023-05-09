import { NavLink, Outlet } from "react-router-dom";
import "./ProfilePage.css";
import { getUser } from "../../../api/user";

export async function loader () {
  try {
    const { token } = JSON.parse(localStorage.getItem("user"));
    const data = await getUser(token);

    return data.user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function ProfilePage() {  
  return (
    <>
      <ul className="profile-nav">
        <NavLink to={""} className="profile-nav__item">Ver perfil</NavLink>
        <NavLink to={"edit"} className="profile-nav__item">Editar perfil</NavLink>
        <NavLink to={"visibility"} className="profile-nav__item">Cambiar visibilidad</NavLink>
      </ul>
      <Outlet />
    </>
  );
}

export default ProfilePage;
