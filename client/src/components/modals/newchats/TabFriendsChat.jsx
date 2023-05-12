import { Form } from "react-router-dom";
import "../Tabs.css";

function TabFriendsChat({ friends, className }) {
  if(!friends || friends?.length === 0) {
    return (
      <p className={className ? className : ""}>¡No tienes amigos!</p>
    )
  }

  return (
    <Form method="POST" className={className ? className : ""} style={{display: "flex", flexDirection: "column"}}>
      <select name="user" className="modal__input">
        {friends && friends.map(friend => {
          return (
            <option value={friend.username} key={friend.username}>{friend.username}</option>
          )
        })}
      </select>
      <button type="submit" className="modal__btn-submit">Nuevo chat</button>
    </Form>
  );
}

export default TabFriendsChat