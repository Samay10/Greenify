import React from 'react';
import './App.css';
import Map from './Map';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Eco-Friendly Routes with HERE Maps</h1>
        <p>Explore optimized routes for reduced emissions and eco-conscious travel.</p>
      </header>
      {/* Map component to display eco-friendly routes */}
      <div className="Map-container">
        <Map />
      </div>
    </div>
  );
}

export default App;
