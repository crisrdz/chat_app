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
      
      <main className="main">
        <div className="sections">
          <section className="sections__section">
            <h4 className="sections__section__title">ChatApp</h4>
            <p>ChatApp es una plataforma de mensajería <strong>completamente funcional</strong> para que puedas chatear con quien tú quieras.</p>
          </section>
          <section className="sections__section">
            <h4 className="sections__section__title">Amigos</h4>
            <p>Tiene integrado un sistema de amigos para que puedas añadir y eliminar en cualquier momento a otros usuarios. ¡Podrás tener hasta <strong>50 amigos agregados</strong>!</p>
          </section>
          <section className="sections__section">
            <h4 className="sections__section__title">Visibilidad</h4>
            <p>Una de las características principales es el hecho de poder configurar la visibilidad de tu cuenta con <strong>dos posibles opciones: pública y privada</strong>. Con la visibilidad pública, ¡cualquier persona podrá comenzar a chatear contigo utilizando el buscador!. Por el contrario, con la visibilidad privada, solo podrán iniciar chats contigo quienes tengas agregados como amigos. Por defecto la visibilidad del usuario es privada, pero podrás cambiarla en cualquier momento al entrar a tu perfil</p>
          </section>
          <section className="sections__section">
            <h4 className="sections__section__title">Chats</h4>
            <p>Puedes comenzar chats en el momento que tú quieras y se actualizará el <strong>UI a tiempo real</strong>. También puedes eliminar chats sin que quede ningún rastro siempre que quieras y se eliminarán para ambos participantes. Al igual que los amigos, ¡podrás tener hasta <strong>50 chats activos</strong>!.</p>
          </section>
        </div>
      </main>
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
