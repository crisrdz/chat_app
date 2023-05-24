import { useEffect, useState } from "react";
import {
  Outlet,
  useActionData,
  useLoaderData,
  useOutlet,
} from "react-router-dom";
import { useModalMessage } from "../../../hooks/modalHooks";
import { getChats } from "../../../api/chat";
import { createChat } from "../../../api/chat";
import { socket } from '../../../socket';
import ModalFriends from "../../../components/modals/friends/ModalFriends";
import ModalNewChat from "../../../components/modals/newchats/ModalNewChat";
import ModalMessage from "../../../components/modals/message/ModalMessage";
import Chat from "../../../components/custom/Chat";
import Button from "../../../components/custom/Button";
import ChatBox from "../../../components/custom/ChatBox";
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
    if (error.status === 401) {
      localStorage.removeItem("user");
      throw new Error("Su sesión ha expirado");
    }

    throw new Error("Error al crear chat");
  }
}

function ChatsPage() {
  const outlet = useOutlet();
  const { data, user } = useLoaderData();
  const action = useActionData();

  const [chats, setChats] = useState(data.chats);
  const [showNewChat, setShowNewChat] = useState(false);
  const [showFriends, setShowFriends] = useState(false);

  const { modalMessage, showModalMessage } = useModalMessage();

  useEffect(() => {
    setChats(prev => {
      if(prev.length > data.chats.length) {
        showModalMessage("¡El chat ha sido eliminado con éxito!", true);
      }
      return data.chats
    });
  }, [data]);

  useEffect(() => {
    setShowNewChat(false);
    setChats(data.chats);

    if(action?.chat) {
      showModalMessage(`¡Un nuevo chat con ${action.chat.users[0].username === action.chat.username ? action.chat.users[0].username : action.chat.users[1].username} ha sido creado!`);
    }
  }, [action]);

  useEffect(() => {
    const newChat = (chat) => {
      setChats([chat, ...chats]);
      showModalMessage(`¡Un nuevo chat con ${chat.users[0].username !== user.username ? chat.users[0].username : chat.users[1].username} ha sido creado!`);
    };

    const deleteChat = (chatId) => {
      const chatsCopy = [...chats];
      showModalMessage("Un chat ha sido eliminado", true);

      setChats(chatsCopy.filter((chat) => chat._id !== chatId));
    };

    socket.emit("client:joinchats", chats);
    socket.on("server:newchat", newChat);
    socket.on("server:deletechat", deleteChat);
    socket.on("server:newmessage", replaceChats);

    return () => {
      socket.off("server:newchat", newChat);
      socket.off("server:deletechat", deleteChat);
      socket.off("server:newmessage", replaceChats);
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
      
      <ModalMessage key={"chat"} show={modalMessage?.show} hide={modalMessage?.hide} error={modalMessage?.error}>{modalMessage?.message}</ModalMessage>
    </>
  );
}

export default ChatsPage;
