import { useEffect, useState } from "react";
import {
  Outlet,
  redirect,
  useActionData,
  useLoaderData,
  useOutlet,
} from "react-router-dom";
import { getChats } from "../../../api/chat";
import { createChat } from "../../../api/chat";
import { socket } from '../../../socket';
import Chat from "../../../components/Chat";
import ModalFriends from "../../../components/modals/friends/ModalFriends";
import ModalNewChat from "../../../components/modals/newchats/ModalNewChat";
import Button from "../../../components/Button";
import ChatBox from "../../../components/ChatBox";
import "./ChatsPage.css";

export async function loader() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const data = await getChats(user.token);

    return {
      data,
      user,
    };
  } catch (error) {
    if (error.status === 401) {
      localStorage.removeItem("user");
      throw new Error("Su sesión ha expirado");
    }

    throw new Error("Error al obtener los chats");
  }
}

export async function action({ request }) {
  try {
    if (request.method === "POST") {
      const user = JSON.parse(localStorage.getItem("user"));

      const formData = await request.formData();

      const chat = await createChat(user.token, formData.get("user"));

      return chat;
    }

    return null;
  } catch (error) {
    return null;
  }
}

function ChatsPage() {
  const outlet = useOutlet();
  const { data, user } = useLoaderData();
  const action = useActionData();

  const [chats, setChats] = useState(data.chats);
  const [showNewChat, setShowNewChat] = useState(false);
  const [showFriends, setShowFriends] = useState(false);

  useEffect(() => {
    setChats(data.chats);
  }, [data]);

  useEffect(() => {
    setShowNewChat(false);
    setChats(data.chats);
  }, [action]);

  useEffect(() => {
    socket.emit("client:joinchats", chats);

    socket.on("server:newmessage", replaceChats);

    return () => {
      socket.off("server:newmessage", replaceChats);
    };
  }, []);

  useEffect(() => {
    const newChat = (chat) => {
      setChats([chat, ...chats]);
    };

    const deleteChat = (chatId) => {
      const chatsCopy = [...chats];

      setChats(chatsCopy.filter((chat) => chat._id !== chatId));
    };

    socket.on("server:newchat", newChat);
    socket.on("server:deletechat", deleteChat);

    return () => {
      socket.off("server:newchat", newChat);
      socket.off("server:deletechat", deleteChat);
    };
  }, [chats]);

  const replaceChats = (message) => {
    const chatsCopy = [...chats];

    const chat = chatsCopy.find((chat, i) => {
      if (chat._id === message.chat) {
        chatsCopy.splice(i, 1);
        return true;
      }
    });

    chat.messages = [
      {
        body: message.body,
        createdAt: message.createdAt,
        user: message.user
      },
    ];

    chatsCopy.unshift(chat);
    setChats(chatsCopy);
  };

  function handleOpenModalChat() {
    setShowNewChat((prev) => !prev);
  }

  function handleOpenModalFriends() {
    setShowFriends((prev) => !prev);
  }

  return (
    <>
      <main className="chat-page">
        <div className="chat-page-left">
          <div className="chat-page-left__chats">
            {chats.length === 0 ? (
              <p style={{textAlign: "center", fontSize: "2rem"}}>¡No tienes chats!</p>
            ) : (
              chats.map((chat, index) => <Chat key={index} chat={chat} />)
            )}
          </div>
          <div className="chat-page-left__new-chat-btn">
            <Button
              onClick={handleOpenModalChat}
              customClasses="btn-color-violet"
            >
              Nuevo Chat
            </Button>
            <Button
              onClick={handleOpenModalFriends}
              customClasses="btn-color-green"
            >
              Amigos
            </Button>
          </div>
        </div>

        {showNewChat && <ModalNewChat setShow={setShowNewChat} chats={chats}/>}
        {showFriends && <ModalFriends setShow={setShowFriends} />}

        <div className="chat-page-right">
          {outlet ? (
            <Outlet context={replaceChats} />
          ) : (
            <ChatBox key={"default"} />
          )}
        </div>
      </main>
    </>
  );
}

export default ChatsPage;
