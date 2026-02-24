const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const authRouter = express.Router();

authRouter.post('/api/signup', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ msg: "User with same email address already exists" });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            let user = new User({ fullName, email, password: hashedPassword });
            user = await user.save();
            const userObj = user._doc;
            delete userObj.password;
            res.json(userObj);
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


authRouter.post('/api/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(400).json({ msg: "User not found with this email" });
        } else {
            const isMatch = await bcrypt.compare(password, foundUser.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Incorrect Password" });
            } else {
                const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET,
                    { expiresIn: "7d" });

                const { password, ...userWithoutPassword } = foundUser._doc;

                res.json({ token, ...userWithoutPassword });
            }
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = authRouter;