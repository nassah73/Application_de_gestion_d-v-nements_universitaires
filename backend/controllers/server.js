/*const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // باش السيرفر يفهم الداتا اللي كتصيفط ليه (JSON)

// الرابط ديال MongoDB (Docker)
// university_events هو اسم الداتا بيز اللي غيتكريا أوتوماتيكيا
const mongoURI = "mongodb://localhost:27017/university_events";

mongoose.connect(mongoURI)
    .then(() => console.log("🚀 MongoDB Connected..."))
    .catch(err => console.log("❌ Connection Error: ", err));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🌍 Server is running on port ${PORT}`);
});*/