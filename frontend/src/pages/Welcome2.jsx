import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome2(){
  return (
    <div>
      <h2>Welcome</h2>
      <p>Proceed to input produce details and get mandi recommendations.</p>
      <p><Link to="/input">Go to Input Page</Link></p>
    </div>
  );
}
