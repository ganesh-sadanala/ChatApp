require("dotenv").config();
const express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var mongoose = require("mongoose");

var dbUrl = `mongodb+srv://${process.env.username}:${process.env.password}@sandbox.qdcp6.mongodb.net/chat_db?retryWrites=true&w=majority`;
var Message = mongoose.model("Message", {
  name: String,
  message: String,
});

app.get("/messages", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});

app.post("/messages", (req, res) => {
  var message = new Message(req.body);
  message.save((err) => {
    if (err) {
      sendStatus(500);
    }
    io.emit("message", req.body);
    res.sendStatus(200);
  });
});

io.on("connection", (socket) => {
  console.log("user is connected");
});

mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
  console.error(err);
});
var server = http.listen(3000, () => {
  console.log(`server is listening on port ${server.address().port}`);
});
