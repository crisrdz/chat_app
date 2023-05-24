import { useEffect, useState } from "react";
import { AiFillCloseSquare, AiOutlineLoading, AiOutlineReload } from "react-icons/ai";
import { deleteFriend } from "../../../api/friends";
import ModalConfirmation from "../ModalConfirmation";
import "../Tabs.css";

function TabFriends({ className, friends, searchFriends, errorState, loadingFriends}) {
  const [loading, setLoading] = useState(false);
  const [modalConfirm, setModalConfirm] = useState({
    show: false,
    question: "",
  });
  const { error, setError } = errorState;

  if (error) {
    return (
      <p className={className ? className : ""} style={{ color: "red" }}>
        {error}
      </p>
    );
  }

  useEffect(() => {
    searchFriends();
  }, []);

  async function handleDeleteFriend(username) {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      await deleteFriend(token, username);

      await searchFriends();
      setError(null);
    } catch (error) {
      setError("Error al eliminar amigo");
    }
  }

  return (
    <>
      <table className={`tab__table ${className ? className : ""}`}>
        <thead>
          <tr>
            <th className="tab__table__td">Nombre de usuario</th>
            <th className="tab__table__td">Eliminar amigo</th>
          </tr>
        </thead>
        <tbody>
          {friends &&
            friends.map((friend) => (
              <tr key={friend.username}>
                <td className="tab__table__td">{friend.username}</td>
                <td className="tab__table__td">
                  {loadingFriends ? (
                    <AiOutlineLoading className="default-loading"/>
                  ): (
                    <button
                      type="submit"
                      className="tab__table__td__btn"
                      onClick={() => {
                        setModalConfirm({
                          show: true,
                          question: `¿Estás seguro de eliminar a ${friend.username} de tus amigos?`,
                          onConfirm: () => {
                            handleDeleteFriend(friend.username);
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
                          },
                        });
                      }}
                    >
                      <AiFillCloseSquare className="tab__table__td__btn__icon" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className={`tab__reload-container ${className ? className : ""}`}>
        {loading ? 
          <AiOutlineLoading className="tab__reload-container__btn tab__reload-container__btn--loading"/>
        : (
          <AiOutlineReload onClick={() => {
            setLoading(true);
            searchFriends().then(() => setLoading(false));
          }} className="tab__reload-container__btn"/>
        )}
      </div>
      {modalConfirm?.show && (
        <ModalConfirmation
          question={modalConfirm.question}
          onConfirm={modalConfirm.onConfirm}
          onCancel={modalConfirm.onCancel}
        />
      )}
    </>
  );
}

export default TabFriends;
