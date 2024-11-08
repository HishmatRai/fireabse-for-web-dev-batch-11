const email = document.getElementById("email");
const password = document.getElementById("password");
const fullName = document.getElementById("full-name");
const phone = document.getElementById("phone");
const username = document.getElementById("username");
const message = document.getElementById("message");
const signUpHandler = () => {
  const user = {
    email: email.value,
    phone: phone.value,
    fullName: fullName.value,
    username: username.value,
    password: password.value,
  };
  firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then((res) => {
      firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(() => {
          firebase
            .database()
            .ref("users/" + res.user.uid)
            .set(user)
            .then(() => {
              firebase
                .firestore()
                .collection("users/")
                .doc(res.user.uid)
                .set(user)
                .then(() => {
                  console.log("Document successfully written!");
                  message.innerHTML = "Success !";
                  message.style.color = "green";
                  window.location.assign("./email-verification.html");
                })
                .catch((error) => {
                  console.error("Error writing document: ", error);
                });
            });
          // console.log("res", res.user);
        });
    })
    .catch((error) => {
      console.log("Error message", error.message);
      message.innerHTML = error.message;
      message.style.color = "red";
    });
  // firebase
  // .auth()
  // .createUserWithEmailAndPassword(email.value, password.value)
  // .then((res) => {
  //   firebase
  //     .auth()
  //     .currentUser.sendEmailVerification()
  //     .then((res) => {
  //       console.log("Res", res.user);
  //       message.innerHTML = "Success !";
  //       message.style.color = "green";
  //       //
  //       window.location.assign("./email-verification.html");
  //     });
  // })
  // .catch((error) => {
  //   console.log("Error message", error.message);
  //   message.innerHTML = error.message;
  //   message.style.color = "red";
  // });
};
