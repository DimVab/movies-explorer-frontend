import Sign from '../Sign/Sign';

function Register ({ ...props }) {

  return(
    <Sign {...props}></Sign>
  )
}

export default Register;
// Прослойка для того, чтобы тексты ошибок для регистрации и авторизации не синхронизировались
