const express= require('express')
const router = express.Router();
const StudentController = require('../Controllers/studentController');

router.post('/register', StudentController.registerStudent);
module.exports = router;