import requests

# HERE API credentials
API_KEY = 'Y4tmwhZ3goXf6hoPNVjRedxpLOM-UlDSuw9KOKGlmIM'

# Define the start and end points
start_point = "52.5160,13.3779"  # Example: Berlin
end_point = "48.8566,2.3522"    # Example: Paris

# API endpoint
url = f"https://router.hereapi.com/v8/routes"

# Parameters for routing (no spans or eco mode for now)
params = {
    'transportMode': 'car',
    'origin': start_point,
    'destination': end_point,
    'routingMode': 'fast',  # Standard routing mode
    'return': 'summary',   # Use 'summary' for basic route details
    'apikey': API_KEY
}

# Make the API request
response = requests.get(url, params=params)

# Parse the response
if response.status_code == 200:
    data = response.json()
    route_summary = data['routes'][0]['sections'][0]['summary']
    distance = route_summary['length'] / 1000  # Convert to kilometers
    travel_time = route_summary['duration'] / 3600  # Convert to hours

    # CO2 Emission Calculation (using a standard emission factor for gasoline cars)
    emission_factor = 120  # CO2 emission factor in grams per kilometer for gasoline cars
    carbon_emissions_grams = distance * emission_factor  # CO2 emissions in grams
    carbon_emissions_kg = carbon_emissions_grams / 1000  # Convert grams to kilograms

    # Output the results
    print(f"Route Distance: {distance:.2f} km")
    print(f"Travel Time: {travel_time:.2f} hours")
    print(f"Carbon Emissions: {carbon_emissions_kg:.2f} kg")
else:
    print(f"Error: {response.status_code} - {response.text}")
