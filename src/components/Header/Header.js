import headerLogo from '../../images/icons/logo.svg';
import NavTab from '../NavTab/NavTab';

function Header ({ location, loggedIn }) {
  return(
    <header className={`${location}__header header`}>
      <img src={headerLogo} alt="Логотип: синий круг с прозрачной дыркой в центре" className="header__logo" />
      <NavTab loggedIn={loggedIn}/>
    </header>
  );
}

export default Header;