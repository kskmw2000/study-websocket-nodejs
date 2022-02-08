const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", (event) => {
  console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
  console.log("Just got this : ", message.data, " from to Server");
});

socket.addEventListener("close", () => {
  console.log("Disconnected to Server");
});

setTimeout(() => {
  socket.send("hello from the Browser!");
}, 4000);
