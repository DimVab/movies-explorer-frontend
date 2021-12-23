import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/icons/logo.svg';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import validators from '../Validators/Validators';
import { errorMessages } from '../../utils/messages';

function Sign ({ 
  onSubmit, 
  greetingText, 
  isRegister, 
  isAuthorization, 
  reqError, 
  reqErrorText, 
  buttonText, 
  redirectText, 
  linkText, 
  link 
}) {

  const [signData, setSignData] = useState({
    userName: '',
    userEmail: '',
    userPassword: ''
  });

  // точно не помню, зачем продублировал #TODO подумать над удалением
  useEffect(() => {
    setSignData({
      userName: '',
      userEmail: '',
      userPassword: ''
    });
  }, []);

  const [errors, setErrors] = useState({
    userName: {
      required: false,
      minLength: false,
      isCorrect: false,
    },
    userEmail: {
      required: false,
      isEmail: false,
    },
    userPassword: {
      required: false,
      minLength: false
    }
  });

  const [isSubmitDisabled, setSubmitDisabled] = useState(true);

  const [errorTexts, setErrorTexts] = useState({
    userNameErrorText: '',
    userEmailErrorText: '',
    userPassowrdErrorText: '',
  });

  useEffect(() => {
    const isNameInputValid = !Object.values(errors.userName).some(Boolean) && signData.userName !== '';
    const isEmailInputValid = !Object.values(errors.userEmail).some(Boolean) && signData.userEmail !== '';
    const isPasswordInputValid = !Object.values(errors.userPassword).some(Boolean) && signData.userPassword !== '';

    if (isRegister && isNameInputValid && isEmailInputValid && isPasswordInputValid) {
      setSubmitDisabled(false);
    } else if (isAuthorization && isEmailInputValid && isPasswordInputValid) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [errors]);

  // реагирует на изменение имени
  useEffect(() => {
    const { userName } = signData;

    const userNameValidationResult = Object.keys(validators.userName)
      .map((errorKey) => {
        const errorResult = validators.userName[errorKey](userName);
        return { [errorKey]: errorResult};
      })
      .reduce((acc, el) => ({ ...acc, ...el }), {});

      setErrors({
        ...errors,
        userName: userNameValidationResult
      });

  }, [signData.userName]);

  // реагирует на изменение Email
  useEffect(() => {
    const { userEmail } = signData;

      const userEmailValidationResult = Object.keys(validators.userEmail)
      .map((errorKey) => {
        const errorResult = validators.userEmail[errorKey](userEmail);
        return { [errorKey]: errorResult};
      })
      .reduce((acc, el) => ({ ...acc, ...el }), {});

      setErrors({
        ...errors,
        userEmail: userEmailValidationResult,
      });

  }, [signData.userEmail]);

  // реагирует на изменение пароля
  useEffect(() => {
    const { userPassword } = signData;

      const userPassordValidationResult = Object.keys(validators.userPassword)
      .map((errorKey) => {
        const errorResult = validators.userPassword[errorKey](userPassword);
        return { [errorKey]: errorResult};
      })
      .reduce((acc, el) => ({ ...acc, ...el }), {});

      setErrors({
        ...errors,
        userPassword: userPassordValidationResult
      });

  }, [signData.userPassword]);

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

  useEffect(() => {
    setErrorTexts({
      ...errorTexts,
      userPassowrdErrorText: errorMessages.userPassword[Object.keys(errors.userPassword).find((key) => {
        return errors.userPassword[key] === true;
      })]
    });
  }, [errors.userPassword]);

  // Костыль, тк при рендеринге валидаторы, реагирующие на значения инпутов, сразу начинают валидацию. То есть даже при пустых полях появляется текст ошибки. Не знаю как исправить другим способом
  useEffect(() => {
    setErrors({
      userName: {
        required: false,
        minLength: false,
        isCorrect: false,
      },
      userEmail: {
        required: false,
        isEmail: false,
      },
      userPassword: {
        required: false,
        minLength: false
      }
    });
  }, []);

  function handleSubmit (e) {
    e.preventDefault();
    isRegister ? onSubmit(signData.userName, signData.userEmail, signData.userPassword) : onSubmit(signData.userEmail, signData.userPassword);
  }

  function handleChange (e) {
    setSignData({
      ...signData,
      [e.target.name] : e.target.value
    });
  }

  return(
    <div className="sign">
      <header className="sign__header">
        <Link to="/" className="sign__header-link">
          <img src={headerLogo} alt="Логотип: синий круг с прозрачной дыркой в центре" className="sign__header-logo" />
        </Link>
        <h2 className="sign__greeting">{greetingText}</h2>
      </header>
      <form className="sign__form" onSubmit={handleSubmit}>
        <div className="sign__form-inputs">
          {isRegister &&
          <div className="sign__form-field">
            <p className="sign__form-field-name">Имя</p>
            <input className="sign__form-input" type="text" name="userName" value={signData.userName} onChange={handleChange} />
            <ErrorMessage errorText={errorTexts.userNameErrorText} type="sign-validation" />
          </div>
          }
          <div className="sign__form-field">
            <p className="sign__form-field-name">E-mail</p>
            <input className="sign__form-input" type="email" name="userEmail" value={signData.userEmail}  onChange={handleChange} />
            <ErrorMessage errorText={errorTexts.userEmailErrorText} type="sign-validation" />
          </div>
          <div className="sign__form-line"></div>
          <div className="sign__form-field">
            <p className="sign__form-field-name">Пароль</p>
            <input className="sign__form-input" type="password" name="userPassword" value={signData.userPassword}  onChange={handleChange} />
            <ErrorMessage errorText={errorTexts.userPassowrdErrorText} type="sign-validation" />
          </div>
        </div>
        <div>
          {reqError && <ErrorMessage error={reqError} errorText={reqErrorText} type="request" />}
          <input className="sign__form-button" type="submit" value={buttonText} disabled={isSubmitDisabled} />
          <div className="sign__redirect-container">
            <p className="sign__redirect-text">{redirectText}</p>
            <Link to={link} className="sign__link">{linkText}</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Sign;
