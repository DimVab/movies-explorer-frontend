import { Link } from 'react-router-dom';
import headerLogo from '../../images/icons/logo.svg';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function Sign ({ loggedIn, greetingText, isRegister, reqError, reqErrorText, buttonText,  redirectText, linkText, link }) {

  // временные переменные:
  const validationMessage = "Здесь могла бы быть ваша ошибка";
  const validationError = true;

  return(
    <div className="sign">
      <header className="sign__header">
        <Link to="/" className="sign__header-link">
          <img src={headerLogo} alt="Логотип: синий круг с прозрачной дыркой в центре" className="sign__header-logo" />
        </Link>
        <h2 className="sign__greeting">{greetingText}</h2>
      </header>
      <form className="sign__form">
        <div className="sign__form-inputs">
          {isRegister &&
          <div className="sign__form-field">
            <p className="sign__form-field-name">Имя</p>
            <input className="sign__form-input" type="text" name="userName" minLength="2" maxLength="30" required />
            <ErrorMessage error={validationError} errorText={validationMessage} type="sign-validation" />
          </div>
          }
          <div className="sign__form-field">
            <p className="sign__form-field-name">E-mail</p>
            <input className="sign__form-input" type="email" name="userEmail" minLength="2" maxLength="30" required />
            <ErrorMessage error={validationError} errorText={validationMessage} type="sign-validation" />
          </div>
          <div className="sign__form-line"></div>
          <div className="sign__form-field">
            <p className="sign__form-field-name">Пароль</p>
            <input className="sign__form-input" type="password" name="userPassword" minLength="2" maxLength="30" required />
            <ErrorMessage error={validationError} errorText={validationMessage} type="sign-validation" />
          </div>
        </div>
        <div>
          <ErrorMessage error={reqError} errorText={reqErrorText} type="request" />
          <input className="sign__form-button" type="submit" value={buttonText} />
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