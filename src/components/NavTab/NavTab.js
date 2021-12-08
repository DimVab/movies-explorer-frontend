import { NavLink } from 'react-router-dom';

function NavTab ({ loggedIn, openMenu }) {
  return(
       <>{loggedIn
       ? <>
        <nav className="nav-tab nav-tab_logged-in">
          <ul className="nav-tab__list">
            <li><NavLink to="/movies" className="nav-tab__link nav-tab__link_bold nav-tab__link_type_movies">Фильмы</NavLink></li>
            <li><NavLink to="/saved-movies" className="nav-tab__link nav-tab__link_type_saved-movies">Сохранённые фильмы</NavLink></li>
            <li><NavLink to="/profile" className="nav-tab__link nav-tab__link_bold nav-tab__link_type_account">Аккаунт</NavLink></li>
            <li><NavLink to="/profile"><button className="nav-tab__account-button" type="button" aria-label="Аккаунт"></button></NavLink></li>
          </ul>
        </nav>
        <button className="nav-tab__nav-button" type="button" aria-label="Навигация" onClick={openMenu}></button>
      </>
      : <>
        <nav className="nav-tab">
          <ul className="nav-tab__list">
            <li><NavLink to="/sign-up" className="nav-tab__link nav-tab__link_bold nav-tab__link_type_registration">Регистрация</NavLink></li>
            <li><NavLink to="/sign-in"><button className="nav-tab__sign-in-button" type="button">Войти</button></NavLink></li>
          </ul>
        </nav>
      </>
      }</>
  );
}

export default NavTab;