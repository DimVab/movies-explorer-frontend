function Section ({ theme, type, heading, children }) {

  return(
    <section className={`section section_bg-theme_${theme} ${type}`}>
      <h2 className="section__heading">{heading}</h2>
      <div className="section__line"></div>
      {children}
    </section>
  );
}

export default Section;