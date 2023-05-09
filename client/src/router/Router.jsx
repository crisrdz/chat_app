import { createBrowserRouter } from "react-router-dom";

import ChatsPage, {
  loader as chatsLoader,
  action as chatsAction,
} from "../pages/user/ChatsPage";
import ChatPage, {
  loader as chatLoader,
  action as chatAction,
} from "../pages/user/ChatPage";
import LandingPage, { loader as landingLoader } from "../pages/LandingPage";
import { action as loginAction } from "../components/modals/Login";
import { action as registerAction } from "../components/modals/Register";
import UserPage, { loader as userLoader } from "../pages/user/UserPage";
import ProfilePage, { loader as profileLoader} from "../pages/user/profile/ProfilePage";
import ViewProfile from "../pages/user/profile/ViewProfile";
import EditProfilePage, { action as actionEditProfile } from "../pages/user/profile/EditProfilePage";
import ChangeVisibilityPage, { action as actionVisibility } from "../pages/user/profile/ChangeVisibilityPage";

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
    path: "user",
    element: <UserPage />,
    loader: userLoader,
    children: [
      {
        path: "profile",
        element: <ProfilePage />,
        loader: profileLoader,
        id: "profile",
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
