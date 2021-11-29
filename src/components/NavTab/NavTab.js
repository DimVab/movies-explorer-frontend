import { NavLink } from 'react-router-dom';

function NavTab ({ loggedIn }) {
  return(
       <>{loggedIn
       ? <>
        <nav className="nav-tab nav-tab_logged-in">
          <ul className="nav-tab__list">
            <li><NavLink to="/films" className="nav-tab__link nav-tab__link_bold nav-tab__link_type_films">Фильмы</NavLink></li>
            <li><NavLink to="/saved-films" className="nav-tab__link nav-tab__link_type_saved-films">Сохранённые фильмы</NavLink></li>
            <li><NavLink to="/profile" className="nav-tab__link nav-tab__link_bold nav-tab__link_type_account">Аккаунт</NavLink></li>
            <li><NavLink to="/profile"><button className="nav-tab__account-button" type="button" aria-label="Аккаунт"></button></NavLink></li>
          </ul>
        </nav>
        <button className="nav-tab__nav-button" type="button" aria-label="Навигация"></button>
      </>
      : <>
        <nav className="nav-tab">
          <ul className="nav-tab__list">
            <li><NavLink to="/sign-up" className="nav-tab__link nav-tab__link_bold nav-tab__link_type_registration">Регистрация</NavLink></li>
            <li><NavLink to="/sign-in"><button className="nav-tab__sign-in-button" type="button" aria-label="Войти">Войти</button></NavLink></li>
          </ul>
        </nav>
      </>
      }</>
  );
}

export default NavTab;