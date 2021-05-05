require("dotenv").config();
const express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var messages = [];
var mongoose = require("mongoose");

var dbUrl = `mongodb+srv://${process.env.username}:${process.env.password}@cluster0.mdhsd.mongodb.net/chat_db?retryWrites=true&w=majority`;
console.log(dbUrl);
app.get("/messages", (req, res) => {
  res.send(messages);
});

https: app.post("/messages", (req, res) => {
  messages.push(req.body);
  io.emit("message", req.body);
  res.sendStatus(200);
});

io.on("connection", (socket) => {
  console.log("user is connected");
});

mongoose.connect(dbUrl, (err) => {
  console.error(err);
});
var server = http.listen(3000, () => {
  console.log(`server is listening on port ${server.address().port}`);
});
