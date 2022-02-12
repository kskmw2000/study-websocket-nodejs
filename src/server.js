import http from "http";
import express from "express";
import SocketIO from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`Socket Event:${event}`);
  });

  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    done(); // frontend의 function 을 호출할 수 있음.
    socket.to(roomName).emit("welcome"); // socket.io는 나를 제외한 사람에게 메시지를 보냄
  });
});

httpServer.listen(3000, handleListen);
