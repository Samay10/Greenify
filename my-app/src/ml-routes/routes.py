import tensorflow as tf
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Sample dataset
# Each entry: [distance (km), traffic_level (1-10), weather_condition (1-10)], carbon_emission (g)
data = np.array([
    [5, 3, 2, 10],  # Route 1
    [7, 5, 4, 15],  # Route 2
    [3, 2, 1, 7],   # Route 3
    [8, 8, 5, 20],  # Route 4
    [6, 4, 3, 12]   # Route 5
])

# Split features and target
X = data[:, :3]  # Features: [distance, traffic_level, weather_condition]
y = data[:, 3]   # Target: carbon_emission

# Normalize features
scaler = StandardScaler()
X = scaler.fit_transform(X)

# Split data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Build a TensorFlow model
# The neural network has two hidden layers with ReLU activation and 
# one output layer for regression.
model = tf.keras.Sequential([
    tf.keras.layers.Dense(64, activation='relu', input_shape=(X_train.shape[1],)),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(1)  # Output layer for regression
])

model.compile(optimizer='adam', loss='mse', metrics=['mae'])

# Train the model
history = model.fit(X_train, y_train, epochs=50, validation_data=(X_test, y_test), verbose=0)

# Evaluate the model
loss, mae = model.evaluate(X_test, y_test, verbose=0)
print(f"Test Mean Absolute Error: {mae:.2f} g")

# Predict emissions for new routes
new_routes = np.array([
    [4, 3, 2],  # New route 1
    [6, 6, 4],  # New route 2
    [3, 1, 1]   # New route 3
])
new_routes_scaled = scaler.transform(new_routes)
predictions = model.predict(new_routes_scaled)

# Find the route with the minimum emissions
min_index = np.argmin(predictions)
print(f"Route with minimum emissions: Route {min_index + 1}")
print(f"Predicted emissions: {predictions[min_index][0]:.2f} g")
