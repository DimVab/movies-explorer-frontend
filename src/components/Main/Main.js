import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';

function Main ({ loggedIn }) {

  return(
    <>
    <Header bgColor="grey" loggedIn={loggedIn} />
    <main>
      <Promo />
      <AboutProject />
      <Techs />
    </main>
    <Footer />
    </>
  );
}

export default Main;