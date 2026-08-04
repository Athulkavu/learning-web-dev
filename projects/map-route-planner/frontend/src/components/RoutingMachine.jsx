import React, { useEffect, useState } from 'react';
import { useMap, Polyline } from 'react-leaflet';

export default function RoutingMachine({ destinations, travelMode = 'Driving', onRouteCalculated }) {
  const map = useMap();
  const [routePolyline, setRoutePolyline] = useState([]);

  useEffect(() => {
    if (!destinations || destinations.length < 2) {
      setRoutePolyline([]);
      if (onRouteCalculated) {
        onRouteCalculated(null);
      }
      return;
    }

    // Step 1: Strict mapping object before the fetch call
    const profileMap = {
      'Driving': 'driving',
      'Walking': 'foot',
      'Cycling': 'bike',
      'driving': 'driving',
      'walking': 'foot',
      'cycling': 'bike',
      'foot': 'foot',
      'bike': 'bike',
    };

    const mode = profileMap[travelMode] || 'driving';

    // Format coordinates in OSRM format (longitude,latitude separated by semicolons)
    const coordinates = destinations
      .map((d) => `${d.lng != null ? d.lng : d.lon},${d.lat}`)
      .join(';');

    const url = `https://router.project-osrm.org/route/v1/${mode}/${coordinates}?overview=full&geometries=geojson`;

    async function fetchOSRMRoute() {
      try {
        // Step 2: Add console.log('Fetching URL:', url) right before the fetch() call
        console.log('Fetching URL:', url);

        const response = await fetch(url);
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const rawDuration = data.routes[0].duration; // in seconds from OSRM
          const newDistance = data.routes[0].distance; // in meters from OSRM

          // Calculate mode-specific realistic duration (seconds) if OSRM demo server returns driving fallback
          let modeDuration = rawDuration;

          if (mode === 'foot') {
            // Walking speed: 5 km/h (~1.389 m/s)
            const walkingDuration = Math.round(newDistance / 1.3889);
            // Use walking duration if raw OSRM demo duration is close to driving speed
            modeDuration = (rawDuration && rawDuration > walkingDuration * 0.7) ? rawDuration : walkingDuration;
          } else if (mode === 'bike') {
            // Cycling speed: 15 km/h (~4.167 m/s)
            const cyclingDuration = Math.round(newDistance / 4.1667);
            // Use cycling duration if raw OSRM demo duration is close to driving speed
            modeDuration = (rawDuration && rawDuration > cyclingDuration * 0.7) ? rawDuration : cyclingDuration;
          }

          const newDuration = modeDuration;

          // Step 4: Add console.log('New Duration (seconds):', newDuration) right after fetching
          console.log('Mode:', mode, '| Distance (meters):', newDistance, '| New Duration (seconds):', newDuration);

          // Extract geometry coordinates and convert from OSRM [lng, lat] to Leaflet [lat, lng]
          const geometryCoords = data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
          setRoutePolyline(geometryCoords);

          // Step 5: Update state variable responsible for displaying time & distance on screen
          if (onRouteCalculated) {
            onRouteCalculated({
              duration: newDuration,
              distance: newDistance,
            });
          }
        }
      } catch (err) {
        console.error('Error fetching OSRM route:', err);
      }
    }

    fetchOSRMRoute();
  }, [map, destinations, travelMode]); // Crucial: travelMode in dependency array triggers instant route update

  // Dynamic polyline color depending on selected mode
  const isFoot = travelMode === 'foot' || travelMode === 'walking' || travelMode === 'Walking';
  const isBike = travelMode === 'bike' || travelMode === 'cycling' || travelMode === 'Cycling';
  const polylineColor = isFoot ? '#10b981' : isBike ? '#8b5cf6' : '#3b82f6';

  return routePolyline.length > 0 ? (
    <Polyline
      positions={routePolyline}
      pathOptions={{ color: polylineColor, weight: 5, opacity: 0.9 }}
    />
  ) : null;
}
