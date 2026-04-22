const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());




const atlasUrl = "mongodb://127.0.0.1:27017/pfe_fpt";

mongoose.connect(atlasUrl)
  .then(() => console.log("✅connected Atlas!"))
  .catch(err => console.log("❌ probleme on connection", err));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🌍 Server is running on port ${PORT}`);
});