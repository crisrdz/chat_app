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
  
  const messages = [];

  chat.messages.forEach((message) => {
    const mine = message.user.username === username ? true : false;
    messages.push({ body: message.body, mine });
  });

  const friendUsername = chat.users.find((user) => user.username !== username).username;

  const [messagesState, setMessagesState] = useState();
  const inputRef = useRef(null);

  useEffect(() => {
    setMessagesState(messages);
  }, [])

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
      mine: true
    }
    setMessagesState([newMessage, ...messagesState]);
    inputRef.current.value = "";
  }

  useEffect(() => {
    const newMessageSend = (message) => {
      if (message.chat === chat._id) {
        const newMessage = {
          body: message.body,
          mine: false
        }
        setMessagesState([newMessage, ...messagesState]);
      }
    };

    socket.on("server:newmessage", newMessageSend);

    return () => {
      socket.off("server:newmessage", newMessageSend);
    };
  }, [messagesState]);

  return (
    <div className="chat-box">
      <div className="chat-box__user">{friendUsername}</div>
      <div className="chat-box__messages">
        {messagesState?.map((message, index) => {
          return (
            <div
              key={index}
              className={`chat-box__messages__msg ${
                message.mine
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
