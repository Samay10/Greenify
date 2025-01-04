# Greenify 🌱

An intelligent routing system that helps users make environmentally conscious travel decisions by predicting and minimizing carbon emissions for different routes.

## Features

### 🗺️ Smart Route Analysis
- Real-time route calculation using HERE Maps API
- Distance and travel time estimation
- Carbon emission predictions for different routes
- Intelligent route recommendations based on environmental impact

### 🤖 Machine Learning Capabilities
- Neural network model for accurate emission predictions
- Considers multiple factors:
  - Distance
  - Traffic conditions
  - Weather conditions
- Trained on real-world emissions data
- Continuous learning and improvement

### 📊 Environmental Impact Metrics
- Carbon emission calculations in grams/kilograms
- Comparative analysis between routes
- Historical data tracking
- Environmental impact visualization

## Technology Stack

- **Frontend**: React.js
- **Backend**: Python
- **Machine Learning**: TensorFlow
- **Maps API**: HERE Maps
- **Data Processing**: NumPy, scikit-learn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/greenify.git
cd greenify
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Install Node.js dependencies:
```bash
cd frontend
npm install
```

4. Set up environment variables:
```bash
# Create .env file in root directory
HERE_MAPS_API_KEY=your_api_key
```

## Usage

1. Start the backend server:
```bash
python app.py
```

2. Start the React frontend:
```bash
cd frontend
npm start
```

3. Access the application at `http://localhost:3000`

## API Documentation

### Route Calculation
```python
GET /api/routes
Parameters:
- origin: string (latitude,longitude)
- destination: string (latitude,longitude)
- mode: string (car, bicycle, walking)

Response:
{
    "distance": float,
    "duration": float,
    "carbon_emissions": float,
    "route_options": [...]
}
```

### Carbon Prediction
```python
POST /api/predict
Body:
{
    "distance": float,
    "traffic_level": int (1-10),
    "weather_condition": int (1-10)
}

Response:
{
    "predicted_emissions": float,
    "confidence_level": float
}
```

## Machine Learning Model

The system uses a neural network with:
- Input features: distance, traffic level, weather conditions
- Hidden layers: 64 and 32 neurons with ReLU activation
- Output: predicted carbon emissions
- Training metrics: Mean Absolute Error (MAE)

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Submit a pull request

## Environment Variables

Required environment variables:
```
HERE_MAPS_API_KEY=your_api_key
ML_MODEL_PATH=path/to/model
DEBUG=True/False
```

## Future Enhancements

- [ ] Add support for public transportation routes
- [ ] Implement real-time weather data integration
- [ ] Add user accounts and route history
- [ ] Develop mobile application
- [ ] Include carbon offset recommendations
- [ ] Add support for electric vehicles

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- HERE Maps for their routing API
- TensorFlow team for the machine learning framework
- Contributors and beta testers

---
🌍 Help reduce carbon emissions, one route at a time.
