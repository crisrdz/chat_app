import { useRef } from "react";
import { Form } from "react-router-dom";
import "./ChatBox.css";

function ChatBox({chatState}) {
  if(!chatState) {
    return (
      <div className="chat-box chat-box--no-chat">
        <div className="chat-box__user">
          Ninguno
        </div>
        <div className="chat-box__messages chat-box__messages--no-chat">
          No hay chat seleccionado
        </div>
      </div>
    )
  }

  const {chat, setChat} = chatState;
  const inputRef = useRef(null);

  function handleSendMessage() {
    setChat(prev => {
      const chat = {...prev};
      chat.messages.unshift({
        message: inputRef.current.value,
        mine: true,
      });
      inputRef.current.value = "";
      return chat;
    })  
  }

  return (
    <div className="chat-box">
      <div className="chat-box__user">
        {chat.user}
      </div>
      <div className="chat-box__messages">
        {chat.messages.map((message, index) => {
          return (
            <div key={index} className={`chat-box__messages__msg ${message.mine ? "chat-box__messages__msg--mine" : "chat-box__messages__msg--yours"}`}>
              {message.message}
            </div>
          )
        })}
      </div>
      <div>
        <Form action="" method="PUT" className="chat-box__input-box">
          <input type="text" className="chat-box__input-box__input" ref={inputRef} />
          <button className="chat-box__input-box__submit" onClick={handleSendMessage}>{">"}</button>
        </Form>
      </div>
    </div>
  )
}

export default ChatBox;