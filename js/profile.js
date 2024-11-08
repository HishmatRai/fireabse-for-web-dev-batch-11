const fullName = document.getElementById("full-name");
const phone = document.getElementById("phone");
const username = document.getElementById("username");
const email = document.getElementById("email");
let uid;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      uid = user.uid;
      let userData = firebase.database().ref("users/" + user.uid);
      userData.on("value", (userRes) => {
        const userData = userRes.val();
        fullName.value = userData.fullName;
        phone.value = userData.phone;
        username.value = userData.username;
        email.value = userData.email;
        console.log("current user", userData);
      });
    } else {
      window.location.assign("./email-verification.html");
    }
  } else {
    window.location.assign("./login.html");
  }
});

// update profile
const updateProfileHandler = () => {
  const user = {
    fullName: fullName.value,
    username: username.value,
    phone: phone.value,
    gender: "Male",
  };
  firebase
    .database()
    .ref("users/" + uid)
    .update(user)
    .then(() => {
      alert("Updated successfully");
    });
  // console.log("user", user);
  // console.log("uid", uid);
};

// upload
const uploadFile = (event) => {
  var storageRef = firebase.storage().ref();
  var uploadTask = storageRef.child('images/rivers.jpg').put(file);
  uploadTask.on('state_changed', 
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // Handle unsuccessful uploads
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    }
  );

  console.log(event.target.files[0]);
  // console.log(event.files);
};
