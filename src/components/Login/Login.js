import Sign from '../Sign/Sign';

function Login ({ ...props }) {

  return(
    <Sign {...props}></Sign>
  )
}

export default Login;
// Прослойка для того, чтобы тексты ошибок для регистрации и авторизации не синхронизировались
