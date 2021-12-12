function Footer () {
  return(
    <footer className="footer">
        <p className="footer__caption">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__line"></div>
        <div className="footer__container">
          <p className="footer__copyright">© 2021</p>
          <ul className="footer__links">
            <li className="footer__links-element"><a href="https://practicum.yandex.ru" target="_blank" rel="noreferrer" className="footer__link">Яндекс.Практикум</a></li>
            <li className="footer__links-element"><a href="https://github.com/DimVab" target="_blank" rel="noreferrer" className="footer__link">Github</a></li>
            <li className="footer__links-element"><a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="footer__link">Facebook</a></li>
          </ul>
        </div>
    </footer>
  );
}

export default Footer;