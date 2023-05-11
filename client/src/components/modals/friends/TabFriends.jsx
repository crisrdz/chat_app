import { useEffect } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { deleteFriend } from "../../../api/friends";
import "./Tabs.css";

function TabFriends({ className, friends, searchFriends }) {
  useEffect(() => {
    searchFriends();
  }, []);

  async function handleDeleteFriend(username) {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      await deleteFriend(token, username);

      await searchFriends();
    } catch (error) {
      console.error("ERROR");
    }
  }

  return (
    <table className={`tab__table ${className ? className : ""}`}>
      <thead>
        <tr>
          <th className="tab__table__td">Nombre de usuario</th>
          <th className="tab__table__td">Eliminar amigo</th>
        </tr>
      </thead>
      <tbody>
        {friends &&
          friends.map((friend) => (
            <tr key={friend.username}>
              <td className="tab__table__td">{friend.username}</td>
              <td className="tab__table__td">
                <button type="submit" className="tab__table__td__btn" onClick={() => {handleDeleteFriend(friend.username)}}>
                  <AiFillCloseSquare className="tab__table__td__btn__icon"/>
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default TabFriends;
