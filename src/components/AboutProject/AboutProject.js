function Aboutroject () {

  return(
    <section className="about-project main__about-project">
      <h2 className="about-project__heading">О проекте</h2>
      <div className="about-project__line"></div>
      <div className="about-project__articles">
        <article className="article">
          <h3 className="article__thesis">Дипломный проект включал 5 этапов</h3>
          <p className="article__description">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </article>
        <article className="article">
          <h3 className="article__thesis">На выполнение диплома ушло 5 недель</h3>
          <p className="article__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </article>
      </div>
      <table className="about-project__table">
        <tr className="about-project__table-row">
          <td className="about-project__table-cell about-project__table-cell_style_blue">1 неделя</td>
          <td className="about-project__table-cell about-project__table-cell_style_grey">4 недели</td>
        </tr>
        <tr className="about-project__table-row about-project__table-row_type_sides">
          <td className="about-project__table-cell about-project__table-cell_style_transparent">Back-end</td>
          <td className="about-project__table-cell about-project__table-cell_style_transparent">Front-End</td>
        </tr>
      </table>
    </section>
  );
}

export default Aboutroject;