import { useState } from "react";
import { redirect } from "react-router-dom";
import { AiFillCloseSquare } from "react-icons/ai";
import { getFriends, addFriend, deleteFriend } from "../../../api/friends";
import TabAddFriends from "./TabAddFriends";
import TabFriends from "./TabFriends";
import "../Modal.css";

export async function action ({ request }) {
  try {
    const { token } = JSON.parse(localStorage.getItem("user"));
    if(request.method === "PUT") {
      const formData = await request.formData();
      await addFriend(token, formData.get("username"));
    }

    if(request.method === "DELETE") {
      const formData = await request.formData();
      await deleteFriend(token, formData.get("username"));
    }

    return redirect("/user/chats");
  } catch (error) {
    console.error(error);
    return redirect("/user/chats");
  }
}

function ModalFriends({ setShow }) {
  const [tabFriends, setTabFriends] = useState(true);
  const [tabAddFriends, setTabAddFriends] = useState(false);
  const [friends, setFriends] = useState(null);

  async function searchFriends() {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const data = await getFriends(token);

      setFriends(data.user.friends);
    } catch (error) {
      console.error("ERROR");
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
          <TabFriends className={!tabFriends && "modal__tab--hidden"} friends={friends} searchFriends={searchFriends} />
          <TabAddFriends className={!tabAddFriends && "modal__tab--hidden"} searchFriends={searchFriends} />
        </div>
      </div>
      
    </div>
  );
}

export default ModalFriends;