import { useState } from "react";
import Header from "../components/structure/Header";
import Footer from "../components/structure/Footer";
import NavbarMenu from "../components/structure/NavbarMenu";
import Login from "../components/modals/Login";
import "./LandingPage.css";
import { useLoaderData } from "react-router-dom";
import Register from "../components/modals/Register";

export function loader() {
  return localStorage.getItem("token");
}

function LandingPage() {
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const isLogged = useLoaderData();

  return (
    <>
      <Header>
        <NavbarMenu
          setShowSignin={setShowSignin}
          setShowSignup={setShowSignup}
          isLogged={isLogged}
        />
      </Header>
      
      <main className="main">LandingPage</main>

      {showSignin && (
        <section>
          <Login show={showSignin} setShow={setShowSignin} />
        </section>
      )}

      {showSignup && (
        <section>
          <Register show={showSignup} setShow={setShowSignup} />
        </section>
      )}

      <Footer />
    </>
  );
}

export default LandingPage;
