import { useState, useEffect, useContext } from 'react';
import Header from '../Header/Header';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import validators from '../Validators/Validators';
import { errorMessages, messages } from '../../utils/messages';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile ({ 
  onEdit, 
  setEdit, 
  reqError, 
  reqErrorText, 
  openMenu,
  handleEditProfile, 
  handleSignOut,
  successMessage,
  showSuccessMessage
}) {

  const userInfo = useContext(CurrentUserContext);

  useEffect(() => {
    setEdit(false);
    showSuccessMessage(false);
  }, []);

  const [profileData, setProfileData] = useState({
    name: userInfo.name,
    email: userInfo.email
  });

  const [errors, setErrors] = useState({
    userName: {
      required: false,
      minLength: false,
      isCorrect: false,
    },
    userEmail: {
      required: false,
      isEmail: false,
    }
  });

  const [isSubmitDisabled, setSubmitDisabled] = useState(true);

  const [errorTexts, setErrorTexts] = useState({
    userNameErrorText: '',
    userEmailErrorText: ''
  });

  useEffect(() => {
    const isNameInputValid = !Object.values(errors.userName).some(Boolean);
    const isEmailInputValid = !Object.values(errors.userEmail).some(Boolean);
    const areInputsNew = profileData.name !== userInfo.name || profileData.email !== userInfo.email;

    if (isNameInputValid && isEmailInputValid && areInputsNew) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [errors]);

  // реагирует на изменение имени
  useEffect(() => {
    const { name } = profileData;

    const userNameValidationResult = Object.keys(validators.userName)
      .map((errorKey) => {
        const errorResult = validators.userName[errorKey](name);
        return { [errorKey]: errorResult};
      })
      .reduce((acc, el) => ({ ...acc, ...el }), {});

      setErrors({
        ...errors,
        userName: userNameValidationResult
      });

  }, [profileData.name]);

  // реагирует на изменение Email
  useEffect(() => {
    const { email } = profileData;

      const userEmailValidationResult = Object.keys(validators.userEmail)
      .map((errorKey) => {
        const errorResult = validators.userEmail[errorKey](email);
        return { [errorKey]: errorResult};
      })
      .reduce((acc, el) => ({ ...acc, ...el }), {});

      setErrors({
        ...errors,
        userEmail: userEmailValidationResult,
      });

  }, [profileData.email]);

  useEffect(() => {
    setErrorTexts({
      ...errorTexts,
      userNameErrorText: errorMessages.userName[Object.keys(errors.userName).find((key) => {
        return errors.userName[key] === true;
      })]
    });
  }, [errors.userName]);

  useEffect(() => {
    setErrorTexts({
      ...errorTexts,
      userEmailErrorText: errorMessages.userEmail[Object.keys(errors.userEmail).find((key) => {
        return errors.userEmail[key] === true;
      })]
    });
  }, [errors.userEmail]);

  function handleChange (e) {
    setProfileData({
      ...profileData,
      [e.target.name] : e.target.value
    });
  }

  function setEditStatus () {
    onEdit ? setEdit(false) : setEdit(true);
  }

  function editProfile (e) {
    e.preventDefault();
    handleEditProfile(profileData);
    setSubmitDisabled(true);
  }

  function signOut (e) {
    e.preventDefault();
    handleSignOut();
  }

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
            <ErrorMessage errorText={errorTexts.userNameErrorText} type="profile-validation" />
          </div>
          <div className="profile__form-line"></div>
          <div className="profile__form-field">
            <p className="profile__form-field-name">E-mail</p>
            <input className="profile__form-input" type="email" name="email" minLength="2" maxLength="30" required disabled={!onEdit} value={onEdit ? profileData.email : userInfo.email} onChange={handleChange} />
            <ErrorMessage errorText={errorTexts.userEmailErrorText} type="profile-validation" />
          </div>
        </div>
        {onEdit ? <div>
          {reqError && <ErrorMessage errorText={reqErrorText} type="request" />}
          <input className="profile__save-button" type="submit" value="Сохранить" disabled={isSubmitDisabled} />
        </div>
        : <div className="profile__buttons-container">
        {successMessage && <p className="profile__success-message">{messages.profile.success}</p>}
        <input className="profile__button" type="button"  value="Редактировать" onClick={setEditStatus} />
        <input className="profile__button profile__button_color_pink" type="submit" value="Выйти из аккаунта"/></div>
        }
      </form>
    </main>
    </>
  );
}

export default Profile;
