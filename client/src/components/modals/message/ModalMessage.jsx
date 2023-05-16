import "./ModalMessage.css";

function ModalMessage({ children, show = false, hide = false, error = false }) {
  return (
    <div className={`modal-msg ${show && "modal-msg--show"} ${hide && "modal-msg--hide"} ${error && "modal-msg--error"}`}>
      {children}
    </div>
  )
}

export default ModalMessage;