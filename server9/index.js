const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Day5Lab2")  
.then(()=> console.log("MongoDB connected successfully"))
.catch((error)=> console.log("MongoDB connection failed :- " , error))

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);

app.get("/users", async (req, res) => {
    try {
        const data = await User.find({});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: "Invalid user ID" });
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