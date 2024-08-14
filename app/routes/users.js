const express = require('express');
const axios = require;
let router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const withAuth = require("../middlewares/auth")
require("dotenv").config()

const secret = process.env.JWT_TOKEN;
const recaptchaScretKey = process.env.RECAPTCHA_SECRET_KEY



router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  try {
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error Registering New User, Please try again" });
  }
});

router.post('/login', async (req, res) => {
  const { email, password, recaptchaToken } = req.body;

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaScretKey}&response=${recaptchaToken}`;

  try {
    const response = await axios.post(verifyUrl);
    const { sucess } = response.data;

    if (!sucess) {
      return res.status(401).json({ error: "Please verify you are not a robot" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Incorrect email or password" });
    } else {
      user.isCorrectPassword(password, function (error, same) {
        if (!same) {
          res.status(401).json({ error: "Incorrect email or password" });
        } else {
          const token = jwt.sign({ email }, secret, { expiresIn: '10d' })
          res.json({ user: user, token: token });
        }
      })
    }
  } catch (error) {
    res.status(500).json({ error: "Internal error, plase try again" });
  }

})

router.put('/', withAuth, async function (req, res) {
  const { name, email } = req.body;

  try {
    let user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { name: name, email: email } },
      { upsert: true, 'new': true }
    )
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error })
  }

})

router.put('/password', withAuth, async function (req, res) {
  const { password } = req.body;

  try {
    let user = await User.findOne({ _id: req.user._id })
    user.password = password
    user.save();
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error })
  }

})

router.delete('/', withAuth, async function (req, res) {
  try {
    let user = await User.findOne({ _id: req.user._id });
    await user.deleteOne()
    res.json({ messege: 'Ok' }).status(201);
  } catch (error) {
    res.status(500).json({ error: error })
  }
})
module.exports = router;
