import { NavLink } from 'react-router-dom';
import './Header.css';

function Header ({children}) {
  return (
    <header className='header'>
      <nav className="navbar">
        <div className='navbar__section'>
          <ul className='navbar__list'>
            <NavLink to="/" className='navbar__list__link'>ChatApp</NavLink>
          </ul>
        </div>
        {children}
      </nav>
    </header>
  );
};

export default Header;