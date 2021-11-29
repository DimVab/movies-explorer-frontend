import { NavLink } from 'react-router-dom';

function Menu({ isOpened, currentPage }) {


  return (
    <nav className={`menu ${isOpened && "menu_opened"}`}>
      <ul className="menu__list">
        <li className="menu__list-item">
          <NavLink to="/" className="menu__list-link">Главная</NavLink>
          {currentPage === "menu" && <div className="menu__underline"></div>}
        </li>
        <li className="menu__list-item">
          <NavLink to="/films" className="menu__list-link">Фильмы</NavLink>
          {currentPage === "films" && <div className="menu__underline"></div>}
        </li>
        <li className="menu__list-item">
          <NavLink to="/saved-films" className="menu__list-link">Сохранённые фильмы</NavLink>
          {currentPage === "saved-films" && <div className="menu__underline"></div>}
        </li>
      </ul>
      <ul className="menu__account-links">
        <li className="menu__account-item">
          <NavLink to="/profile" className="menu__account-link">Аккаунт</NavLink>
          {currentPage === "profile" && <div className="menu__underline"></div>}
        </li>
        <li><NavLink to="/profile"><button className="menu__account-button" type="button" aria-label="Аккаунт"></button></NavLink></li>
      </ul>
      <button className="menu__close-icon" type="button" aria-label="Закрыть"></button>
    </nav>
  );
}

export default Menu;