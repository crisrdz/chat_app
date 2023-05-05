import { redirect } from "react-router-dom";
import { signin } from "../../api/auth";
import ModalForm from "./ModalForm";

export async function action({ request }) {
  try {
    const user = Object.fromEntries(await request.formData())
    const data = await signin(user);

    if(!data.success) {
      throw data;
    }

    localStorage.setItem("user", JSON.stringify(data.user));

    return redirect("/chats");

  } catch (error) {
    return redirect("/");
  }
}

function Login({ setShow }) {
  return (
    <ModalForm action={"/login"} submit={"Iniciar sesión"} setShow={setShow}>
      <h2 className="modal__title">Iniciar sesión</h2>

      <label htmlFor="email">Correo electrónico:</label>
      <input type="text" name="email" id="email" className="modal__input" />

      <label htmlFor="password">Contraseña:</label>
      <input
        type="password"
        name="password"
        id="password"
        className="modal__input"
      />
    </ModalForm>
  );
}

export default Login;
