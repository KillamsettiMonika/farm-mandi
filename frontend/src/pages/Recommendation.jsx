import React from 'react';
import { Link } from 'react-router-dom';

export default function Recommendation(){
  const data = JSON.parse(localStorage.getItem('lastPrediction') || 'null');
  if (!data) return <div className="card">No recommendation data. Try Input page.</div>;
  return (
    <div>
      <h2>Mandi Recommendations</h2>
      <div className="card">Predicted price: {data.result.predictedPrice}</div>
      {data.result.mandis && data.result.mandis.map((m, idx)=> (
        <div key={idx} className="card">
          <strong>{m.name}</strong>
          <div>Distance: {m.distance_km} km</div>
          <div>Est. price: {m.predicted_price}</div>
          <div>Transport cost: ₹{m.transport_cost}</div>
          <div>Est. Profit: ₹{m.estimated_profit}</div>
          <Link to="/map">View on map</Link> | <Link to="/transport">Get transport options</Link>
        </div>
      ))}
    </div>
  );
}
