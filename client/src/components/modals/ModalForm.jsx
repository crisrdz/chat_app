import { Form, useNavigate, useNavigation } from "react-router-dom";
import { AiFillCloseSquare, AiOutlineLoading } from "react-icons/ai";
import "./Modal.css";

function ModalForm({ children, submit, action, setShow = null }) {
  const navigate = useNavigate();
  const navigation = useNavigation();

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


      {
        navigation.state !== "idle" ? (
          <div className="modal__btn-submit">
            <AiOutlineLoading className="default-loading" />
          </div>
        ) : (
          <button type="submit" className="modal__btn-submit">
            {submit}
          </button>
        )
      }
    </Form>
  );
}

export default ModalForm;
