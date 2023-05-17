import { Link, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import {
  AiOutlineBell,
  AiOutlineUser,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import Header from "../../components/structure/Header";
import "./UserPage.css";
import { useEffect, useRef, useState } from "react";
import { socket } from "../../socket";
import { getUser } from "../../api/user";
import { addFriend, declineFriend } from "../../api/friends";
import ModalMessage from "../../components/modals/message/ModalMessage";
import { useModalMessage } from "../../hooks/modalHooks";
import ModalConfirmation from "../../components/modals/ModalConfirmation";

export async function loader() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const data = await getUser(user.token);

    return {
      ...data.user,
      token: user.token,
    };
  } catch (error) {
    localStorage.removeItem("user");
    if (error.status === 401) {
      throw new Error("Su sesión ha expirado.");
    }

    throw new Error(
      "Error al entrar a su cuenta. Vuelva a iniciar sesión e inténtelo más tarde."
    );
  }
}

function UserPage() {
  const user = useLoaderData();
  const refMenu = useRef(null);
  const refRequests = useRef(null);
  const navigate = useNavigate();
  const [requestUsernames, setRequestUsernames] = useState(user.friendRequests);
  const {modalMessage, showModalMessage} = useModalMessage();
  const [modalConfirm, setModalConfirm] = useState({
    show: false,
    question: ""
  });

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      socket.emit("client:joinuser", user.token);
    });
  }, []);

  useEffect(() => {
    const newRequest = (username) => {
      setRequestUsernames([{ username }, ...requestUsernames]);
    };

    const newFriend = (username) => {
      showModalMessage(`¡"${username}" ha sido añadido a sus amigos!`);
    }

    socket.on("server:newfriendrequest", newRequest);
    socket.on("server:newfriend", newFriend);

    return () => {
      socket.off("server:newfriendrequest", newRequest);
      socket.off("server:newfriend", newFriend);
    };
  }, [requestUsernames]);

  function handleToggleRequests() {
    refMenu.current.classList.remove("navbar-user__user-menu__menu--show");
    refRequests.current.classList.toggle("navbar-user__user-menu__menu--show");
  }

  function handleToggleMenu() {
    refRequests.current.classList.remove("navbar-user__user-menu__menu--show");
    refMenu.current.classList.toggle("navbar-user__user-menu__menu--show");
  }

  function updateRequests(username) {
    const requestUsernamesCopy = [...requestUsernames];

    for (let i = 0; i < requestUsernamesCopy.length; i++) {
      if (requestUsernamesCopy[i].username === username) {
        requestUsernamesCopy.splice(i, 1);
        break;
      }
    }

    setRequestUsernames(requestUsernamesCopy);
  }

  async function declineRequest(username) {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      await declineFriend(token, username);

      updateRequests(username);
      showModalMessage(`¡Se ha rechazado la solicitud de ${username} con éxito!`);
    } catch (error) {
      showModalMessage("Ha ocurrido un error al rechazar la solicitud", true);
      console.log(error);
    }
  }

  async function acceptRequest(username) {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      await addFriend(token, username);

      updateRequests(username);
      showModalMessage(`¡"${username}" añadido a sus amigos con éxito!`);
    } catch (error) {
      showModalMessage("Ha ocurrido un error al aceptar la solicitud", true);
      console.log(error);
    }
  }

  return (
    <div className="page">
      <Header>
        <div className="navbar-user">
          <div className="navbar-user__welcome">¡Hola, {user.username}!</div>

          <div className="navbar-user__menus">
            <div
              className="navbar-user__user-menu"
              onClick={handleToggleRequests}
            >
              <div className="navbar-user__user-menu__icon-group">
                <AiOutlineBell className="navbar-user__user-menu__icon-group__icon" />
                {requestUsernames.length > 0 && (
                  <div className="navbar-user__user-menu__icon-group__circle"></div>
                )}
              </div>

              <div className="navbar-user__user-menu__menu" ref={refRequests}>
                {requestUsernames.length === 0 ? (
                  <p className="navbar-user__user-menu__menu__item">
                    ¡No tienes solicitudes de amistad!
                  </p>
                ) : (
                  <>
                    <h4 className="navbar-user__user-menu__menu__item">
                      Solicitudes de amistad:
                    </h4>
                    <div>
                      {requestUsernames.map((request) => (
                        <div
                          className="navbar-user__user-menu__menu__item-requests"
                          key={request.username}
                        >
                          <p className="navbar-user__user-menu__menu__item">
                            {request.username}
                          </p>
                          <div className="navbar-user__user-menu__menu__item-buttons">
                            <AiOutlineCheckCircle
                              className="navbar-user__user-menu__menu__item-buttons_confirm"
                              onClick={() => acceptRequest(request.username)}
                            />
                            <AiOutlineCloseCircle
                              className="navbar-user__user-menu__menu__item-buttons_decline"
                              onClick={() => 
                                setModalConfirm({
                                  show: true,
                                  question: "¿Estás seguro de rechazar esta solicitud?",
                                  onConfirm: () => {
                                    declineRequest(request.username);
                                    setModalConfirm({show: false, question: ""});
                                  },
                                  onCancel: () => {setModalConfirm({show: false, question: ""})}
                                })  
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="navbar-user__user-menu" onClick={handleToggleMenu}>
            <AiOutlineUser />
            <div className="navbar-user__user-menu__menu" ref={refMenu}>
              <Link
                to={"/user/profile"}
                className="navbar-user__user-menu__menu__item"
              >
                Perfil
              </Link>
              <Link
                to={"/user/chats"}
                className="navbar-user__user-menu__menu__item"
              >
                Chats
              </Link>
              <button
                className="navbar-user__user-menu__menu__item navbar-user__user-menu__menu__logout-item"
                onClick={() => {
                  setModalConfirm({
                    show: true,
                    question: "¿Estás seguro de que quieres cerrar sesión?",
                    onConfirm: () => {
                      localStorage.removeItem("user")
                      setModalConfirm({show: false, question: ""});
                      navigate("/");
                    },
                    onCancel: () => {setModalConfirm({show: false, question: ""})}
                  })
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </Header>
      <Outlet context={showModalMessage}/>
      <ModalMessage key={"friend"} show={modalMessage?.show} hide={modalMessage?.hide} error={modalMessage?.error}>{modalMessage?.message}</ModalMessage>
      {modalConfirm?.show && (
        <ModalConfirmation
          question={modalConfirm.question}
          onConfirm={modalConfirm.onConfirm}
          onCancel={modalConfirm.onCancel}
        />
      )}
    </div>
  );
}

export default UserPage;
