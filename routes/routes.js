const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel.js');
const Message = require('../models/MessageModel.js');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'This email has already been registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    var number = "" + Math.floor(Math.random() * 1000000);
    var already = await User.findOne({ number });
    while(already){
      number = "" + Math.floor(Math.random() * 1000000);
      already = await User.findOne({ number });
    }

    const newUser = new User({ username, email, password: hashedPassword, number });
    await newUser.save();
    res.json({profile: newUser});
  } catch (err) {
    res.status(500).json({ msg: 'Server error on Register' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ msg: 'This email has not been registered' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token: token, profile: user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error on Login' });
  }
});

// Verify Email

router.post('/verifyEmail', async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    if (user){ res.json(true); } else { res.json(false); }
  }
  catch (e) {
    res.status(500).json({ msg: 'Server error on Verify Email' });
  }
});


// Create new Message in Database

router.post('/CreateMessage', async (req, res) => {
  const { content, from, to, } = req.body;
  try{
    const newMessage = new Message({ content, from, to, timestamp: new Date()});
    await newMessage.save();
    res.json(newMessage);
  }
  catch(e){
    res.status(500).json({ msg: 'Server error on Create Message' });
  }
});

// Return Messages Chat

router.post('/SearchMessage', async (req, res) => {
  const { from, to } = req.body;
  try{
    var messagesfrom = await Message.find({ from, to }).sort({timestamp: 1});
    var messagesto = await Message.find({ from: to, to: from }).sort({timestamp: 1});
    var messages = messagesfrom.concat(messagesto);
    messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    res.json(messages);
  }
  catch(e){
    res.status(500).json({ msg: 'Server error on Return Message' });
  }
});

// Return user by Number ID

router.post('/NumberID', async (req, res) => {
  const { numberID } = req.body;
  try {
    const user = await User.findOne({ number: numberID });
    if (!user) {
      return res.status(400).json({ msg: 'This Number ID dont exists' });
    }

    res.json({ profile: user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error on Login' });
  }
});

// Return New Message from Database

router.post('/ReturnMessage', async (req, res) => {
  const { ID } = req.body;
  try {
    const message = await Message.findById(ID);
    res.json(message);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/UpdateChats', async (req, res) => {
  const { ChatID, UserID } = req.body;
  try{
    const user = await User.findById(UserID);
    const userTo = await User.findOne({number: ChatID});
    const index = user.chats.findIndex(chat => chat.numberID == ChatID);
    if(index == -1){
      const newChat = { numberID: ChatID, name: userTo.username };
      user.chats.unshift(newChat);
    }
    else {
      const [chat] = user.chats.splice(index, 1);
      user.chats.unshift(chat);
    }
    await user.save();
    res.json(user.chats);
  }
  catch(e){
    res.status(500).json({ msg: 'Server error' });
    console.log(e);
  }
});

module.exports = router;
