const email = document.getElementById("email");
const forgotPasswordHandler = () => {
  var forgotPassword = firebase.auth().sendPasswordResetEmail(email.value);
  console.log("forgotPassword",forgotPassword)
  forgotPassword.then((res) => {
    console.log(res)
    // Password reset email sent!
    // ..
    alert("Password reset email sent!");
  });
  forgotPassword.catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
    console.log(error);
  });
};
