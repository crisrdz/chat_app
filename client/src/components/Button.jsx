import { useParams } from "react-router-dom";
import "./Button.css";

function Button ({ onClick, customClasses = null, children }) {
  const { id } = useParams();
  return (
    <button className={`btn ${id && "btn--hidden"} ${customClasses && customClasses}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;