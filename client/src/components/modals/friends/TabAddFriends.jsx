import { useEffect, useState } from "react";
import { AiOutlineRight, AiOutlineLoading, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { getUserByUsername } from "../../../api/user";
import { socket } from "../../../socket";
import "../Tabs.css";

const STATUS = {
  NORMAL: "NORMAL",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR"
}

function TabAddFriends({ className }) {
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState();
  const [status, setStatus] = useState(STATUS.NORMAL);
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    socket.on("server:newfriendrequest_error", error => {
      setRequestError(error);
    })
  }, []);

  async function searchUser(e) {
    try {
      e.preventDefault();
      setStatus(STATUS.LOADING);
      const { token } = JSON.parse(localStorage.getItem("user"));
      await getUserByUsername(token, searchValue);
      setStatus(STATUS.SUCCESS);
    } catch (error) {
      setStatus(STATUS.ERROR);
      if (error.status === 404) {
        setError("Usuario no encontrado");
      }
      console.error("ERROR");
    }
  }

  async function handleAddFriend() {
    try {
      socket.emit("client:newfriendrequest", searchValue);

      setSearchValue("");
      setError("");
      setStatus(STATUS.NORMAL);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`tab__container ${className ? className : ""}`}>
      <form action="" onSubmit={searchUser} style={{display: "flex", flexDirection: "column"}}>
        <div>
          <label htmlFor="searchbar">
            Busca un usuario por su nombre de usuario:
          </label>
          <div className="modal__input">
            <input 
              type="text" 
              className="modal__input__none" 
              name="searchbar"
              value={searchValue} onChange={(e) => {
                setError("")
                setRequestError("");
                setStatus(STATUS.NORMAL);
                setSearchValue(e.target.value);
              }}
            />
            {
              status === STATUS.NORMAL && (
                <AiOutlineRight className="modal__input__icon" />
              )
            }
            {
              status === STATUS.LOADING && (
                <AiOutlineLoading className="modal__input__icon modal__input__icon--loading" />
              )
            }
            {
              status === STATUS.SUCCESS && (
                <AiOutlineCheck className="modal__input__icon modal__input__icon--success" />
              )
            }
            {
              status === STATUS.ERROR && (
                <AiOutlineClose className="modal__input__icon modal__input__icon--error" />
              )
            }
          </div>
          {
            error && <small htmlFor="searchbar" className="modal__input-text--error">{error}</small>
          }
          <button type="submit" hidden></button>
        </div>
      </form>
        {status === STATUS.SUCCESS && (
          <button className="modal__btn-submit" onClick={handleAddFriend}>
            Enviar solicitud de amistad
          </button>
        )}
        {
          requestError && <small htmlFor="searchbar" className="modal__input-text--error">{requestError}</small>
        }
    </div>
  );
}

export default TabAddFriends;
