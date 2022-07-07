const jwt = require("jsonwebtoken");
const users = require("../db/users");
const bcrypt = require("bcrypt");
const secretKey = "9!(121%#!67126";
const signUp = async (req, res) => {
  try {
    let data = await req.body;
    const totalusers = await users.find();
    for (let i = 0; i < totalusers.length; i++) {
      if (totalusers[i].emailId == data.emailId) {
        res.status(404).send({ message: "User with current email Id exists" });
      }
    }
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    const user = await new users(data);
    await user.save();
    data = JSON.stringify(user);
    const token = jwt.sign(data, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "failed" });
  }
};

const login = async (req, res) => {
  try {
    const data = await req.body;
    const user = await users.find({ emailId: data.emailId });
    const valid = await bcrypt.compare(data.password, user[0]?.password);
    if (valid) {
      const store = JSON.stringify(user[0]);
      const token = jwt.sign(store, secretKey);
      console.log(token);
      res.status(200).send({ token });
    } else {
      res.status(401).send({ message: "Email or password incorrect" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Email or password incorrect" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const data = await req.body;
    const user = await users.findById(userId);
    user.username = data.username;
    user.bio = data.bio;
    user.tags = data.tags;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error" });
  }
};

const getProfileById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await users.findById(userId).populate("postsCreated");
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error" });
  }
};

module.exports = { signUp, login, updateProfile, getProfileById };
