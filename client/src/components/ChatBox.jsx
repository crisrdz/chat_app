import { useEffect, useRef, useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import "./ChatBox.css";

function ChatBox({ hasChat }) {
  if (!hasChat) {
    return (
      <div className="chat-box chat-box--no-chat">
        <div className="chat-box__user">Ninguno</div>
        <div className="chat-box__messages chat-box__messages--no-chat">
          No hay chat seleccionado
        </div>
      </div>
    );
  }

  const { token, username } = JSON.parse(localStorage.getItem("user"));
  const { socket, replaceChats } = useOutletContext();
  const { chat } = useLoaderData();

  const [messagesState, setMessagesState] = useState(chat.messages);
  const inputRef = useRef(null);

  function handleSendMessage(e) {
    e.preventDefault();

    const message = {
      body: inputRef.current.value,
      chat: chat._id,
      userToken: token
    };

    replaceChats(message);
    socket.emit("client:newmessage", message);
    
    const newMessage = {
      body: message.body,
      user: {
        username
      }
    }
    setMessagesState([newMessage, ...messagesState]);
    inputRef.current.value = "";
  }

  useEffect(() => {
    const newMessageReceived = (message) => {
      if (message.chat === chat._id) {
        const newMessage = {
          body: message.body,
          user: message.user
        }
        setMessagesState([newMessage, ...messagesState]);
      }
    };

    socket.on("server:newmessage", newMessageReceived);

    return () => {
      socket.off("server:newmessage", newMessageReceived);
    };
  }, [messagesState]);

  return (
    <div className="chat-box">
      <div className="chat-box__user">{chat.users[0].username === username ? chat.users[1].username : chat.users[0].username}</div>
      <div className="chat-box__messages">
        {messagesState?.map((message, index) => {
          return (
            <div
              key={index}
              className={`chat-box__messages__msg ${
                message.user.username === username
                  ? "chat-box__messages__msg--mine"
                  : "chat-box__messages__msg--yours"
              }`}
            >
              {message.body}
            </div>
          );
        })}
      </div>
      <div>
        <form className="chat-box__input-box" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="chat-box__input-box__input"
            ref={inputRef}
          />
          <button className="chat-box__input-box__submit">{">"}</button>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
