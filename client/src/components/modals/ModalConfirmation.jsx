import "./Modal.css";

function ModalConfirmation({question, onConfirm, onCancel}) {

  return (
    <div className="modal modal-confirmation">
      <h2 className="modal-confirmation__question">{question}</h2>
      <div className="modal-confirmation__btn-container">
        <button className="modal-confirmation__btn-container__btn modal-confirmation__btn-container__btn-confirm" onClick={onConfirm}>Confirmar</button>
        <button className="modal-confirmation__btn-container__btn modal-confirmation__btn-container__btn-cancel" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  )
}

export default ModalConfirmation