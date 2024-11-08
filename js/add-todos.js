let uid;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      uid = user.uid;
      console.log("active user", user);
    } else {
      window.location.assign("./email-verification.html");
    }
  } else {
    window.location.assign("./login.html");
  }
});
// add todo
const input = document.getElementById("input");
const addTodoHandler = () => {
  const newTodo = {
    todoValue: input.value,
    uid: uid,
  };
  var newData = firebase.database().ref("todos/").push(newTodo);
  firebase
    .database()
    .ref("todos/" + newData.key)
    .update({
      key: newData.key,
    });
  console.log("newData", newData.key);
  input.value = "";
};

// get data
const loading = document.getElementById("loading");
const data = document.getElementById("data");
const getData = firebase.database().ref("todos/");

getData.on("value", (todoRes) => {
  loading.style.display = "none";
  data.style.display = "block";
  data.innerHTML = "";
  let myTodos = [];
  if (todoRes.val()) {
    todoRes.forEach((todoResValue) => {
      if (todoResValue.val().uid === uid) {
        myTodos.push(todoResValue.val());
      }
    });

    // console.log("myTodos>>>>>", myTodos);
    if (myTodos.length === 0) {
      const message = document.createElement("p");
      data.appendChild(message);
      message.innerHTML = "Data Not Found!";
    } else {
      myTodos.map((val, index) => {
        console.log("val", val);
        const todo = document.createElement("p");
        data.appendChild(todo);
        todo.innerHTML = val.todoValue;
        const editButton = document.createElement("button");
        todo.appendChild(editButton);
        editButton.innerHTML = "Edit";
        const deleteButton = document.createElement("button");
        todo.appendChild(deleteButton);
        deleteButton.innerHTML = "Delete";
        // edit function
        editButton.addEventListener("click", () => {
          var editTodo = prompt("Edit todo", val.todoValue);
          firebase
            .database()
            .ref("todos/" + val.key)
            .update({
              todoValue: editTodo,
            });
        });
        // delete function
        deleteButton.addEventListener("click", () => {
          firebase
            .database()
            .ref("todos/" + val.key)
            .remove();
        });
      });
    }
  } else {
    const message = document.createElement("p");
    data.appendChild(message);
    message.innerHTML = "Data Not Found!";
  }
});
