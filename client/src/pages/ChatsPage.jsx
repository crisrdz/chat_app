import { useEffect, useState } from "react";
import { Outlet, redirect, useActionData, useLoaderData, useOutlet } from "react-router-dom";
import Header from "../components/structure/Header";
import Chat from "../components/Chat";
import ChatBox from "../components/ChatBox";
import { getChats } from "../api/chat";
import "./ChatsPage.css";
import NewChat from "../components/NewChat";
import ModalNewChat from "../components/modals/ModalNewChat";
import { createChat } from "../api/chat";
import { socket } from '../socket'

export async function loader() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const data = await getChats(user.token);

    return data;
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
  const data = useLoaderData();
  const action = useActionData();

  const [chats, setChats] = useState(data.chats);
  const [show, setShow] = useState(false)

  useEffect(() => {
    setChats(data.chats);
  }, [data]);

  useEffect(() => {
    setShow(false);
    setChats(data.chats);
  }, [action])

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      socket.emit("client:joinchats", chats);
    });

    socket.on("server:newmessage", replaceChats);

    return () => {
      socket.off("server:newmessage", replaceChats);
    };
  }, []);

  const replaceChats = (message) => {
    const chatsCopy = [...chats];
    
    const chat = chatsCopy.find((chat, i) => {
      if (chat._id === message.chat) {
        chatsCopy.splice(i, 1);
        return true;
      }
    });

    chat.messages = [{
      body: message.body
    }];
    
    chatsCopy.unshift(chat);
    console.log(chatsCopy);
    setChats(chatsCopy);
  };

  function handleOpenModal() {
    setShow(prev => !prev);
  }

  return (
    <>
      <Header></Header>
      <main className="chat-page">
        <div className="chat-page-left">
          <div>
            {chats.map((chat, index) => (
              <Chat key={index} chat={chat} />
            ))}
          </div>
          <div className="chat-page-left__new-chat-btn">
            <NewChat onClick={handleOpenModal} />
          </div>
        </div>

        {
          show && <ModalNewChat setShow={setShow}/>
        }

        <div className="chat-page-right">
          {outlet ? <Outlet context={{ socket, replaceChats }} /> : <ChatBox key={"default"} />}
        </div>
      </main>
    </>
  );
}

export default ChatsPage;
