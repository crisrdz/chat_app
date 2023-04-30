import "./Footer.css";
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai'

function Footer() {
  return (
    <footer className="footer">
      <ul className="footer__content-list">
        <li className="footer__content-list__item">Cristofer Rodríguez Elgueta</li>
        <li className="footer__content-list__item">Desarrollador web</li>
        <li className="footer__content-list__item">
          <a href="https://www.linkedin.com/in/cristofer-rodriguez-a49275254/" target="_blank" className="footer__content-list__link"><AiFillLinkedin /></a> 
          <a href="https://github.com/crisrdz" target="_blank" className="footer__content-list__link"><AiFillGithub/></a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
