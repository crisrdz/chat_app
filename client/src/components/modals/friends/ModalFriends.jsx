import { useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { getFriends } from "../../../api/friends";
import TabAddFriends from "./TabAddFriends";
import TabFriends from "./TabFriends";
import "../Modal.css";

function ModalFriends({ setShow }) {
  const [tabFriends, setTabFriends] = useState(true);
  const [tabAddFriends, setTabAddFriends] = useState(false);
  const [friends, setFriends] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  async function searchFriends() {
    try {
      setLoading(true);
      const { token } = JSON.parse(localStorage.getItem("user"));
      const data = await getFriends(token);

      setFriends(data.user.friends);
      setError(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Ha ocurrido un error en el servidor. Reinténtelo más tarde.");
    }
  }

  return (
    <div className="modal modal-tabs">
      <AiFillCloseSquare
        className="modal__btn-close"
        onClick={() => setShow(false)}
      />
      <h1 className="modal__title">Amigos</h1>

      <div className="tab">
        <div className="tab__tab-header">
          <button
            className={`tab__tab-header__item ${tabFriends && "tab__tab-header__item--active"}`}
            onClick={() => {
              setTabFriends(true);
              setTabAddFriends(false);
            }}
          >
            Mis amigos
          </button>
          <button
            className={`tab__tab-header__item ${tabAddFriends && "tab__tab-header__item--active"}`}
            onClick={() => {
              setTabFriends(false);
              setTabAddFriends(true);
            }}
          >
            Agregar amigo
          </button>
        </div>

        <div className="tab__tab-body">
          <TabFriends className={!tabFriends && "modal__tab--hidden"} friends={friends} searchFriends={searchFriends} errorState={{error, setError}} loadingFriends={loading} />
          <TabAddFriends className={!tabAddFriends && "modal__tab--hidden"} searchFriends={searchFriends} />
        </div>
      </div>
      
    </div>
  );
}

export default ModalFriends;
