import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
// app.listen(3000, handleListen);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  console.log("Connected to Browser"); // frontend에서 websocket으로 연결되었다는 정보를 backend에서 받을 수 있음.
  socket.send("hello"); // frontend에 hello라는 메세지 전달 (단, frontend 단에서 receiver로 데이터를 받아야 함.)

  socket.on("close", () => console.log("Disconnected from the Browser")); // Browser가 닫히면 실행됨.
  // frontend가 보낸 메세지를 backend에서 받을수 있도록 함.
  socket.on("message", (message) => {
    // console.log("receiver from client message : ", message.toString("utf8"));
    console.log(message.toString("utf8"));
  });
});

server.listen(3000, handleListen);
