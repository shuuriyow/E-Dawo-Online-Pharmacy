const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key';

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  console.log('Login controller hit');
  try {
    const { email, password } = req.body;
    console.log('Request body:', req.body);

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    console.log('Found user:', user);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, role: user.role }
    });
  } catch (err) {
    console.error('Error in loginUser:', err.message);
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createUser, loginUser };
