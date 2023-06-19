import { useRef, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight, AiOutlineLock, AiOutlineMessage, AiOutlineTeam, AiOutlineWechat } from "react-icons/ai";
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
  const [translate, setTranslate] = useState(0)
  const sliderRef = useRef(null);

  function handleSlide (slide) {
    if(slide === "next") {
      const slide = translate + 25;
      if(slide < 100) {
        sliderRef.current.style.transform = `translateX(-${slide}%)`;
        setTranslate(slide);
      } else {
        sliderRef.current.style.transform = `translateX(0)`;
        setTranslate(0);
      }
    } else {
      const slide = translate - 25;
      if(slide >= 0) {
        sliderRef.current.style.transform = `translateX(-${slide}%)`;
        setTranslate(slide);
      } else {
        sliderRef.current.style.transform = `translateX(-75%)`;
        setTranslate(75);
      }
    }
  }

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
      
      <main className="main main--landing">
        <div className="sections">
          <AiFillCaretLeft className="sections__btn sections__btn-previous" onClick={() => handleSlide("previous")}>{"<"}</AiFillCaretLeft>
          <div className="sections__slider" ref={sliderRef}>

            <section className="sections__slider__section">
              <div className="sections__slider__section__container">
                <h4 className="sections__slider__section__title">ChatApp</h4>
                <p>ChatApp es una plataforma de mensajería <strong>completamente funcional</strong> para que puedas chatear con quien tú quieras.</p>
              </div>
              <div className="sections__slider__section__container">
                <AiOutlineMessage className="sections__slider__section__container__img" />
              </div>
            </section>

            <section className="sections__slider__section">
              <div className="sections__slider__section__container">
                <h4 className="sections__slider__section__title">Amigos</h4>
                <p>Tiene integrado un sistema de amigos para que puedas añadir y eliminar en cualquier momento a otros usuarios. ¡Podrás tener hasta <strong>50 amigos agregados</strong>!</p>
              </div>
              <div className="sections__slider__section__container">
                <AiOutlineTeam className="sections__slider__section__container__img"/>
              </div>
            </section>

            <section className="sections__slider__section">
              <div className="sections__slider__section__container">
                <h4 className="sections__slider__section__title">Visibilidad</h4>
                <p>Una de las características principales es el hecho de poder configurar la visibilidad de tu cuenta con <strong>dos posibles opciones: pública y privada</strong>. Con la visibilidad pública, ¡cualquier persona podrá comenzar a chatear contigo utilizando el buscador!. Por el contrario, con la visibilidad privada, solo podrán iniciar chats contigo quienes tengas agregados como amigos. Por defecto la visibilidad del usuario es privada, pero podrás cambiarla en cualquier momento al entrar a tu perfil</p>
              </div>
              <div className="sections__slider__section__container">
                <AiOutlineLock className="sections__slider__section__container__img"/>
              </div>
            </section>

            <section className="sections__slider__section">
              <div className="sections__slider__section__container">
                <h4 className="sections__slider__section__title">Chats</h4>
                <p>Puedes comenzar chats en el momento que tú quieras y se actualizará el <strong>UI a tiempo real</strong>. También puedes eliminar chats sin que quede ningún rastro siempre que quieras y se eliminarán para ambos participantes. Al igual que los amigos, ¡podrás tener hasta <strong>50 chats activos</strong>!.</p>
              </div>
              <div className="sections__slider__section__container">
                <AiOutlineWechat className="sections__slider__section__container__img" />
              </div>
            </section>
          </div>
          <AiFillCaretRight className="sections__btn sections__btn-next" onClick={() => handleSlide("next")}>{">"}</AiFillCaretRight>
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
