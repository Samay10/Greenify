// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import MapPage from './Map'; // Import the Map page
import CarbonFootprintPage from './CarbonFootprint'; // Import the Carbon Footprint page

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Eco-Friendly Routes with HERE Maps</h1>
          <p>Explore optimized routes for reduced emissions and eco-conscious travel.</p>
        </header>

        {/* Navigation links */}
        <nav>
          <ul>
            <li>
              <Link to="/">Map</Link>
            </li>
            <li>
              <Link to="/carbon-footprint">Carbon Footprint</Link>
            </li>
          </ul>
        </nav>

        {/* Define routes */}
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/carbon-footprint" element={<CarbonFootprintPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
