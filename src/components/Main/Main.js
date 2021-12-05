import Section from '../Section/Section';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

function Main ({ loggedIn }) {

  return(
    <>
    <Header bgColor="grey" loggedIn={loggedIn} />
    <main>
      <Promo />
      <Section theme="light" heading="О проекте">
        <AboutProject />
      </Section>
      <Section theme="light-gray" type="section_type_thechs" heading="Технологии">
        <Techs className="techs" />
      </Section>
      <Section theme="light" type="section_type_about-me" heading="Студент">
        <AboutMe className="about-me" />
        <Portfolio />
      </Section>
    </main>
    <Footer />
    </>
  );
}

export default Main;