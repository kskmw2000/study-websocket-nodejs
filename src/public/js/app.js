const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", (event) => {
  console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
  // console.log("Just got this : ", message.data, " from to Server");
  console.log("New Message : ", message.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnected to Server");
});

// setTimeout(() => {
//   socket.send("hello from the Browser!");
// }, 4000);

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  // console.log(input.value);
  socket.send(input.value);
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
