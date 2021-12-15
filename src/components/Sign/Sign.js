import { useState } from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/icons/logo.svg';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function Sign ({ onSubmit, greetingText, isRegister, reqError, reqErrorText, buttonText, redirectText, linkText, link }) {

  // временные переменные:
  const validationMessage = '';

  const [signData, setSignData] = useState({
    userName: '',
    userEmail: '',
    userPassword: ''
  });

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
            <input className="sign__form-input" type="text" name="userName" minLength="2" maxLength="30" value={signData.userName} onChange={handleChange} required />
            <ErrorMessage errorText={validationMessage} type="sign-validation" />
          </div>
          }
          <div className="sign__form-field">
            <p className="sign__form-field-name">E-mail</p>
            <input className="sign__form-input" type="email" name="userEmail" minLength="2" maxLength="30" value={signData.userEmail}  onChange={handleChange} required />
            <ErrorMessage errorText={validationMessage} type="sign-validation" />
          </div>
          <div className="sign__form-line"></div>
          <div className="sign__form-field">
            <p className="sign__form-field-name">Пароль</p>
            <input className="sign__form-input" type="password" name="userPassword" minLength="2" maxLength="30" value={signData.userPassword}  onChange={handleChange} required />
            <ErrorMessage errorText={validationMessage} type="sign-validation" />
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
