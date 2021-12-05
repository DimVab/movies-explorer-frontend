import avatar from '../../images/unknown.png';

function AboutMe () {

  return(
    <div className="about-me">
      <div className="about-me__container">
        <div className="about-me__info">
          <article className="about-me__article">
              <h3 className="about-me__name">Дмитрий</h3>
              <p className="about-me__briefly">
              Фронтенд-разработчик, 26 лет
              </p>
              <p className="about-me__description">
              Я родился в Москве, живу в Московской области, Нахабино. Закончил юрфак одного из Московских вузов, работаю на госслужбе.
              Люблю осваивать что-то новое. Недавно начал кодить. Сейчас заканчиваю курс по веб-разработке. В близжайшем будущем постараюсь трудоустроиться в качестве разработчика (если не переведусь в "Н";).
              </p>
          </article>
          <ul className="about-me__links">
            <li className="about-me__links-element"><a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="about-me__link">Facebook</a></li>
            <li className="about-me__links-element"><a href="https://github.com/DimVab" target="_blank" rel="noreferrer" className="about-me__link">Github</a></li>
          </ul>
        </div>
        <img src={avatar} className="about-me__photo" alt="Фотография студента" />
      </div>
    </div>
  );
}

export default AboutMe;