import { createBrowserRouter } from "react-router-dom";

import ChatsPage, { loader as chatsLoader, action as chatsAction } from "../pages/ChatsPage";
import ChatPage, { loader as chatLoader, action as chatAction } from "../pages/ChatPage";
import LandingPage, { loader as landingLoader } from "../pages/LandingPage";
import { action as loginAction } from "../components/modals/Login";
import { action as registerAction } from "../components/modals/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    loader: landingLoader,
    children: [
      {
        path: "login",
        action: loginAction,
      },
      {
        path: "register",
        action: registerAction,
      },
    ],
  },
  {
    path: "/chats",
    element: <ChatsPage />,
    loader: chatsLoader,
    action: chatsAction,
    children: [
      {
        path: ":id",
        element: <ChatPage />,
        loader: chatLoader,
        action: chatAction,
      }
    ],
  },
]);

export default router;
