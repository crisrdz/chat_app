import { useRouteError } from "react-router-dom";
import Header from "../../components/structure/Header";
import Footer from "../../components/structure/Footer";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <Header>
      </Header>
      
      <main className="main">
        <h2>Error Page</h2>
        <p>{error.status === 500 ? error.statusText : error.data || error.message}</p>
      </main>

      <Footer />
    </>
  );
}

export default ErrorPage