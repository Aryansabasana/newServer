const express = require("express");

const app = express();

const cg = [
  {
    studentName: "ABDUL HAQUE",
    University: "SUxCG 714",
    UniversityUID: "108444",
  },
  {
    studentName: "ADITYA KUMAR",
    University: "SUxCG 702",
    UniversityUID: "108716",
  },
  {
    studentName: "AMAN KUMAR",
    University: "SUxCG 702",
    UniversityUID: "108500",
  },
  {
    studentName: "AMRIT RAJ",
    University: "SUxCG 702",
    UniversityUID: "108587",
  }
];

app.get("/", (req, res) => {
  res.send("Express server is running");
});

app.get("/cg", (req, res) => {
  res.status(200).json(cg);
});

app.get("/cg/students/:gr_number", (req, res) => {
  const UniversityUID = req.params.gr_number;

  const user = cg.find(u => u.UniversityUID === UniversityUID);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});