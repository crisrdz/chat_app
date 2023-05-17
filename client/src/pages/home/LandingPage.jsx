import { useState } from "react";
import Header from "../../components/structure/Header";
import Footer from "../../components/structure/Footer";
import NavbarMenu from "../../components/structure/NavbarMenu";
import Register from "../../components/modals/Register";
import Login from "../../components/modals/Login";
import "./LandingPage.css";

function LandingPage() {
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLogged, setIsLogged] = useState(!!JSON.parse(localStorage.getItem("user")));

  return (
    <>
      <Header>
        <NavbarMenu
          setShowSignin={setShowSignin}
          setShowSignup={setShowSignup}
          isLogged={isLogged}
          setIsLogged={setIsLogged}
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
