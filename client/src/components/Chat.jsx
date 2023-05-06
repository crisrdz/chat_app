import { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'
import './Chat.css';

function Chat({chat, userId}) {
  const { username } = JSON.parse(localStorage.getItem("user"));
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate();

  const friendUsername = chat.users[0].username === username ? chat.users[1].username : chat.users[0].username;

  function handleClick() {
    navigate(`${chat._id}`)
  }

  function handleOpenMenu (e) {
    e.stopPropagation();
    setShowMenu(prev => !prev)
  }

  const user = chat.users[0];

  return (
    <div className='chat' onClick={handleClick}>
      <div className='chat__left'>
        <div className="chat__left__user-image">
          { friendUsername[0] }
        </div>
      </div>
      <div className='chat__center'>
        <h6 className='chat__center__item chat__center__username'>
          { friendUsername }
        </h6>
        <p className='chat__center__item chat__center__last-message'>
          { chat.messages.length > 0 ? chat.messages[0].body : "" }
        </p>
      </div>
      <div className='chat__right'>
        <button className='chat__right__btn-menu' onClick={handleOpenMenu}>
          <AiOutlineMenu />
        </button>
        {showMenu && (
          <div className="chat__right__menu">
            <Form action={`/chats/${chat._id}`} method='DELETE' >
              <button type="submit" className='chat__right__menu__item'>Eliminar chat</button>
            </Form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Chat