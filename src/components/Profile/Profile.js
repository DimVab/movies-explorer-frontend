import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function Profile ({ getUserInfo, loggedIn, userInfo, reqError, reqErrorText, openMenu, handleEditProfile, handleSignOut }) {

  const [onEdit, setEdit] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userInfo.name,
    email: userInfo.email
  });

  useEffect(() => {
    getUserInfo();
  }, []);

  function handleChange (e) {
    setProfileData({
      ...profileData,
      [e.target.name] : e.target.value
    });
    console.log(profileData);
  }

  function setEditStatus () {
    onEdit ? setEdit(false) : setEdit(true);
  }

  function editProfile (e) {
    e.preventDefault();
    handleEditProfile(profileData);
  }

  function signOut (e) {
    e.preventDefault();
    handleSignOut();
  }

    // временные переменные:
    const validationMessage = "Здесь могла бы быть ваша ошибка";
    const validationError = true;

  return(
    <>
    <Header bgColor="light" loggedIn={loggedIn} openMenu={openMenu} />
    <main className="profile">
      <h2 className="profile__name">Привет, {userInfo.name}</h2>
      <form className="profile__form" onSubmit={onEdit ? editProfile : signOut}>
        <div className="profile__form-inputs">
          <div className="profile__form-field">
            <p className="profile__form-field-name">Имя</p>
            <input className="profile__form-input" type="text" name="name" minLength="2" maxLength="30" required disabled={!onEdit} value={profileData.name} onChange={handleChange} />
            <ErrorMessage error={validationError} errorText={validationMessage} type="profile-validation" />
          </div>
          <div className="profile__form-line"></div>
          <div className="profile__form-field">
            <p className="profile__form-field-name">E-mail</p>
            <input className="profile__form-input" type="email" name="email" minLength="2" maxLength="30" required disabled={!onEdit} value={profileData.email} onChange={handleChange} />
            <ErrorMessage error={validationError} errorText={validationMessage} type="profile-validation" />
          </div>
        </div>
        {onEdit ? <div>
          <ErrorMessage error={reqError} errorText={reqErrorText} type="request" />
          <input className="profile__save-button" type="submit" value="Сохранить" />
        </div>
        : <div><input className="profile__button" type="button"  value="Редактировать" onClick={setEditStatus} />
        <input className="profile__button profile__button_color_pink" type="submit" value="Выйти из аккаунта"/></div>
        }
      </form>
    </main>
    </>
  );
}

export default Profile;
