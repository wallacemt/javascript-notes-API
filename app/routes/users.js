const express = require('express');
const axios = require('axios'); // Corrigido aqui
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const withAuth = require("../middlewares/auth");
require("dotenv").config();

const secret = process.env.JWT_TOKEN;
const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

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

  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify`;
  const params = {
    secret: recaptchaSecretKey,
    response: recaptchaToken
  };

  try {
    const response = await axios.post(verificationUrl, null, { params });
    const { success } = response.data;

    if (!success) {
      return res.status(400).json({ error: "Failed reCAPTCHA verification" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Incorrect email or password" });
    } else {
      user.isCorrectPassword(password, function (error, same) {
        if (error || !same) {
          return res.status(401).json({ error: "Incorrect email or password" });
        } else {
          const token = jwt.sign({ email }, secret, { expiresIn: '10d' });
          return res.json({ user, token });
        }
      });
    }
  } catch (error) {
    console.error("Login error:", error); // Adicione um console.log para ver o erro
    return res.status(500).json({ error: "Internal error, please try again" });
  }
});

router.put('/', withAuth, async function (req, res) {
  const { name, email } = req.body;

  try {
    let user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { name: name, email: email } },
      { upsert: true, new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(404).json({ error });
  }
});

router.put('/password', withAuth, async function (req, res) {
  const { password } = req.body;

  try {
    let user = await User.findOne({ _id: req.user._id });
    user.password = password;
    await user.save(); // Adicione `await` para garantir que a atualização seja concluída
    res.json(user);
  } catch (error) {
    res.status(404).json({ error });
  }
});

router.delete('/', withAuth, async function (req, res) {
  try {
    let user = await User.findOne({ _id: req.user._id });
    await user.deleteOne();
    res.status(201).json({ message: 'Ok' });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
