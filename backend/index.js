require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');


const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(authRouter);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB connection error:", err));


app.listen(PORT, "0.0.0.0", function () {
    console.log(`server is running on port ${PORT}`);
});