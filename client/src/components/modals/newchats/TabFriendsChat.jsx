import { Form } from "react-router-dom";
import "../Tabs.css";

function TabFriendsChat({ friends, className, error = null }) {
  if(error) {
    return (
      <p className={className ? className : ""} style={{color: "red"}}>{error}</p>
    )
  }

  if(friends?.length === 0) {
    return (
      <p className={className ? className : ""}>¡No hay amigos disponibles para iniciar un nuevo chat!</p>
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