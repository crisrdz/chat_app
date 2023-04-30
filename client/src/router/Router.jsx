import {createBrowserRouter} from 'react-router-dom';

import ChatsPage from '../pages/ChatsPage';
import ChatPage, {action as chatAction} from '../pages/ChatPage'
import LandingPage from '../pages/LandingPage';

const router = createBrowserRouter([
  {
    index: true,
    element: <LandingPage />
  },
  {
    path: "chats",
    element: <ChatsPage />,
    children: [
      {
        path: ":id",
        element: <ChatPage />,
        action: chatAction,
      }
    ]
  }
]);

export default router;