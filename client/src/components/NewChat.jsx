import "./NewChat.css";

function NewChat ({onClick}) {
  return (
    <button className="new-chat-btn" onClick={onClick}>
      Nuevo chat
    </button>
  )
}

export default NewChat;