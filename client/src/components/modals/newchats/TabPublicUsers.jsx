import { Form } from "react-router-dom";
import "../Tabs.css";

function TabPublicUsers({ users, className }) {
  if(!users || users?.length === 0) {
    return (
      <p className={className ? className : ""}>¡No existen usuarios públicos!</p>
    )
  }

  return (
    <Form method="POST" className={className ? className : ""} style={{display: "flex", flexDirection: "column"}}>
      <select name="user" className="modal__input">
        {users && users.map(user => {
          return (
            <option value={user.username} key={user.username}>{user.username}</option>
          )
        })}
      </select>
      <button type="submit" className="modal__btn-submit">Nuevo chat</button>
    </Form>
  )
}

export default TabPublicUsers