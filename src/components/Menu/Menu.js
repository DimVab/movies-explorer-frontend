import React from 'react';
import { NavLink } from 'react-router-dom';

function Menu({ isOpened, openMenu }) {

  const [currentPage, setCurrentPage] = React.useState(window.location.pathname);
  const pathname = window.location.pathname;

  React.useEffect(() => {
    setCurrentPage(window.location.pathname);
  }, [pathname]);

  return (
    <nav className={`menu ${isOpened && "menu_opened"}`}>
      <ul className="menu__list">
        <li className="menu__list-item">
          <NavLink to="/" className="menu__list-link" onClick={openMenu}>Главная</NavLink>
          {currentPage === "/" && <div className="menu__underline"></div>}
        </li>
        <li className="menu__list-item">
          <NavLink to="/movies" className="menu__list-link" onClick={openMenu}>Фильмы</NavLink>
          {currentPage === "/movies" && <div className="menu__underline"></div>}
        </li>
        <li className="menu__list-item">
          <NavLink to="/saved-movies" className="menu__list-link" onClick={openMenu}>Сохранённые фильмы</NavLink>
          {currentPage === "/saved-movies" && <div className="menu__underline"></div>}
        </li>
      </ul>
      <ul className="menu__account-links">
        <li className="menu__account-item">
          <NavLink to="/profile" className="menu__account-link" onClick={openMenu}>Аккаунт</NavLink>
          {currentPage === "/profile" && <div className="menu__underline"></div>}
        </li>
        <li><NavLink to="/profile"><button className="menu__account-button" type="button" aria-label="Аккаунт" onClick={openMenu}></button></NavLink></li>
      </ul>
      <button className="menu__close-icon" type="button" aria-label="Закрыть" onClick={openMenu}></button>
    </nav>
  );
}

export default Menu;