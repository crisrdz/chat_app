import { useEffect, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { getPublicUsers } from "../../../api/user";
import { getFriends } from "../../../api/friends";
import TabFriendsChat from "./TabFriendsChat";
import TabPublicUsers from "./TabPublicUsers";

function ModalNewChat({ setShow, chats }) {
  const [tabFriends, setTabFriends] = useState(true);
  const [tabPublicUsers, setTabPublicUsers] = useState(false)
  const [users, setUsers] = useState([]);
  const [hasMorePublicUsers, setHasMorePublicUsers] = useState(true)
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState();

  const usersWithChat = chats.flatMap(chat => chat.users.map(user => user.username));

  async function searchFriends() {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const data = await getFriends(token);
      let friends = data.user.friends;

      friends = friends.filter(friend => !usersWithChat.includes(friend.username));

      setFriends(friends);
      setError(null);
    } catch (error) {
      setError("Ha ocurrido un error en el servidor. Reinténtelo más tarde.");
    }
  }

  async function searchPublicUsers(page) {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const data = await getPublicUsers(token, page);
      let users = data.users;

      if(users.length < 20) {
        setHasMorePublicUsers(false);
      }

      users = users.filter(user => !usersWithChat.includes(user.username));

      setUsers(prev => prev.concat(users));
      setError(null);
    } catch (error) {
      setError("Ha ocurrido un error en el servidor. Reinténtelo más tarde.");
    }
  }

  useEffect(() => {
    searchPublicUsers(1);
    searchFriends();
  }, [])

  return (
    <div className="modal modal-tabs">
      <AiFillCloseSquare
        className="modal__btn-close"
        onClick={() => setShow(false)}
      />
      <h1 className="modal__title">Nuevo chat</h1>

      <div className="tab">
        <div className="tab__tab-header">
          <button
            className={`tab__tab-header__item ${tabFriends && "tab__tab-header__item--active"}`}
            onClick={() => {
              setTabFriends(true);
              setTabPublicUsers(false);
            }}
          >
            Mis amigos
          </button>
          <button
            className={`tab__tab-header__item ${tabPublicUsers && "tab__tab-header__item--active"}`}
            onClick={() => {
              setTabFriends(false);
              setTabPublicUsers(true);
            }}
          >
            Usuarios públicos
          </button>
        </div>

        <div className="tab__tab-body">
          <TabFriendsChat className={!tabFriends && "modal__tab--hidden"} friends={friends} error={error} />
          <TabPublicUsers className={!tabPublicUsers && "modal__tab--hidden"} users={users} error={error} searchPublicUsers={searchPublicUsers} hasMore={hasMorePublicUsers} />
        </div>
      </div>
      
    </div>
  )
}

export default ModalNewChat