const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Farmer = require('../models/Farmer');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

// Register (creates a farmer)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, village, district, state, pincode, aadhar, farm_size, crops } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'name, email and password required' });

    const existing = await Farmer.findOne({ email });
    if (existing) return res.status(409).json({ error: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const farmer = new Farmer({
      name,
      email,
      password: hashed,
      phone,
      village,
      district,
      state,
      pincode,
      aadhar,
      farm_size: farm_size || null,
      crops: Array.isArray(crops) ? crops : (crops ? [crops] : [])
    });
    await farmer.save();

    const token = jwt.sign({ id: farmer._id, email: farmer.email, role: farmer.role }, JWT_SECRET, { expiresIn: '7d' });

    // Set token in HTTP-only cookie (7 days)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ user: { id: farmer._id, name: farmer.name, email: farmer.email, role: farmer.role } });
  } catch (err) {
    console.error('Register error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });
    const farmer = await Farmer.findOne({ email });
    if (!farmer) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, farmer.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: farmer._id, email: farmer.email, role: farmer.role }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.json({ user: { id: farmer._id, name: farmer.name, email: farmer.email, role: farmer.role } });
  } catch (err) {
    console.error('Login error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Forgot password (stub) — in production, generate a reset token and email it
router.post('/forgot', async (req, res) => {
  try {
    const { email } = req.body;
    const farmer = await Farmer.findOne({ email });
    if (!farmer) return res.status(404).json({ error: 'No such user' });
    // TODO: create a reset token, store it, and send email
    res.json({ message: 'Password reset flow initiated (stub). Implement email sending in production.' });
  } catch (err) {
    console.error('Forgot error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Logout - clear cookie
router.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'lax' });
  res.json({ message: 'Logged out' });
});

module.exports = router;
