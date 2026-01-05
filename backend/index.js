const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const corsOptions = require('cors');

dotenv.config({ path: path.join(__dirname, '.env') });

const authRoutes = require('./routes/auth');
const predictRoutes = require('./routes/predict');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow the frontend origin and include credentials (cookies)
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
app.use(require('cors')({ origin: FRONTEND_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api', predictRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Farm2Mandi backend running. See /api endpoints.' });
});

async function start() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('MONGO_URI not set in environment. Create a .env file with MONGO_URI.');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri, { dbName: process.env.MONGO_DB || undefined });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
  });
}

start();
