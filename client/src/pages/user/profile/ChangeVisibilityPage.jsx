import { Form, useRouteLoaderData } from "react-router-dom"
import { changeVisibility } from "../../../api/user";

export async function action () {
  try {
    const { token } = JSON.parse(localStorage.getItem("user"));
    const data = await changeVisibility(token);
    return data.user;
  } catch (error) {
    throw error;
  }
}

function ChangeVisibilityPage() {
  const { isPublic } = useRouteLoaderData("user");

  return (
    <Form className="profile" action="" method="PUT">
      <h2 className="profile__title">Cambiar visibilidad</h2>

      <div className="profile__box">
        <label htmlFor="visibility" className="profile__box__label">Visibilidad actual: </label>
        <input type="text" id="visibility" className="profile__box__field" value={isPublic ? "Pública" : "Privada"} readOnly />
      </div>

      <button type="submit" className="profile__btn">Cambiar</button>
    </Form>
  )
}

export default ChangeVisibilityPage