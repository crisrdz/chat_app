import { useParams } from "react-router-dom";
import "./NewChat.css";

function NewChat ({onClick}) {
  const { id } = useParams();
  return (
    <button className={`new-chat-btn ${id && "new-chat-btn--hidden"}`} onClick={onClick}>
      Nuevo chat
    </button>
  )
}

export default NewChat;