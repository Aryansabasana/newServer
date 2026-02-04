const express = require("express");

const app = express();

const users = [
  { id: 1, name: "Arjun", role: "student" },
  { id: 2, name: "Arjun ram", role: "student" },
  { id: 3, name: "sita", role: "student" },
  { id: 4, name: "krishna", role: "operator" }
];
app.get("/", (req, res) => {
  res.send("Express server is running");
});

app.get("/users", (req, res) => {
  res.status(200).json(users);
});
app.get("/users/:test", (req, res) => {
    console.log(req.params);
  res.status(200).json(users);
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});