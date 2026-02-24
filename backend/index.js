require('dotenv').config();
const express = require('express');
const helloRoute = require('./routes/hello');
const mongoose = require('mongoose');

const PORT = 3000;
const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB connection error:", err));

app.use(helloRoute);

app.listen(PORT, "0.0.0.0", function () {
    console.log(`server is running on port ${PORT}`);
});