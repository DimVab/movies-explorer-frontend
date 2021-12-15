function Profile ({ type, errorText }) {

  return(
    <p className={`error-message error-message_type_${type}`}>{errorText}</p>
  );
}

export default Profile;
