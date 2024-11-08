// src/CarbonFootprint.js
import React from 'react';

// Function to calculate the carbon footprint based on distance
const calculateCarbonFootprint = (distance) => {
  const emissionsFactor = 0.120; // kg CO2 per km (average car)
  return distance * emissionsFactor;
};

// CarbonFootprint Component
const CarbonFootprint = ({ distance }) => {
  // If distance is not provided, do not show the result
  if (distance == null) {
    return null;
  }

  // Calculate the carbon footprint
  const footprint = calculateCarbonFootprint(distance);

  return (
    <div className="CarbonFootprint">
      <h2>Estimated Carbon Footprint</h2>
      <p>{footprint.toFixed(2)} kg CO2 for this route</p>
    </div>
  );
};

export default CarbonFootprint;
