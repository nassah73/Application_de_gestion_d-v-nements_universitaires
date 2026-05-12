const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const News = require('../models/News');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });


router.post('/add', upload.single('pdfFile'), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const pdfUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newNews = new News({
      title,
      description,
      category,
      pdfUrl
    });

    await newNews.save();
    res.status(201).json({ message: "Announcement added successfully!", news: newNews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/all', async (req, res) => {
  try {
    const allNews = await News.find().sort({ date: -1 });
    res.json(allNews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;