import { useEffect, useRef, useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { socket } from "../socket";
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
  const replaceChats = useOutletContext();
  const { chat } = useLoaderData();

  const [messagesState, setMessagesState] = useState(chat.messages);
  const inputRef = useRef(null);

  function handleSendMessage(e) {
    e.preventDefault();

    const message = {
      body: inputRef.current.value,
      chat: chat._id,
      user: {
        username,
      },
      userToken: token
    };

    replaceChats({...message, createdAt: new Date()});
    socket.emit("client:newmessage", message);
    
    const dateTime = new Date();
    const newMessage = {
      body: message.body,
      user: {
        username
      },
      createdAt: dateTime
    }
    const date = dateTime.toLocaleDateString();
    const messagesStateCopy = {...messagesState};

    if(!messagesStateCopy.hasOwnProperty(date)) {
      messagesStateCopy[date] = [];
    }
    messagesStateCopy[date].push(newMessage);
    setMessagesState(messagesStateCopy);
    inputRef.current.value = "";
  }

  useEffect(() => {
    const newMessageReceived = (message) => {
      if (message.chat === chat._id) {
        const dateTime = new Date(message.createdAt);
        const newMessage = {
          body: message.body,
          user: message.user,
          createdAt: dateTime
        }
        const date = dateTime.toLocaleDateString();
        const messagesStateCopy = {...messagesState};
    
        if(!messagesStateCopy.hasOwnProperty(date)) {
          messagesStateCopy[date] = [];
        }
        messagesStateCopy[date].push(newMessage);
        setMessagesState(messagesStateCopy);
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
        {
          Object.keys(messagesState).map(day => {
            return (
              <div key={day} style={{display: "flex", flexDirection: "column"}}>
                <strong className="chat-box__messages__date">{day}</strong>
                {messagesState[day].map((message, index) => {
                  return (
                    <div
                      key={index}
                      className={`chat-box__messages__msg ${
                        message.user.username === username
                          ? "chat-box__messages__msg--mine"
                          : "chat-box__messages__msg--yours"
                      }`}
                    >
                      <p className="chat-box__messages__msg__body">{message.body}</p>
                      <small className={`chat-box__messages__msg__date ${message.user.username === username && "chat-box__messages__msg__date--mine"}`}>{message.createdAt.toLocaleTimeString(undefined, {timeStyle: "short"})}</small>
                    </div>
                  )})}
              </div>
            )
          })
        }
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
