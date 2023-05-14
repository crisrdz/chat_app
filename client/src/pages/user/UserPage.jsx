import { Link, Outlet, redirect, useLoaderData } from "react-router-dom";
import { AiOutlineBell, AiOutlineUser, AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import Header from "../../components/structure/Header";
import "./UserPage.css";
import { useEffect, useRef, useState } from "react";
import { socket } from "../../socket";
import { getUser } from "../../api/user";
import { addFriend, declineFriend } from "../../api/friends";

export async function loader () {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const data = await getUser(user.token);

    return {
      ...data.user,
      token: user.token
    };
  } catch (error) {
    localStorage.removeItem("user");
    if (error.status === 401) {
      throw new Error("Su sesión ha expirado.");
    }

    throw new Error("Error al entrar a su cuenta. Vuelva a iniciar sesión e inténtelo más tarde.");
  }
}

function UserPage() {
  const user = useLoaderData();
  const refMenu = useRef(null);
  const refRequests = useRef(null);
  const [requestUsernames, setRequestUsernames] = useState(user.friendRequests);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      socket.emit("client:joinuser", user.token);
    });
  }, [])

  useEffect(() => {
    const newRequest = (username) => {
      setRequestUsernames([{username}, ...requestUsernames]);
    }

    socket.on("server:newfriendrequest", newRequest);

    return () => {
      socket.off("server:newfriendrequest", newRequest);
    }
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
    
    for(let i = 0; i < requestUsernamesCopy.length; i++) {
      if(requestUsernamesCopy[i].username === username) {
        requestUsernamesCopy.splice(i, 1);
        break;
      }
    }

    setRequestUsernames(requestUsernamesCopy);
  }

  async function declineRequest(username) {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      await declineFriend(token, username)

      updateRequests(username);
    } catch (error) {
      console.log(error);
      console.error("HA OCURRIDO UN ERROR!")
    }
  }

  async function acceptRequest(username) {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      await addFriend(token, username)

      updateRequests(username);
    } catch (error) {
      console.error("HA OCURRIDO UN ERROR!")
    }
  }

  return (
    <div>
      <Header>
        <div className="navbar-user">
          <div className="navbar-user__welcome">¡Hola, {user.username}!</div>
          
          <div className="navbar-user__menus">
            <div className="navbar-user__user-menu" onClick={handleToggleRequests}>
              <div className="navbar-user__user-menu__icon-group">
                <AiOutlineBell className="navbar-user__user-menu__icon-group__icon" />
                {requestUsernames.length > 0 && <div className="navbar-user__user-menu__icon-group__circle"></div>}
              </div>
              
              <div className="navbar-user__user-menu__menu" ref={refRequests}>
                {requestUsernames.length === 0 ? (
                  <p className="navbar-user__user-menu__menu__item">
                    ¡No tienes solicitudes de amistad!
                  </p>
                ) : (
                  <>
                    <h4 className="navbar-user__user-menu__menu__item">Solicitudes de amistad:</h4>
                    <div>
                      {requestUsernames.map((request) => 
                        <div className="navbar-user__user-menu__menu__item-requests" key={request.username}>
                          <p className="navbar-user__user-menu__menu__item">
                            {request.username}
                          </p>
                          <div className="navbar-user__user-menu__menu__item-buttons">
                            <AiOutlineCheckCircle className="navbar-user__user-menu__menu__item-buttons_confirm" onClick={() => acceptRequest(request.username)} />
                            <AiOutlineCloseCircle className="navbar-user__user-menu__menu__item-buttons_decline" onClick={() => declineRequest(request.username)} />
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="navbar-user__user-menu" onClick={handleToggleMenu}>
            <AiOutlineUser  />
            <div className="navbar-user__user-menu__menu" ref={refMenu}>
              <Link to={"/user/profile"} className="navbar-user__user-menu__menu__item">Perfil</Link>
              <Link to={"/user/chats"} className="navbar-user__user-menu__menu__item">Chats</Link>
              <Link to={"/"} className="navbar-user__user-menu__menu__item navbar-user__user-menu__menu__logout-item" onClick={() => localStorage.removeItem("user")}>Cerrar sesión</Link>
            </div>
          </div>
        </div>
      </Header>
      <Outlet />
    </div>
  );
}

export default UserPage;
