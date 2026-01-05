import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Forgot from './pages/Forgot';
import Welcome2 from './pages/Welcome2';
import InputPage from './pages/InputPage';
import Prediction from './pages/Prediction';
import Recommendation from './pages/Recommendation';
import MapView from './pages/MapView';
import Transport from './pages/Transport';
import Tracking from './pages/Tracking';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <div className="app">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/welcome2" element={<Welcome2 />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
