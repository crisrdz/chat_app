import ChatBox from "../../components/ChatBox";
import { METHOD } from "../../config/constants.js";
import { getChat, deleteChat } from "../../api/chat";
import { redirect, useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const { token } = JSON.parse(localStorage.getItem("user"));

  const data = await getChat(token, params.id);

  return data;
}

export async function action({ params, request }) {
  if (request.method === METHOD.PUT) {
    console.log(request);
  }

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
}

function ChatPage() {
  const data = useLoaderData();

  return <ChatBox hasChat={true} key={data.chat._id} />;
}

export default ChatPage;
