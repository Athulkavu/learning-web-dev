import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import RoutingMachine from './RoutingMachine';

// Helper component to auto-zoom and center map bounds when destinations change
function MapViewAdjuster({ destinations }) {
  const map = useMap();

  useEffect(() => {
    if (destinations && destinations.length > 0) {
      const bounds = L.latLngBounds(destinations.map((d) => [d.lat, d.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15, animate: true });
    }
  }, [destinations, map]);

  return null;
}

// Function to generate custom Leaflet divIcon with sequence numbers and start/end styling
function createCustomMarkerIcon(index, totalCount) {
  let markerClass = 'custom-leaflet-marker';
  if (index === 0) {
    markerClass += ' marker-start';
  } else if (index === totalCount - 1) {
    markerClass += ' marker-end';
  }

  return L.divIcon({
    className: 'custom-marker-wrapper',
    html: `<div class="${markerClass}"><span>${index + 1}</span></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

export default function MapComponent({
  destinations,
  travelMode = 'driving',
  onRouteCalculated,
  darkMode = true,
}) {
  // Default map center (e.g. London / Global view default)
  const defaultCenter = [51.505, -0.09];
  const defaultZoom = 5;

  // CartoDB Dark Matter vs Light Voyager tile URL
  const tileUrl = darkMode
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

  return (
    <div className="map-wrapper">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        {/* Dynamic Tile Layer (Dark Matter vs Voyager Light) */}
        <TileLayer
          key={darkMode ? 'dark' : 'light'}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={tileUrl}
        />

        {/* Adjust Map View whenever destinations change */}
        <MapViewAdjuster destinations={destinations} />

        {/* Leaflet Routing Machine for actual routes along roads */}
        <RoutingMachine
          destinations={destinations}
          travelMode={travelMode}
          onRouteCalculated={onRouteCalculated}
        />

        {/* Place Markers for every location */}
        {destinations.map((loc, idx) => (
          <Marker
            key={loc.id || idx}
            position={[loc.lat, loc.lng]}
            icon={createCustomMarkerIcon(idx, destinations.length)}
          >
            <Popup>
              <div style={{ textAlign: 'center', padding: '4px' }}>
                <strong style={{ fontSize: '14px', display: 'block', color: darkMode ? '#ffffff' : '#0f172a' }}>
                  Stop #{idx + 1}: {loc.shortName || loc.name}
                </strong>
                <span style={{ fontSize: '12px', color: darkMode ? '#94a3b8' : '#64748b' }}>
                  {loc.name}
                </span>
                <br />
                <span style={{ fontSize: '11px', color: '#3b82f6' }}>
                  {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
