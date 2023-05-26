import { redirect, useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import { AiFillCaretLeft, AiFillCaretRight, AiOutlineLoading, AiOutlineReload } from "react-icons/ai";
import { getUsers } from "../../../api/user";
import Footer from "../../../components/structure/Footer";
import "./AdminPage.css";
import { useEffect, useState } from "react";

export async function loader({ request }) {
  try {
    const page = new URL(request.url).searchParams.get("page");
    const user = JSON.parse(localStorage.getItem("user"));
    let data;

    if (isNaN(page) || !page || page < 1) {
      return redirect("/user/admin?page=1");
    } else {
      data = await getUsers(user.token, page);
    }

    if(data.users.length === 0) {
      return redirect("/user/admin?page=1");
    }

    return { 
      users: data.users,
      usersQuantity: data.usersQuantity,
     };
  } catch (error) {
    if (error.status === 401) {
      throw new Error("Su sesión ha expirado.");
    }

    if (error.status === 403) {
      return redirect("/user/chats");
    }

    throw new Error("Error al obtener los usuarios");
  }
}

function AdminPage() {
  const { users, usersQuantity } = useLoaderData();
  const [usersState, setUsersState] = useState(users);
  const [usersQuantityState, setUsersQuantityState] = useState(usersQuantity)

  const url = new URL(window.location.href);
  const currentPage = url.searchParams.get("page");
  const navigate = useNavigate();

  const fetcher = useFetcher();

  function handleUpdateData() {
    fetcher.load(`/user/admin?page=${currentPage}`);
  }

  useEffect(() => {
    if(fetcher.data) {
      setUsersState(fetcher.data.users);
      setUsersQuantityState(fetcher.data.usersQuantity);
    }
  }, [fetcher]);

  return (
    <>
      <main className="main-admin">
        <h2 className="title">Admin</h2>
        <div className="reload-container">
          <div className="reload-container__box">
            {fetcher.state === "loading" ? 
              <AiOutlineLoading className="reload-container__box__btn reload-container__box__btn--loading"/>
            : (
              <AiOutlineReload onClick={handleUpdateData} className="reload-container__box__btn"/>
            )}
          </div>
        </div>
        <div className="table-container">
          <table className="table-container__table">
            <thead className="table-container__table__thead">
              <tr>
                <th className="table-container__table__row__cell">
                  Nombre de usuario
                </th>
                <th className="table-container__table__row__cell">
                  Correo electrónico
                </th>
                <th className="table-container__table__row__cell">
                  Cantidad de amigos
                </th>
                <th className="table-container__table__row__cell">
                  Roles
                </th>
                <th className="table-container__table__row__cell">
                  Visibilidad
                </th>
                <th className="table-container__table__row__cell">
                  Fecha de creación
                </th>
              </tr>
            </thead>
            <tbody className="table-container__table__thead">
              {usersState.map((user) => (
                <tr key={user.username} className="table-container__table__row">
                  <td className="table-container__table__row__cell">
                    {user.username}
                  </td>
                  <td className="table-container__table__row__cell">
                    {user.email}
                  </td>
                  <td className="table-container__table__row__cell">
                    {user.friends.length}
                  </td>
                  <td className="table-container__table__row__cell">
                    {user.roles.map((role) => role.role).join(" - ")}
                  </td>
                  <td className="table-container__table__row__cell">
                    {user.isPublic ? "Pública" : "Privada"}
                  </td>
                  <td className="table-container__table__row__cell">
                    {new Date(user.createdAt).toLocaleString(undefined, {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pages">
            {currentPage > 1 ? (
              <AiFillCaretLeft
                className="pages__option"
                onClick={() => navigate(`?page=${currentPage - 1}`)}
              />
            ) : (
              <div className="pages__option pages__option--hidden"></div>
            )}
            <div className="pages__option pages__option-page">
              {currentPage}
            </div>
            {
              usersQuantityState / 10 > currentPage ? (
                <AiFillCaretRight
                  className="pages__option"
                  onClick={() => navigate(`?page=${currentPage + 1}`)}
                />
              ) : (
                <div className="pages__option pages__option--hidden"></div>
              )
            }
          </div>
      </main>
      <Footer />
    </>
  );
}

export default AdminPage;
