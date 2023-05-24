import { Form, useNavigation } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import "../Tabs.css";

function TabFriendsChat({ friends, className, error = null }) {
  const navigation = useNavigation();

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
      {navigation.state !== "idle" ? (
        <div className="modal__btn-submit"><AiOutlineLoading className="default-loading"/></div>
      ) : (
        <button type="submit" className="modal__btn-submit">Nuevo chat</button>
      )}
    </Form>
  );
}

export default TabFriendsChat