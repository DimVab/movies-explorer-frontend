import { Link } from 'react-router-dom';
import promoImage from '../../images/web-globe.png';

function Promo () {

  return(
    <section className="promo main__promo">
      <div className="promo__container">
        <header>
          <h1 className="promo__heading">Учебный проект студента факультета Веб-разработки.</h1>
          <p className="promo__subheading">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </header>
        <button className="promo__button" type="button">
          <Link to="/" className="promo__link">Узнать больше</Link>
        </button>
      </div>
      <img className="promo__image" src={promoImage} alt="Изображение глобуса, в котором океаны заполнены словами 'WEB', а континенты - пустые пространства" className="promo__image"/>
    </section>
  );
}

export default Promo;