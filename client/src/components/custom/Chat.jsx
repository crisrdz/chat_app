import { useEffect, useRef, useState } from 'react';
import { Form, useNavigate, useParams, useSubmit } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'
import ModalConfirmation from '../modals/ModalConfirmation';
import './Chat.css';

function Chat({chat}) {
  const { username } = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const formDeleteRef = useRef(null);
  const submit = useSubmit();
  const [showMenu, setShowMenu] = useState(false);
  const [modalConfirm, setModalConfirm] = useState({
    show: false,
    question: ""
  });

  let dateLastMessage;
  if(chat.messages.length > 0) {
    dateLastMessage = new Date(chat.messages[0].createdAt);
    
    if(dateLastMessage.toLocaleDateString() === new Date().toLocaleDateString()) {
      dateLastMessage = dateLastMessage.toLocaleTimeString(undefined, {timeStyle: "short"});
    } else {
      dateLastMessage = dateLastMessage.toLocaleDateString(undefined, {dateStyle: "short"});
    }
  }
  
  const navigate = useNavigate();

  const friendUsername = chat.users[0].username === username ? chat.users[1].username : chat.users[0].username;

  function handleClick() {
    navigate(`${chat._id}`);
  }

  function handleOpenMenu (e) {
    e.stopPropagation();
    setShowMenu(prev => !prev);
  }

  useEffect(() => {
    setShowMenu(false);
  }, [chat])

  return (
    <>
      <div className={`chat ${id && "chat--hidden"}`} onClick={handleClick}>
        <div className='chat__section chat__left'>
          <div className="chat__left__user-image">
            { friendUsername[0] }
          </div>
        </div>
        <div className='chat__section chat__center'>
          <h6 className='chat__center__item chat__center__username'>
            { friendUsername }
          </h6>
          <div className='chat__center__msg-container'>
            <p className={`chat__center__item chat__center__msg-container__last-msg ${chat.messages[0]?.user.username !== username && "chat__center__msg-container__last-msg--yours"}`}>{ chat.messages.length > 0 ? chat.messages[0].body : "" }</p>
            <small className='chat__center__msg-container__date'>{ dateLastMessage }</small>
          </div>
        </div>
        <div className='chat__section chat__right'>
          <button className='chat__right__btn-menu' onClick={handleOpenMenu}>
            <AiOutlineMenu />
          </button>
          {showMenu && (
            <div className="chat__right__menu">
              <Form action={`/user/chats/${chat._id}`} method='DELETE' ref={formDeleteRef}>
                {
                  id && (
                    <input type="hidden" name="id" value={id} readOnly />
                  )
                }
                <button type="button" className='chat__right__menu__item' onClick={(e) => {
                  e.stopPropagation();
                  setModalConfirm({
                    show: true,
                    question: "¿Estás seguro de eliminar este chat?",
                    onConfirm: () => {
                      submit(formDeleteRef.current, {
                        method: "DELETE"
                      });
                      setModalConfirm({
                        show: false,
                        question: "",
                      });
                    },
                    onCancel: () => {
                      setModalConfirm({
                        show: false,
                        question: "",
                      });
                    }
                  })
                }}>Eliminar chat</button>
              </Form>
            </div>
          )}
        </div>
      </div>
      {modalConfirm?.show && <ModalConfirmation question={modalConfirm.question} onConfirm={modalConfirm.onConfirm} onCancel={modalConfirm.onCancel} />}
    </>
  )
}

export default Chat