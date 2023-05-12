import { Form, redirect, useRouteLoaderData } from "react-router-dom";
import { updateUser } from "../../../api/user";

export async function action({ request }) {
  try {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    const formData = await request.formData();
    const user = Object.fromEntries(formData);

    const data = await updateUser(userLocal.token, user);
    userLocal.username = data.user.username;
    localStorage.setItem("user", JSON.stringify(userLocal));

    return redirect("/user/profile");
  } catch (error) {
    const data = await error.json();
    console.error(data);
    return null;
  }
}

function EditProfilePage() {
  const user = useRouteLoaderData("user");

  return (
    <Form className="profile" action="" method="PUT">
      <h2 className="profile__title">Editar perfil</h2>

      <div className="profile__box">
        <label htmlFor="email" className="profile__box__label">
          Email:
        </label>
        <input
          type="email"
          className="profile__box__field"
          value={user.email}
          readOnly
          disabled
          name="email"
        />
      </div>

      <div className="profile__box">
        <label htmlFor="username" className="profile__box__label">
          Nombre de usuario:
        </label>
        <input
          type="text"
          className="profile__box__field"
          defaultValue={user.username}
          name="username"
        />
      </div>

      <div className="profile__box">
        <label htmlFor="passwordOne" className="profile__box__label">
          Contraseña:
        </label>
        <input
          type="password"
          className="profile__box__field"
          name="passwordOne"
        />
      </div>

      <div className="profile__box">
        <label htmlFor="passwordTwo" className="profile__box__label">
          Confirme su contraseña:
        </label>
        <input
          type="password"
          className="profile__box__field"
          name="passwordTwo"
        />
      </div>

      <div className="profile__box">
        <label htmlFor="passwordOld" className="profile__box__label">
          Contraseña anterior:
        </label>
        <input
          type="password"
          className="profile__box__field"
          name="passwordOld"
        />
      </div>

      <button type="submit" className="profile__btn">
        Editar perfil
      </button>
    </Form>
  );
}

export default EditProfilePage;
