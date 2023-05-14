import { redirect, useActionData, useLoaderData } from "react-router-dom";
import { signin } from "../../api/auth";
import ModalForm from "./ModalForm";

export async function action({ request }) {
  try {
    const user = Object.fromEntries(await request.formData());
    const data = await signin(user);

    if (!data.success) {
      throw data;
    }

    localStorage.setItem("user", JSON.stringify(data.user));

    return redirect("/user/chats");
  } catch (error) {
    if (error.status === 401) {
      return await error.json();
    }
    return "Error al iniciar sesión. Inténtelo más tarde.";
  }
}

function Login({ setShow }) {
  const error = useActionData();

  return (
    <ModalForm action={"login"} submit={"Iniciar sesión"} setShow={setShow}>
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

      {error ? (
        typeof error === "string" ? (
          <small className="modal__error">{error}</small>
        ) : (
          <small className="modal__error">{error.message}</small>
        )
      ) : (
        ""
      )}
    </ModalForm>
  );
}

export default Login;
