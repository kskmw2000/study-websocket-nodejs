const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

socket.addEventListener("open", (event) => {
  console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
  // console.log("Just got this : ", message.data, " from to Server");
  // console.log("New Message : ", message.data);
  const li = document.createElement("li");
  li.innerHTML = message.data;
  messageList.append(li);
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
  socket.send(makeMessage("new_message", input.value));
  const li = document.createElement("li");
  li.innerHTML = `You: ${input.value}`;
  messageList.append(li);
  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
