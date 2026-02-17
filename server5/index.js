const express = require("express");

const app = express();

const students = [
  { att: 80 , uid : 108607, total_sub : 14, bonus : 20 , name : "Sai" },
  { att: 90 , uid : 108644, total_sub : 14, bonus : 30 , name : "Het" },
  { att: 87 , uid : 108615, total_sub : 14, bonus : 40 , name : "Tulya" },
  { att: 98 , uid : 108608, total_sub : 14, bonus : 60 , name : "Anshu" },
];

app.get("/", (req, res) => {
  res.json(students);
});

app.get("/students", (req, res) => {
  res.status(200).json(students);
});

app.get("/students/:uid", (req, res) => {
  const studentId = Number(req.params.uid);
  const student = students.find(u => u.uid === studentId);

  if (!student) {
    return res.status(404).json({ message: "User not found" });
  }
  
  res.status(200).json(student);
});

app.use(express.json());

app.post("/students", (req, res) => {
  const newStu = {
    att: students.length + 1,
    uid: req.body.uid,
    total_sub: req.body.total_sub,
    bonus : req.body.bonus,
    name : req.body.name
  };

  students.push(newStu);

  res.status(201).json({
    message: "User created",
    user: newStu
  });
});

app.put("/students/:uid", (req, res) => {
  const studentId = Number(req.params.uid);
  const index = students.findIndex(u => u.uid === studentId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  students[index] = {
    att: req.body.att,
    uid: studentId,
    total_sub: req.body.total_sub,
    bonus : req.body.bonus,
    name : req.body.name
  };

  res.status(200).json({
    message: "User replaced",
    student: students[index]
  });
});


app.patch("/students/:uid", (req, res) => {
  const StudentId = Number(req.params.uid);
  const user = students.find(u => u.uid === StudentId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.body.att) user.att = req.body.att;
  if (req.body.total_sub) user.total_sub = req.body.total_sub;
  if (req.body.bonus) user.bonus = req.body.bonus;
  if (req.body.name) user.name = req.body.name;

  res.status(200).json({
    message: "User updated",
    user
  });
});


app.delete("/students/:uid", (req, res) => {
  const StudentId = Number(req.params.uid);
  const index = students.findIndex(u => u.uid === StudentId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  students.splice(index, 1);

  res.status(204).end();
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});