import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';

function Main ({ loggedIn }) {

  return(
    <>
    <Header bgColor="grey" loggedIn={loggedIn} />
    <main>
      <Promo />
      <AboutProject />
    </main>
    <Footer />
    </>
  );
}

export default Main;