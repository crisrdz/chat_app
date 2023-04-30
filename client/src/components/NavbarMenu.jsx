import { NavLink } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import { useState } from 'react';
import "./NavbarMenu.css";

function NavbarMenu() {
  const [showMenu, setShowMenu] = useState(false);

  /* let user; */
  const user = {
    id: 1,
    email: "cristofer@rodríguez"
  };

  function handleMenu() {
    setShowMenu(prev => !prev);
  };

  return (
    <div className='navbar__section'>
      <button className='navbar__section__btn-menu' onClick={handleMenu}><HiMenu /></button>
      <ul className={`navbar__list navbar__list__menu ${showMenu && 'navbar__list__menu--show'}`}>
        {!user ?
          <> 
            <li className='navbar__list__link navbar__list__link--menu'>Iniciar sesión</li>
            <li className='navbar__list__link navbar__list__link--menu'>Registrarse</li>
          </>
          :
          <> 
            <NavLink to="/chats" className='navbar__list__link navbar__list__link--menu'>Chats</NavLink>
            <li className='navbar__list__link navbar__list__link--menu'>Cerrar sesión</li>
          </>
        }
      </ul>
    </div>
  )
}

export default NavbarMenu;
