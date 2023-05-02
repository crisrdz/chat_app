import { useState } from "react";
import ChatBox from "../components/ChatBox";
import { METHOD } from "../config/constants.js";
import { getChat } from "../api/chat";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const token = localStorage.getItem("token");

  const { data } = await getChat(token, params.id);

  console.log(data);

  return data;
}

export async function action({ request }) {
  if (request.method === METHOD.PUT) {
    console.log(request);
  }

  return null;
}

function ChatPage() {
  const data = useLoaderData();
  const userId = data.userId;
  const messages = [];

  data.chat.messages.forEach((message) => {
    const mine = message.user === userId ? true : false;
    messages.unshift({ message: message.body, mine });
  });

  const username = data.chat.users.find(user => user.id !== userId).username;

  const [chat, setChat] = useState({
    user: username,
    messages
  });

  console.log(chat);

  return <ChatBox chatState={{ chat, setChat }} />;
}

export default ChatPage;
