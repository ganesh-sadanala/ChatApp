const express = require("express");
var app = express();
app.use(express.static(__dirname));

var messages = [
  { name: "Time", message: "Hi" },
  { name: "Bim", message: "Hi" },
];

app.get("/messages", (req, res) => {
  res.send(messages);
});

var server = app.listen(3000, () => {
  console.log(`server is listening on port ${server.address().port}`);
});

console.log(server.address());
