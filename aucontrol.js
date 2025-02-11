const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


//Logic for Register a new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    console.log("Register request received for:", email);
    
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(name, email, hashedPassword);
    const savedUser = await newUser.save();
