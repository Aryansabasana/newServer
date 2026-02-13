const express = require("express");

const app = express();

const users = [
  { id: 1, name: "Arjun", role: "student" },
  { id: 2, name: "Priyesha", role: "mentor" }
];
const students = [
{
"studentName": "ABDUL HAQUE",
"University": "SUxCG 714",
"UniversityUID": "108444"
},
{
"studentName": "ADITYA KUMAR",
"University": "SUxCG 702",
"UniversityUID": "108716",
},
{
"studentName": "AMAN KUMAR",
"University": "SUxCG 702",
"UniversityUID":"108500"
},
{
"studentName": "AMRIT RAJ",
"University": "SUxCG 702",
"UniversityUID": "108587"
},

]

// app.get("/", (req, res) => {
//   res.send("Express server is running");
// });

app.get("/cg/students/:gr_number", (req, res) => {
  const userId = req.params.gr_number;
  const user = students.find(u => u.UniversityUID === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
}); 
app.get("/cg/stu_dents", (req, res) => {
  res.status(200).json(students);
});
app.get("/cg/names/:name" , (req , res)=>{
    console.log(req.params.name);
    const store = req.params.name.toLowerCase();

    const check = students.find(u => u.studentName.toLowerCase() == store);

    if(!check){
        return res.status(404).json({message : "User not found"})
    }
    res.status(200).json(check);
    
})
 app.post("/cg", (req, res) => {
  res.status(200).json(students);
}); 
 app.get("/cg", (req, res) => {
  res.status(200).json(students);
}); 
app.use(express.json());


 app.get("/users", (req, res) => {
  res.status(200).json(users);
}); 
app.post("/users",(req,res) => {
  console.log("Request Body: ",req.body);
  const newUser = {
    id: req.body[0].id,
    name: req.body[0].name,
    role: req.body[0].role
  };

  const newUser2 = {
    id: req.body[1].id,
    name: req.body[1].name,
    role: req.body[1].role
  };

  const newUser3 = {
    id: req.body[2].id,
    name: req.body[2].name,
    role: req.body[2].role
  };

  console.log("newUser :", newUser);
  users.push(newUser);
  users.push(newUser2);
  users.push(newUser3);


  res.status(201).send("Value added in in-memory db")
  //works like .insertOne in MongoDB 
})
app.listen(3000, () => {
  console.log("Server started on port 3000");
});