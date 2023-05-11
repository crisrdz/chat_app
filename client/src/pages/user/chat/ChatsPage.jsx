import { useEffect, useState } from "react";
import { Outlet, redirect, useActionData, useLoaderData, useOutlet } from "react-router-dom";
import Chat from "../../../components/Chat";
import ChatBox from "../../../components/ChatBox";
import { getChats } from "../../../api/chat";
import "./ChatsPage.css";
import Button from "../../../components/Button";
import ModalNewChat from "../../../components/modals/ModalNewChat";
import { createChat } from "../../../api/chat";
import { socket } from '../../../socket'
import ModalFriends from "../../../components/modals/friends/ModalFriends";

export async function loader() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const data = await getChats(user.token);

    return {
      data,
      user
    };
  } catch (error) {
    if(error.status == 401) {
      localStorage.removeItem("user");
      return redirect("/");
    }

    throw new Error("Error al obtener los chats");
  }
}

export async function action({ request }) {
  try {
    if(request.method === "POST"){
      const user = JSON.parse(localStorage.getItem("user"));

      const formData = await request.formData();

      const chat = await createChat(user.token, formData.get("user"))

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
  const [showNewChat, setShowNewChat] = useState(false)
  const [showFriends, setShowFriends] = useState(false)

  useEffect(() => {
    setChats(data.chats);
  }, [data]);

  useEffect(() => {
    setShowNewChat(false);
    setChats(data.chats);
  }, [action])

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      socket.emit("client:joinchats", chats);
      socket.emit("client:joinuser", user.token);
    });

    socket.on("server:newmessage", replaceChats);

    return () => {
      socket.off("server:newmessage", replaceChats);
    };
  }, []);

  useEffect(() => {
    const newChat = (chat) => {
      setChats([chat, ...chats]);
    }

    const deleteChat = (chatId) => {
      const chatsCopy = [...chats];

      setChats(chatsCopy.filter(chat => chat._id !== chatId));
    }

    socket.on("server:newchat", newChat);
    socket.on("server:deletechat", deleteChat);

    return () => {
      socket.off("server:newchat", newChat);
      socket.off("server:deletechat", deleteChat);
    }
  }, [chats])

  const replaceChats = (message) => {
    const chatsCopy = [...chats];
    
    const chat = chatsCopy.find((chat, i) => {
      if (chat._id === message.chat) {
        chatsCopy.splice(i, 1);
        return true;
      }
    });

    chat.messages = [{
      body: message.body,
    }];
    
    chatsCopy.unshift(chat);
    setChats(chatsCopy);
  };

  function handleOpenModalChat() {
    setShowNewChat(prev => !prev);
  }

  function handleOpenModalFriends() {
    setShowFriends(prev => !prev);
  }

  return (
    <>
      <main className="chat-page">
        <div className="chat-page-left">
          <div className="chat-page-left__chats">
            {chats.map((chat, index) => (
              <Chat key={index} chat={chat} />
            ))}
          </div>
          <div className="chat-page-left__new-chat-btn">
            <Button onClick={handleOpenModalChat} customClasses="btn-color-violet">
              Nuevo Chat
            </Button>
            <Button onClick={handleOpenModalFriends} customClasses="btn-color-green">
              Amigos
            </Button>
          </div>
        </div>

        {
          showNewChat && <ModalNewChat setShow={setShowNewChat}/>
        }
        {
          showFriends && <ModalFriends setShow={setShowFriends}/>
        }

        <div className="chat-page-right">
          {outlet ? <Outlet context={{ socket, replaceChats }} /> : <ChatBox key={"default"} />}
        </div>
      </main>
    </>
  );
}

export default ChatsPage;
