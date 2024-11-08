let uid;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      uid = user.uid;
      console.log("active user", user);
      firebase
        .firestore()
        .collection("firestore-todos")
        .where("uid", "==", uid)
        .get()
        .then((userRes) => {
          userRes.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
          });
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    } else {
      window.location.assign("./email-verification.html");
    }
  } else {
    window.location.assign("./login.html");
  }
});

const input = document.getElementById("input");
const addDataHandler = () => {
  console.log(input.value);
  firebase
    .firestore()
    .collection("firestore-todos")
    .add({
      todoValue: input.value,
      uid: uid,
    })
    .then((res) => {
      firebase.firestore().collection("firestore-todos").doc(res.id).update({
        id: res.id,
      });
      console.log("Document successfully written!", res);
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  input.value = "";
  // firebase.database().ref("fsdjfklds/" + "Fsdf").set({})
  // firebase.database().ref("fsdjfklds/").push({})

  //   firebase
  //     .firestore()
  //     .collection("users/")
  //     .doc("id2")
  //     .set({
  //       name: "iHunar",
  //       email: "info@ihunar.com",
  //       phone: "02232323",
  //       gender: "Male",
  //       ary: [1, 2, 3],
  //       user: {
  //         city: "Mithi",
  //       },
  //     })
  //     .then((res) => {
  //       console.log("Document successfully written!",res);
  //     })
  //     .catch((error) => {
  //       console.error("Error writing document: ", error);
  //     });
  // firebase
  //   .firestore()
  //   .collection("users/")
  //   .add({
  //     name: "iHunar",
  //     email: "info@ihunar.com",
  //     phone: "02232323",
  //     gender: "Male",
  //     ary: [1, 2, 3],
  //     user: {
  //       city: "Mithi",
  //     },
  //   })
  //   .then((res) => {
  //     console.log("Document successfully written!", res);
  //   })
  //   .catch((error) => {
  //     console.error("Error writing document: ", error);
  //   });
};

// get data

// firebase.database().ref("users/" + "fsd").on("value",(res)=>{})
// firebase.database().ref("users/" ).on("value",(res)=>{})

// firebase
//   .firestore()
//   .collection("users/")
//   .doc("4Zh7c1eYLbWik7dzexjc6DgHrtg2")
//   .get()
//   .then((doc) => {
//     console.log("Document data:", doc.data());
//   })
//   .catch((error) => {
//     console.log("Error getting document:", error);
//   });

// firebase
//   .firestore()
//   .collection("firestore-todos")
//   .get()
//   .then((userRes) => {
//     userRes.forEach((doc) => {
//       if (doc.data().uid === uid) {
//         console.log(doc.id, " => ", doc.data());
//       }
//     });
//   })
//   .catch((error) => {
//     console.log("Error getting document:", error);
//   });

firebase
  .firestore()
  .collection("firestore-todos")
  .onSnapshot((querySnapshot) => {
    // var cities = [];
    querySnapshot.forEach((doc) => {
      // cities.push(doc.data());
      console.log(doc.data());
    });
    // console.log("Current cities in CA: ", cities);
  });
