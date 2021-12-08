function Profile ({ error, type, errorText }) {

  return(
    <p className={`error-message ${error && "error-message_visible"} error-message_type_${type}`}>{errorText}</p>
  );
}

export default Profile;