import { useState } from "react";
import { useOutlet } from "react-router-dom";
import Header from "../components/Header";
import Chat from '../components/Chat';
import ChatBox from "../components/ChatBox";
import "./ChatsPage.css"

function ChatsPage() {

  const outlet = useOutlet();

  //TODO: Cambiar esto cuando se haga llamada a API
  const [chats, setChats] = useState([
    {},
    {},
    {}
  ]);

  return (
    <>
      <Header>
      </Header>
      <main className="chat-page">
        <div className="chat-page-left">
          {chats.map((chat, index) => <Chat key={index} />)}
        </div>
        
        <div className="chat-page-right">
          {outlet || <ChatBox />}
        </div>
      </main>
    </>
  );
};

export default ChatsPage;