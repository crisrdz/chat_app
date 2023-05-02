import { useNavigate } from 'react-router-dom'
import './Chat.css';

function Chat({chat, userId}) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`${chat._id}`)
  }

  const user = chat.users.find(user => user._id !== userId);

  return (
    <div className='chat' onClick={handleClick}>
      <div className='chat__left'>
        <div className="chat__left__user-image">
          {user.username[0]}
        </div>
      </div>
      <div className='chat__right'>
        <h6 className='chat__right__item chat__right__username'>
          {user.username}
        </h6>
        <p className='chat__right__item chat__right__last-message'>
          {chat.messages ? chat.messages[0] : ""}
        </p>
      </div>
    </div>
  )
}

export default Chat