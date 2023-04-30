import Header from "../components/Header";
import Footer from "../components/Footer";
import "./LandingPage.css";
import NavbarMenu from "../components/NavbarMenu";

function LandingPage() {
  return (
    <>
      <Header>
        <NavbarMenu />
      </Header>
      <main className="main">LandingPage</main>
      <Footer />
    </>
  );
}

export default LandingPage;
