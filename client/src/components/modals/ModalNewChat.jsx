import { useEffect, useState } from "react";
import ModalForm from "./ModalForm"
import { getUsers } from "../../api/user";

function ModalNewChat({setShow}) {
  const [users, setUsers] = useState();

  useEffect(() => {
    setUsersSelect();
  }, [])

  async function setUsersSelect () {
    const { token } = JSON.parse(localStorage.getItem("user"));
    const data = await getUsers(token, 1);

    setUsers(data.users);
  }

  return (
    <ModalForm submit={"Nuevo chat"} action={"/chats"} setShow={setShow} onSubmit={() => setShow(false)}>
      <h1 className="modal-title">Nuevo chat</h1>

      <select name="user">
        {users && users.map(user => {
          return (
            <option value={user._id} key={user._id}>{user.username}</option>
          )
        })}
      </select>
    </ModalForm>
  )
}

export default ModalNewChat