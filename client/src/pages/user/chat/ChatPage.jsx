import { useEffect } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import ChatBox from "../../../components/ChatBox";
import { getChat, deleteChat } from "../../../api/chat";
import { socket } from "../../../socket";

export async function loader({ params }) {
  try {
    const { token } = JSON.parse(localStorage.getItem("user"));

    const data = await getChat(token, params.id, 1);
    const messages = {};
    data.chat.messages.forEach(message => {
      message.createdAt = new Date(message.createdAt);
      const date = message.createdAt.toLocaleDateString();
      
      if(!messages.hasOwnProperty(date)) {
        messages[date] = [];
      }
      messages[date].unshift(message);
    });

    data.chat.messages = messages;
    return data;
  } catch (error) {
    if (error.status === 400) {
      return redirect("/user/chats");
    }

    if (error.status === 401) {
      localStorage.removeItem("user");
      throw new Error("Su sesión ha expirado");
    }

    throw new Error("Error al obtener el chat");
  }
}

export async function action({ params, request }) {
  try {
    if (request.method === "DELETE") {
      const { token } = JSON.parse(localStorage.getItem("user"));
  
      await deleteChat(token, params.id);
  
      const formData = await request.formData();
      const id = formData.get("id");
  
      if (id && id !== params.id) {
        return redirect(`/user/chats/${id}`);
      }
  
      return redirect("/user/chats");
    }
  
    return null;
  } catch (error) {
    throw new Error("Error al eliminar el chat");
  }
}

function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteChat = (chatId) => {
      if(chatId === id) {
        navigate("/user/chats");
      }
    };

    socket.on("server:deletechat", deleteChat);

    return () => {
      socket.off("server:deletechat", deleteChat);
    };
  }, []);

  return <ChatBox hasChat={true} key={id} />;
}

export default ChatPage;
