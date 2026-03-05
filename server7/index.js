const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express server is running on 3000 port");
});


mongoose.connect("mongodb://localhost:27017/UserLab2")   // make sure that the mongodb is running & url is correct
.then(()=> console.log("MongoDB connected successfully"))
.catch((error)=> console.log("MongoDB connection failed :- " , error))


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);

+


app.get("/users", async (req, res) => {
    try {
        const data = await User.find({});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post("/addUsers", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});





app.post("/addMultipleUsers", async (req, res) => {
    try {
        const users = await User.insertMany(req.body);
        res.status(201).send(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



app.listen(3000, () => {
  console.log("Server started on port 3000");
});