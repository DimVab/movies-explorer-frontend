import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from '../Promo/Promo';

function Main ({ loggedIn }) {

  return(
    <main className="main">
      <Header location="main" loggedIn={loggedIn} />
      <Promo />
      <Footer />
    </main>
  );
}

export default Main;