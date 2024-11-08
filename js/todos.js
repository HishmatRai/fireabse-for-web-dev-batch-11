// get data
const loading = document.getElementById("loading");
const data = document.getElementById("data");
const getData = firebase.database().ref("todos/");
getData.on("value", (todoRes) => {
  loading.style.display = "none";
  data.style.display = "block";
  data.innerHTML = "";
  if (todoRes.val()) {
    todoRes.forEach((todoResValue) => {
      const todo = document.createElement("p");
      data.appendChild(todo);
      todo.innerHTML = todoResValue.val().todoValue;
    });
  } else {
    const message = document.createElement("p");
    data.appendChild(message);
    message.innerHTML = "Data Not Found!";
  }
});
