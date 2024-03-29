import { redirect, useActionData } from "react-router-dom";
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

    return redirect("/user/chats");

  } catch (error) {
    if(error.status === 400) {
      const data = await error.json(); 
      return data.message;
    }
    return "Error al registrarse. Inténtelo más tarde.";
  }
}

function Register({ setShow }) {
  const error = useActionData();

  return (
    <ModalForm action={"register"} submit={"Registrarse"} setShow={setShow}>
      <h2 className="modal__title">Registrarse</h2>

      <div>
        <label htmlFor="email">Correo electrónico:</label>
        <input type="text" name="email" id="email" className="modal__input" />
        {error?.details?.find(error => error.path.includes("email")) ? (
          <small className="modal__error">
            {error.details.find(error => error.path.includes("email")).message}
          </small>
        ) : (
          <small className="modal__help-label">
            Escriba un correo electrónico válido. Ej: email@gmail.com.
          </small>
        )}
      </div>

      <div>
        <label htmlFor="username">Nombre de usuario:</label>
        <input type="text" name="username" id="username" className="modal__input" />
        {error?.details?.find(error => error.path.includes("username")) ? (
          <small className="modal__error">
            {error.details.find(error => error.path.includes("username")).message}
          </small>
        ) : (
          <small className="modal__help-label">
            Nombre de usuario debe tener entre 3 y 16 caracteres y solo debe contener caracteres alfanuméricos.
          </small>
        )}
      </div>

      <div>
        <label htmlFor="passwordOne">Contraseña:</label>
        <input
          type="password"
          name="passwordOne"
          id="passwordOne"
          className="modal__input"
        />
        {error?.details?.find(error => error.path.includes("passwordOne")) ? (
          <small className="modal__error">
            {error.details.find(error => error.path.includes("passwordOne")).message}
          </small>
        ) : (
          <small className="modal__help-label">
            La contraseña debe tener entre 6 y 24 caracteres.
          </small>
        )}
      </div>

      <div>
        <label htmlFor="passwordTwo">Confirmar contraseña:</label>
        <input
          type="password"
          name="passwordTwo"
          id="passwordTwo"
          className="modal__input"
        />
        {error?.details?.find(error => error.path.includes("passwordTwo")) && (
          <small className="modal__error">
            {error.details.find(error => error.path.includes("passwordTwo")).message}
          </small>
        )}
      </div>

      {typeof error === "string" && (
        <small className="modal__error">
          {error}
        </small>
      )}

    </ModalForm>
  );
}

export default Register;
