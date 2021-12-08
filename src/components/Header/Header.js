import { Link } from 'react-router-dom';
import headerLogo from '../../images/icons/logo.svg';
import NavTab from '../NavTab/NavTab';

function Header ({ bgColor, loggedIn, openMenu }) {
  return(
    <header className={`header header_bg-color_${bgColor}`}>
      <Link to="/" className="header__link">
        <img src={headerLogo} alt="Логотип: синий круг с прозрачной дыркой в центре" className="header__logo" />
      </Link>
      <NavTab loggedIn={loggedIn} openMenu={openMenu}/>
    </header>
  );
}

export default Header;