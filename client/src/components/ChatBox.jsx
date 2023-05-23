import { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";
import { getChat } from "../api/chat";
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
  const { id } = useParams();
  const { chat } = useLoaderData();
  const navigate = useNavigate();
  
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loader, setLoader] = useState(false);
  const [chatState, setChatState] = useState(chat);
  const inputRef = useRef(null);

  async function loadMessages(page) {
    try {
      setLoader(true);
      const data = await getChat(token, id, page);
      const messages = chatState.messages;

      if(data.chat.messages.length < 50) {
        setHasMore(false);
      }

      data.chat.messages.forEach(message => {
        message.createdAt = new Date(message.createdAt);
        const date = message.createdAt.toLocaleDateString();
        
        if(!messages.hasOwnProperty(date)) {
          messages[date] = [];
        }
        messages[date].unshift(message);
      });
  
      setChatState({...data.chat, messages});
      setPage(prev => prev + 1);
      setLoader(false);
    } catch (error) {
      console.log("ola");
      if (error.status === 400) {
        navigate("/user/chats");
      }
  
      if (error.status === 401) {
        localStorage.removeItem("user");
        throw new Error("Su sesión ha expirado");
      }
  
      throw new Error("Error al obtener el chat");
    }
  }

  function handleSendMessage(e) {
    e.preventDefault();

    const message = {
      body: inputRef.current.value,
      chat: chatState._id,
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
    const messagesCopy = {...chatState.messages};

    if(!messagesCopy.hasOwnProperty(date)) {
      messagesCopy[date] = [];
    }
    messagesCopy[date].push(newMessage);
    setChatState({...chatState, messages: messagesCopy});
    inputRef.current.value = "";
  }

  useEffect(() => {
    const newMessageReceived = (message) => {
      if (message.chat === chatState._id) {
        const dateTime = new Date(message.createdAt);
        const newMessage = {
          body: message.body,
          user: message.user,
          createdAt: dateTime
        }
        const date = dateTime.toLocaleDateString();
        const messagesCopy = {...chatState.messages};
    
        if(!messagesCopy.hasOwnProperty(date)) {
          messagesCopy[date] = [];
        }
        messagesCopy[date].push(newMessage);
        setChatState({...chatState, messages: messagesCopy});
      }
    };

    socket.on("server:newmessage", newMessageReceived);

    return () => {
      socket.off("server:newmessage", newMessageReceived);
    };
  }, [chatState]);

  const days = Object.keys(chatState.messages).sort((a, b) => {
    const aDate = a.split("-");
    const bDate = b.split("-");
    if(new Date(aDate[2], aDate[1], aDate[0]) > new Date(bDate[2], bDate[1], bDate[0])) {
      return 1;
    } else {
      return -1;
    }
  });

  return (
    <div className="chat-box">
      <div className="chat-box__user">{chatState.users[0].username === username ? chatState.users[1].username : chatState.users[0].username}</div>
      <div className="chat-box__messages" id="InfiniteScroll">
        <InfiniteScroll
          dataLength={Object.values(chatState.messages).flat().length}
          next={() => loadMessages(page)}
          hasMore={hasMore}
          scrollableTarget="InfiniteScroll"
          scrollThreshold={"1000px"}
          inverse={true}
        >
          { loader && <AiOutlineLoading className="chat-box__messages__loader" />}
          
          {
            days.map((day, dayIndex) => {
              return (
                <div key={day} style={{display: "flex", flexDirection: "column"}}>
                  <strong className="chat-box__messages__date">{day}</strong>
                  {chatState.messages[day].map((message, index) => {
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
        </InfiniteScroll>
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
