import React from 'react';

export default function Prediction(){
  const data = JSON.parse(localStorage.getItem('lastPrediction') || 'null');
  if (!data) return <div className="card">No prediction data. Go to Input page.</div>;
  return (
    <div>
      <h2>Prediction</h2>
      <div className="card">Crop: {data.input.crop}</div>
      <div className="card">Predicted Price: {data.result.predictedPrice}</div>
    </div>
  );
}
