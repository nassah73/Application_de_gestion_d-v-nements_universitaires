const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const app = express();
const cors = require('cors');
app.use(cors())
app.use(express.json());


const atlasUrl = "mongodb://127.0.0.1:27017/pfe_fpt";

mongoose.connect(atlasUrl)
  .then(() => console.log("✅connected !"))
  .catch(err => console.log("❌ probleme on connection", err));



app.use('/api', userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🌍 Server is running on port ${PORT}`);
});