import React, { useEffect, useRef } from 'react';

// Replace with your HERE Maps API credentials
const apiKey = 'Y4tmwhZ3goXf6hoPNVjRedxpLOM-UlDSuw9KOKGlmIM';

function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    // Load HERE Maps
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: apiKey
    });

    const defaultLayers = platform.createDefaultLayers();
    const map = new H.Map(
      mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: { lat: 52.52, lng: 13.405 },
        zoom: 10,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    // Map behavior and UI components
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    // Define route parameters for eco-friendly route
    const router = platform.getRoutingService(null, 8);
    const routeParams = {
      routingMode: 'fast',
      transportMode: 'car',
      origin: '52.5160,13.3779', // Example start point (Berlin)
      destination: '52.5206,13.3862', // Example endpoint (Berlin)
      return: 'polyline',
      alternatives: 1,
      'eco-friendly': true
    };

    // Calculate and display the route
    router.calculateRoute(routeParams, result => {
      if (result.routes.length > 0) {
        const route = result.routes[0];
        const lineString = H.geo.LineString.fromFlexiblePolyline(route.sections[0].polyline);

        const routeLine = new H.map.Polyline(lineString, {
          style: { strokeColor: 'green', lineWidth: 4 }
        });

        map.addObject(routeLine);
        map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
      }
    }, error => {
      console.error('Route calculation failed:', error);
    });

    // Cleanup map instance on component unmount
    return () => {
      map.dispose();
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '500px' }}
    />
  );
}

export default Map;
