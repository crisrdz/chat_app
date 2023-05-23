import { useState } from "react";
import { Form } from "react-router-dom";
import Select from '../../custom/Select'
import "../Tabs.css";

function TabPublicUsers({ users, className, error = null, searchPublicUsers, hasMore }) {
  if(error) {
    return (
      <p className={className ? className : ""} style={{color: "red"}}>{error}</p>
    )
  }

  if(users?.length === 0) {
    return (
      <p className={className ? className : ""}>¡No hay usuarios públicos disponibles para iniciar un nuevo chat!</p>
    )
  }

  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <Form method="POST" className={className ? className : ""} style={{display: "flex", flexDirection: "column"}}>

      <input type="hidden" name="user" value={selectedValue?.value || ""} />
      <Select
        options={users.map(user => ({label: user.username, value: user.username}))}
        hasMore={hasMore}
        loadData={searchPublicUsers}
        selectedOptionState={[selectedValue, setSelectedValue]}
      />
      {selectedValue && <button type="submit" className="modal__btn-submit">Nuevo chat</button>}
    </Form>
  )
}

export default TabPublicUsers