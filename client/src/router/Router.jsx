import { createBrowserRouter } from "react-router-dom";

// Home pages
import LandingPage from "../pages/home/LandingPage";
import { action as loginAction } from "../components/modals/Login";
import { action as registerAction } from "../components/modals/Register";

// User pages
import UserPage, { loader as userLoader } from "../pages/user/UserPage";

import ProfilePage from "../pages/user/profile/ProfilePage";
import ViewProfile from "../pages/user/profile/ViewProfile";
import EditProfilePage, { action as actionEditProfile } from "../pages/user/profile/EditProfilePage";
import ChangeVisibilityPage, { action as actionVisibility } from "../pages/user/profile/ChangeVisibilityPage";

import ChatsPage, {
  loader as chatsLoader,
  action as chatsAction,
} from "../pages/user/chat/ChatsPage";
import ChatPage, {
  loader as chatLoader,
  action as chatAction,
} from "../pages/user/chat/ChatPage";

// Error page
import ErrorPage from "../pages/error/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LandingPage />,
        action: loginAction,
      },
      {
        path: "register",
        element: <LandingPage />,
        action: registerAction,
      },
    ],
  },
  {
    path: "user",
    element: <UserPage />,
    errorElement: <ErrorPage />,
    loader: userLoader,
    id: "user",
    children: [
      {
        path: "profile",
        element: <ProfilePage />,
        children: [
          {
            index: true,
            element: <ViewProfile />
          },
          {
            path: "edit",
            action: actionEditProfile,
            element: <EditProfilePage />
          },
          {
            path: "visibility",
            action: actionVisibility,
            element: <ChangeVisibilityPage />
          },
        ]
      },
      {
        path: "chats",
        element: <ChatsPage />,
        loader: chatsLoader,
        action: chatsAction,
        children: [
          {
            path: ":id",
            element: <ChatPage />,
            loader: chatLoader,
            action: chatAction,
          },
        ],
      },
    ],
  },
]);

export default router;
