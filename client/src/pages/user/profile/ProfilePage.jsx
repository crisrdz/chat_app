import { NavLink, Outlet } from "react-router-dom";
import "./ProfilePage.css";
import { getUser } from "../../../api/user";
import Footer from "../../../components/structure/Footer";

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
      <main className="main-profile">
        <ul className="profile-nav">
          <li>
            <NavLink to={""} className="profile-nav__item" end>Ver perfil</NavLink>
          </li>
          <li>
            <NavLink to={"edit"} className="profile-nav__item">Editar perfil</NavLink>
          </li>
          <li>
            <NavLink to={"visibility"} className="profile-nav__item">Cambiar visibilidad</NavLink>
          </li>
        </ul>
        <div className="profile-container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ProfilePage;
