# Farm2Mandi - Backend (stub)

This is a minimal backend scaffold for the Farm2Mandi project. It provides simple API endpoints you can extend to wire your LSTM/XGBoost models and logistics integrations.

## Endpoints

- POST /api/auth/register  - { name, email, password }
- POST /api/auth/login     - { email, password }
- POST /api/auth/forgot    - { email } (stub)

- POST /api/predict        - { crop, date, location } -> { predictedPrice, mandis }
- POST /api/transport-options - { from, to, quantity } -> trucks
- GET  /api/track/:vehicleId -> timeline

## Run (Windows PowerShell)

1. cd backend
2. npm install
3. Create a `.env` file in `backend/` (see `.env.example`) and set `MONGO_URI` and `JWT_SECRET`.
4. npm run dev   # requires nodemon, or use npm start

## Notes

- Authentication now uses MongoDB and a `Farmer` model. Register/login stores farmers in the database.
- Prediction/recommendation endpoints are still stubbed. Replace with your model code (load model and call prediction function).
- Set `JWT_SECRET` environment variable to a secure value in production.
