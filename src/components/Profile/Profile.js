import { useState, useEffect, useContext } from 'react';
import Header from '../Header/Header';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile ({ onEdit, setEdit, reqError, reqErrorText, openMenu, handleEditProfile, handleSignOut }) {

  const userInfo = useContext(CurrentUserContext);

  useEffect(() => {
    setEdit(false);
  }, []);

  const [profileData, setProfileData] = useState({
    name: userInfo.name,
    email: userInfo.email
  });

  function handleChange (e) {
    setProfileData({
      ...profileData,
      [e.target.name] : e.target.value
    });
  }

  function setEditStatus () {
    onEdit ? setEdit(false) : setEdit(true);
    console.log(onEdit);
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
    <Header bgColor="light" loggedIn={true} openMenu={openMenu} />
    <main className="profile">
      <h2 className="profile__name">Привет, {userInfo.name}</h2>
      <form className="profile__form" onSubmit={onEdit ? editProfile : signOut}>
        <div className="profile__form-inputs">
          <div className="profile__form-field">
            <p className="profile__form-field-name">Имя</p>
            <input className="profile__form-input" type="text" name="name" minLength="2" maxLength="30" required disabled={!onEdit} value={onEdit ? profileData.name : userInfo.name} onChange={handleChange} />
            <ErrorMessage errorText={validationMessage} type="profile-validation" />
          </div>
          <div className="profile__form-line"></div>
          <div className="profile__form-field">
            <p className="profile__form-field-name">E-mail</p>
            <input className="profile__form-input" type="email" name="email" minLength="2" maxLength="30" required disabled={!onEdit} value={onEdit ? profileData.email : userInfo.email} onChange={handleChange} />
            <ErrorMessage errorText={validationMessage} type="profile-validation" />
          </div>
        </div>
        {onEdit ? <div>
          {reqError && <ErrorMessage errorText={reqErrorText} type="request" />}
          <input className="profile__save-button" type="submit" value="Сохранить" />
        </div>
        : <div>
        <input className="profile__button" type="button"  value="Редактировать" onClick={setEditStatus} />
        <input className="profile__button profile__button_color_pink" type="submit" value="Выйти из аккаунта"/></div>
        }
      </form>
    </main>
    </>
  );
}

export default Profile;
