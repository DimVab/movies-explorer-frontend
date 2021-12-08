function Profile ({ reqError, reqErrorText }) {

  return(
    <p className={`request-error ${reqError && "request-error_visible"}`}>{reqErrorText}</p>
  );
}

export default Profile;