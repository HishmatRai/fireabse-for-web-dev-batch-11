const message = document.getElementById("message");
message.innerHTML = "Loading...";
const auth = firebase.auth();
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      // console.log("active user", user);
      message.innerHTML = `User data available :- ${user.email}`;
    } else {
      window.location.assign("./email-verification.html");
    }
  } else {
    window.location.assign("./login.html");
  }
});

const logOutHandler = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.assign("./login.html");
    });
};

const user = firebase.auth().currentUser;
// console.log("user (2) :- ", user);
const activeUserHandler = () => {
  const user = firebase.auth().currentUser;
  console.log("user (1) :- ", user);
};

// add data
const addDataHandler = () => {
  // var pro = prompt("Type name");
  // firebase
  //   .database()
  //   .ref("users/" + pro)
  //   .set({
  //     name: pro,
  //   });

  // firebase
  //   .database()
  //   .ref("users/")
  //   .push({
  //     name: pro,
  //     ary: [1, 2, 3],
  //     location: {
  //       city: "Mithi",
  //     },
  //     verified: true,
  //     rollNum: 45,
  //   });
  // firebase.database().ref("users/").push({
  //   name: pro,
  // });
};

// get data
// const ul = document.getElementById("ul");
// const loading = document.getElementById("loading");
// const userData = firebase.database().ref("users/");
// userData.on("value", (userRes) => {
//   // value child_added
//   loading.style.display = "none";
//   ul.style.display = "block";
//   ul.innerHTML = "";
//   if (userRes.val()) {
//     userRes.forEach((value, index) => {
//       console.log("userRes", userRes);

      // console.log("child_added", value.val());
//       const li = document.createElement("li");
//       ul.appendChild(li);
//       li.innerHTML = value.val().name;
//       // console.log("userData", value.val().name);
//     });
//   } else {
//     const li = document.createElement("li");
//     ul.appendChild(li);
//     li.innerHTML = "Data not found!";
//   }
// });
// const getDataHandler = () => {
  // const userData = firebase.database().ref("users/" + "-OAXj5kTUgfgfWVq9xSiFuia");
  // userData.on("value", (userRes) => {
  //   console.log("userData", userRes.val());
  // });
// };

// update data
// const updateDataHandler = () => {
//   firebase
//     .database()
//     .ref("users/" + "-OAXoTDtVhCVXJ0E-4ah")
//     .update({
//       name: "ABC 123",
//       email: "info@gmail.com",
//     })
//     .then((res) => {
//       alert("Fd");
//     });
// };

// delete
// const deleteDataHandler = () => {
//   firebase
//     .database()
//     .ref("users/" + "-OAXoSLOWr9rvjC3sMOm")
//     .remove();
// };
