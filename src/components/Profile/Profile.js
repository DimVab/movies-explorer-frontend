import React from 'react';
import Header from '../Header/Header';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function Profile ({ loggedIn, userInfo, reqError, reqErrorText, openMenu }) {

  const [onEdit, setEdit] = React.useState(false);

  function editProfile () {
    onEdit ? setEdit(false) : setEdit(true);
  }

    // временные переменные:
    const validationMessage = "Здесь могла бы быть ваша ошибка";
    const validationError = true;

  return(
    <>
    <Header bgColor="light" loggedIn={loggedIn} openMenu={openMenu} />
    <main className="profile">
      <h2 className="profile__name">Привет, {userInfo.name}</h2>
      <form className="profile__form">
        <div className="profile__form-inputs">
          <div className="profile__form-field">
            <p className="profile__form-field-name">Имя</p>
            <input className="profile__form-input" value={userInfo.name} type="text" name="userName" minLength="2" maxLength="30" required disabled={!onEdit} />
            <ErrorMessage error={validationError} errorText={validationMessage} type="profile-validation" />
          </div>
          <div className="profile__form-line"></div>
          <div className="profile__form-field">
            <p className="profile__form-field-name">E-mail</p>
            <input className="profile__form-input" value={userInfo.email} type="email" name="userEmail" minLength="2" maxLength="30" required disabled={!onEdit} />
            <ErrorMessage error={validationError} errorText={validationMessage} type="profile-validation" />
          </div>
        </div>
        {onEdit ? <div>
          <ErrorMessage error={reqError} errorText={reqErrorText} type="request" />
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