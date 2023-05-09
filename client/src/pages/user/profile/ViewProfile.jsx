import { Link, useRouteLoaderData } from "react-router-dom";

function ViewProfile() {
  const user = useRouteLoaderData("profile");
  
  return (
    <>
      <div className="profile">
        <h2 className="profile__title">Perfil</h2>

        <div className="profile__box">
          <h6 className="profile__box__label">Correo electrónico: </h6>
          <p className="profile__box__field">{user.email}</p>  
        </div>

        <div className="profile__box">
          <h6 className="profile__box__label">Nombre de usuario: </h6>
          <p className="profile__box__field">{user.username}</p>  
        </div>

        <div className="profile__box">
          <h6 className="profile__box__label">Visibilidad: </h6>
          <p className="profile__box__field">{user.isPublic ? "Pública" : "Privada"}</p>  
        </div>
      </div>
      <div className="btn-box">
        <Link to={"visibility"} className="profile__btn btn-box__btn">Cambiar visibilidad</Link>
      </div>
    </>
  )
}

export default ViewProfile