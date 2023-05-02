import { useState } from "react";
import { useLoaderData, useOutlet } from "react-router-dom";
import Header from "../components/structure/Header";
import Chat from "../components/Chat";
import ChatBox from "../components/ChatBox";
import { getChats } from "../api/chat";
import "./ChatsPage.css";

export async function loader() {
  try {
    const token = localStorage.getItem("token");
    const data = await getChats(token);

    return data.data;
  } catch (error) {
    throw new Error(error);
  }
}

function ChatsPage() {
  const outlet = useOutlet();

  const data = useLoaderData();
  const [chats, setChats] = useState(data.chats);
  const userId = data.userId;

  return (
    <>
      <Header></Header>
      <main className="chat-page">
        <div className="chat-page-left">
          {chats.map((chat, index) => (
            <Chat key={index} chat={chat} userId={userId} />
          ))}
        </div>

        <div className="chat-page-right">{outlet || <ChatBox />}</div>
      </main>
    </>
  );
}

export default ChatsPage;
