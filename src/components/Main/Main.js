import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Main ({ loggedIn }) {

  return(
    <main>
      <Header location='main' loggedIn={loggedIn} />
      <div>Основная часть</div>
      <Footer />
    </main>
  );
}

export default Main;