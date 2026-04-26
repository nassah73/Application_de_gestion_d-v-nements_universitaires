const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // تأكد باللي عندك دوسي سميتو uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // سمية فريدة
    }
});

const upload = multer({ storage: storage }).single('coverImage'); // 'coverImage' هو السمية لي صيفطنا من React

const Event = require('../Models/Event'); // الموديل لي صاوبنا قبيلة

const CreateEvent = (req, res) => {
    // 1. معالجة التصويرة أولاً
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de l'upload de l'image" });
        }

        try {
            // 2. جبد المعلومات من req.body (multer كيعمرها أوتوماتيكياً)
            const { title, category, capacity, date, location, registrationLink, description } = req.body;

            // 3. صاوب Object جديد من الموديل
            const newEvent = new Event({
    title,
    category,
    capacity: Number(capacity), // حولها لـ Number هنا باش MongoDB تقبلها
    date,
    location,
    registrationLink,
    description,
    coverImage: req.file ? req.file.path : null
});

            // 4. حفظ في MongoDB
            await newEvent.save();

            res.status(201).json({ 
                message: "Événement créé avec succès! En attente de validation par l'administration.",
                event: newEvent 
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur serveur lors de la création de l'événement" });
        }
    });
};

module.exports = CreateEvent;