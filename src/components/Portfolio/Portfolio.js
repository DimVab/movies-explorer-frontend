function Portfolio () {

  return(
    <div className="portfolio">
      <h3 className="portfolio__heading">Портфолио</h3>
      <ul className="portfolio__sites">
        <li className="portfolio__site">
          <a href="https://github.com/DimVab/how-to-learn" target="_blank" rel="noreferrer" className="portfolio__link">
            <p className="portfolio__link-name">Статичный сайт</p>
            <p className="portfolio__link-icon">↗</p>
          </a>
          <div className="portfolio__line"></div>
        </li>
        <li className="portfolio__site">
          <a href="https://github.com/DimVab/russian-travel" target="_blank" rel="noreferrer" className="portfolio__link">
            <p className="portfolio__link-name">Адаптивный сайт</p>
            <p className="portfolio__link-icon">↗</p>
          </a>
          <div className="portfolio__line"></div>
        </li>
        <li className="portfolio__site">
          <a href="https://github.com/DimVab/react-mesto-api-full" target="_blank" rel="noreferrer" className="portfolio__link">
            <p className="portfolio__link-name">Одностраничное приложение</p>
            <p className="portfolio__link-icon">↗</p>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;