const email = document.getElementById("email");
const password = document.getElementById("password");
const message = document.getElementById("message");
const loginBtn = document.getElementById("login-btn");
const loginHandler = () => {
  loginBtn.value = "Loading ...";
  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then((res) => {
      console.log(res.user);
      message.innerHTML = "Success !";
      message.style.color = "green";
      if (res.user.emailVerified) {
        window.location.assign("./home.html");
      } else {
        window.location.assign("./email-verification.html");
      }
    })
    .catch((error) => {
      console.log(error.message);
      message.innerHTML = "Email or password incorrect !";
      message.style.color = "red";
    });
};

// google
const loginWithGoogleHandler = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log("result", result);
      window.location.assign("./home.html");
    })
    .catch((error) => {
      console.log("error", error);
    });
};

// login with facebook
const loginWithFacebookHandler = () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log("result", result);
    })
    .catch((error) => {
      console.log("Error", error);
    });
};
