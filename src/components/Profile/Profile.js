import React from 'react';
import Header from '../Header/Header';
import RequestError from '../RequestError/RequestError';

function Profile ({ loggedIn, userInfo, reqError, reqErrorText }) {

  const [onEdit, setEdit] = React.useState(false);

  function editProfile () {
    onEdit ? setEdit(false) : setEdit(true);
  }

  return(
    <>
    <Header bgColor="light" loggedIn={loggedIn} />
    <main className="profile">
      <h2 className="profile__name">Привет, {userInfo.name}</h2>
      <form className="profile__form">
        <div className="profile__form-inputs">
          <div className="profile__form-field">
            <p className="profile__form-field-name">Имя</p>
            <input className="profile__form-input" value={userInfo.name} type="text" name="userName" minLength="2" maxLength="30" required disabled={!onEdit} />
          </div>
          <div className="profile__form-line"></div>
          <div className="profile__form-field">
            <p className="profile__form-field-name">E-mail</p>
            <input className="profile__form-input" value={userInfo.email} type="email" name="userEmail" minLength="2" maxLength="30" required disabled={!onEdit} />
          </div>
        </div>
        {onEdit ? <div>
          < RequestError reqError={reqError} reqErrorText={reqErrorText} />
          <input className="profile__save-button" type="submit" value="Сохранить" />
        </div>
        : <div><input className="profile__button" type="button"  value="Редактировать" onClick={editProfile} />
        <input className="profile__button profile__button_color_pink" type="submit" value="Выйти из аккаунта" /></div>
        }
      </form>
    </main>
    </>
  );
}

export default Profile;