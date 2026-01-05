const jwt = require('jsonwebtoken');
const Farmer = require('../models/Farmer');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const decoded = jwt.verify(token, JWT_SECRET);
    // attach user info (minimal) to request
    const user = await Farmer.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error', err);
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = { requireAuth };
