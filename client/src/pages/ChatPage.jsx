import { useState } from "react";
import ChatBox from "../components/ChatBox";
import {METHOD} from '../config/constants.js'

export async function action ({request}) {
  if(request.method === METHOD.PUT) {
    console.log(request);
  }
  
  return null;
}

function ChatPage() {

  //TODO: Hacer petición a API
  const [chat, setChat] = useState({
    user: "Cristofer",
    messages: [
      {message: "¿Todo bien?", mine: true},
      {message: "¿Qué tal?", mine: true},
      {message: "Hola", mine: false},
      {message: "Hola", mine: true},
    ]
  });

  return (
    <ChatBox chatState={{chat, setChat}} />
  )
}

export default ChatPage