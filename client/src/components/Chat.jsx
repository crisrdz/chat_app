import { useNavigate } from 'react-router-dom'
import './Chat.css';

function Chat({chat}) {
  const navigate = useNavigate();

  //TODO: ELiminar esto
  if(!chat) {
    chat = {
      id: 1,
      username: "Cristofer",
      messages: [
        "Hola",
        "Q tal"
      ]
    };
  };

  function handleClick() {
    navigate(`${chat.id}`)
  }

  return (
    <div className='chat' onClick={handleClick}>
      <div className='chat__left'>
        <div className="chat__left__user-image">
          {chat.username[0]}
        </div>
      </div>
      <div className='chat__right'>
        <h6 className='chat__right__item chat__right__username'>
          {chat.username}
        </h6>
        <p className='chat__right__item chat__right__last-message'>
          {chat.messages[0]}
        </p>
      </div>
    </div>
  )
}

export default Chat