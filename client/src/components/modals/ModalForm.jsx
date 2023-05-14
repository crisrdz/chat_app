import { Form, useNavigate } from "react-router-dom";
import { AiFillCloseSquare } from "react-icons/ai";
import "./Modal.css";

function ModalForm({ children, submit, action, setShow = null }) {
  const navigate = useNavigate();
  return (
    <Form method="POST" action={action} className="modal">

      <AiFillCloseSquare
        className="modal__btn-close"
        onClick={() => {
          setShow(false)
          if(action === "login" || action === "register"){
            navigate("/");
          }
        }}
      />

      {children}

      <button type="submit" className="modal__btn-submit">
        {submit}
      </button>
    </Form>
  );
}

export default ModalForm;
