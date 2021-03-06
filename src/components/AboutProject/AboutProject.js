function Aboutroject () {

  return(
    <div className="about-project" id="about-project">
      <div className="about-project__articles">
        <article className="about-project__article">
          <h3 className="about-project__article-name">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__article-description">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </article>
        <article className="article">
          <h3 className="about-project__article-name">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__article-description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </article>
      </div>
      <table className="about-project__table">
        <tbody className="about-project__table">
          <tr className="about-project__table-row">
            <td className="about-project__table-cell about-project__table-cell_style_blue">1 неделя</td>
            <td className="about-project__table-cell about-project__table-cell_style_grey">4 недели</td>
          </tr>
          <tr className="about-project__table-row about-project__table-row_type_sides">
            <td className="about-project__table-cell about-project__table-cell_style_transparent">Back-end</td>
            <td className="about-project__table-cell about-project__table-cell_style_transparent">Front-End</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Aboutroject;