const email = document.getElementById("email");
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    email.innerHTML = user.email;
    if (user.emailVerified) {
      window.location.assign("./home.html");
    }
  } else {
    window.location.assign("./login.html");
  }
});

// resend
const resendEmailHandler = () => {
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(() => {
      // Email verification sent!
      // ...
      alert("Email verification sent!");
    });
};

const goHomeHandler = () => {
  window.location.reload();
};
