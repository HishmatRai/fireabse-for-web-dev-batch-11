firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user.emailVerified);
    if (user.emailVerified) {
      window.location.assign("./pages/home.html");
    } else {
      window.location.assign("./pages/email-verification.html");
    }
  } else {
    window.location.assign("./pages/login.html");
  }
});
