import { Form, redirect, useActionData, useRouteLoaderData } from "react-router-dom";
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
    if(error.status === 400) {
      const data = await error.json();
      console.error(data);
      return data.message;
    }
    throw error;
  }
}

function EditProfilePage() {
  const user = useRouteLoaderData("user");
  const error = useActionData();

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
        {error?.details?.find(error => error.path.includes("email")) && (
          <small className="modal__error">
            {error.details.find(error => error.path.includes("email")).message}
          </small>
        )}
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
        {error?.details?.find(error => error.path.includes("username")) && (
          <small className="modal__error">
            {error.details.find(error => error.path.includes("username")).message}
          </small>
        )}
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
        {error?.details?.find(error => error.path.includes("passwordOne")) && (
          <small className="modal__error">
            {error.details.find(error => error.path.includes("passwordOne")).message}
          </small>
        )}
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
        {error?.details?.find(error => error.path.includes("passwordTwo")) && (
          <small className="modal__error">
            {error.details.find(error => error.path.includes("passwordTwo")).message}
          </small>
        )}
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
        {error?.details?.find(error => error.path.includes("passwordOld")) && (
          <small className="modal__error">
            {error.details.find(error => error.path.includes("passwordOld")).message}
          </small>
        )}
      </div>

      {typeof error === "string" && (
        <small className="modal__error">
          {error}
        </small>
      )}

      <button type="submit" className="profile__btn">
        Editar perfil
      </button>
    </Form>
  );
}

export default EditProfilePage;
