function Techs () {

  return(
    <section className="techs">
      <h2 className="section__heading">Технологии</h2>
      <div className="section__line section__line_in_techs"></div>
      <article className="article techs__article">
          <h3 className="article__thesis article__thesis_size_b">7 технологий</h3>
          <p className="article__description article__description_type_compressed">
            На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
          </p>
      </article>
      <ul className="techs__technologies-list">
        <li className="techs__technology">HTML</li>
        <li className="techs__technology">CSS</li>
        <li className="techs__technology">JS</li>
        <li className="techs__technology">React</li>
        <li className="techs__technology">Git</li>
        <li className="techs__technology">Express.js</li>
        <li className="techs__technology">MongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;