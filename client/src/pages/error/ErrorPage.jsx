import { Link, useRouteError } from "react-router-dom";
import Header from "../../components/structure/Header";
import Footer from "../../components/structure/Footer";
import "./ErrorPage.css";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <Header>
      </Header>
      
      <main className="main error-page">
        <div className="error-page__card">
          <h2 className="error-page__card__title">Error Page</h2>
          <p className="error-page__card__text">{error.status === 500 || error.status === 404 ? error.statusText : error.data || error.message}</p>
        </div>

        <Link to={"/"} className="error-page__btn">
          Volver al home
        </Link>
      </main>

      <Footer />
    </>
  );
}

export default ErrorPage