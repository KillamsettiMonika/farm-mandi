const express = require('express');
const router = express.Router();

// Simple stub endpoints for prediction and mandi recommendation.
// Replace internals with your LSTM/XGBoost model integration.
const { requireAuth } = require('../middleware/authMiddleware');

// POST /api/predict
router.post('/predict', requireAuth, (req, res) => {
  const { crop, date, location } = req.body;
  // Basic validation
  if (!crop) return res.status(400).json({ error: 'crop required' });

  // Stubbed predicted price (normally call LSTM model)
  const predictedPrice = (Math.random() * 50 + 100).toFixed(2);

  // Stubbed mandi recommendations: normally run XGBoost and distance calc
  const mandis = [
    { name: 'Mandi A', distance_km: 12, predicted_price: (predictedPrice * 1.02).toString(), transport_cost: 1200, estimated_profit: 8000 },
    { name: 'Mandi B', distance_km: 45, predicted_price: (predictedPrice * 1.05).toString(), transport_cost: 2500, estimated_profit: 10200 },
    { name: 'Mandi C', distance_km: 85, predicted_price: (predictedPrice * 0.98).toString(), transport_cost: 4200, estimated_profit: 7600 }
  ];

  res.json({ crop, predictedPrice, mandis });
});

// POST /api/transport-options
router.post('/transport-options', requireAuth, (req, res) => {
  const { from, to, quantity } = req.body;
  // Normally integrate third-party logistics API here. Return stubbed trucks.
  const trucks = [
    { provider: 'TruckCo', capacity: 1000, available: true, price: 4000, eta_minutes: 45 },
    { provider: 'AgriLog', capacity: 3000, available: true, price: 8000, eta_minutes: 120 }
  ];
  res.json({ from, to, quantity, trucks });
});

// GET /api/track/:vehicleId - stub
router.get('/track/:vehicleId', requireAuth, (req, res) => {
  const { vehicleId } = req.params;
  // Stubbed location updates
  const timeline = [
    { lat: 28.7041, lon: 77.1025, timestamp: Date.now() - 1000 * 60 * 60 },
    { lat: 28.7300, lon: 77.1200, timestamp: Date.now() - 1000 * 60 * 30 },
    { lat: 28.7450, lon: 77.1400, timestamp: Date.now() }
  ];
  res.json({ vehicleId, timeline });
});

module.exports = router;
