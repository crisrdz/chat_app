import { redirect } from "react-router-dom";
import { signup } from "../../api/auth";
import ModalForm from "./ModalForm";

export async function action({ request }) {
  try {
    const user = Object.fromEntries(await request.formData())
    const data = await signup(user);

    if(!data.success) {
      throw data;
    }

    localStorage.setItem("user", JSON.stringify(data.user));

    return redirect("/chats");

  } catch (error) {
    return redirect("/");
  }
}

function Register({ setShow }) {
  return (
    <ModalForm action={"/register"} submit={"Registrarse"} setShow={setShow}>
      <h2 className="modal__title">Registrarse</h2>

      <label htmlFor="email">Correo electrónico:</label>
      <input type="text" name="email" id="email" className="modal__input" />

      <label htmlFor="email">Nombre de usuario:</label>
      <input type="text" name="username" id="username" className="modal__input" />

      <label htmlFor="passwordOne">Contraseña:</label>
      <input
        type="password"
        name="passwordOne"
        id="passwordOne"
        className="modal__input"
      />

      <label htmlFor="passwordTwo">Confirmar contraseña:</label>
      <input
        type="password"
        name="passwordTwo"
        id="passwordTwo"
        className="modal__input"
      />
    </ModalForm>
  );
}

export default Register;
