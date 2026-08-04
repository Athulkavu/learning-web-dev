import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import togpx from 'togpx';
import MapComponent from './components/MapComponent';
import SearchBox from './components/SearchBox';
import DraggableList from './components/DraggableList';

function PlannerView() {
  const { shortId } = useParams();
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [routeTitle, setRouteTitle] = useState('');
  const [travelMode, setTravelMode] = useState('Driving'); // 'Driving', 'Cycling', 'Walking'
  const [routeMetrics, setRouteMetrics] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [createdShortId, setCreatedShortId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('planner'); // 'planner' | 'favorites' | 'saved'
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  // Dark Mode state synced with localStorage
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('themePreference');
      return savedTheme !== null ? JSON.parse(savedTheme) : true;
    } catch (e) {
      return true;
    }
  });

  // Sync theme to document element and localStorage
  useEffect(() => {
    try {
      localStorage.setItem('themePreference', JSON.stringify(darkMode));
      if (darkMode) {
        document.body.classList.remove('light-theme');
      } else {
        document.body.classList.add('light-theme');
      }
    } catch (e) {
      console.warn('Could not save theme preference:', e);
    }
  }, [darkMode]);

  // Starred Favorites state initialized with automatic deduplication on load
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('favoriteLocations');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];

      const uniqueFavorites = [];
      for (const item of parsed) {
        if (!item || (!item.name && item.lat == null)) continue;

        const isDuplicate = uniqueFavorites.some(
          (u) =>
            (u.name && item.name && String(u.name).trim().toLowerCase() === String(item.name).trim().toLowerCase()) ||
            (u.lat != null && item.lat != null && Math.abs(u.lat - item.lat) < 0.0001 && Math.abs(u.lng - item.lng) < 0.0001) ||
            (u.id && item.id && String(u.id) === String(item.id))
        );

        if (!isDuplicate) {
          uniqueFavorites.push(item);
        }
      }
      return uniqueFavorites;
    } catch (e) {
      return [];
    }
  });

  // Saved Routes list fetched from backend
  const [savedRoutes, setSavedRoutes] = useState([]);

  // Sync favorites state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('favoriteLocations', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed to save favorites to localStorage:', e);
    }
  }, [favorites]);

  // Fetch all saved routes for "My Saved Routes" list
  const fetchSavedRoutes = async () => {
    try {
      const response = await axios.get('/api/routes').catch(() =>
        axios.get('http://localhost:5000/api/routes')
      );
      if (response.data && Array.isArray(response.data)) {
        setSavedRoutes(response.data);
      }
    } catch (e) {
      console.warn('Could not fetch saved routes list:', e);
    }
  };

  useEffect(() => {
    fetchSavedRoutes();
  }, []);

  // Delete a saved route from backend database/storage and state
  const handleDeleteSavedRoute = async (shortIdToDelete) => {
    try {
      // Send DELETE request to backend first
      await axios.delete(`/api/routes/${shortIdToDelete}`).catch(() =>
        axios.delete(`http://localhost:5000/api/routes/${shortIdToDelete}`)
      );

      // Only after database/storage deletion succeeds, update React state
      setSavedRoutes((prev) => prev.filter((r) => r.shortId !== shortIdToDelete));

      // If the currently open route was deleted, clear active state and reset URL
      if (createdShortId === shortIdToDelete || shortId === shortIdToDelete) {
        setCreatedShortId(null);
        navigate('/');
      }
    } catch (err) {
      console.error('Failed to delete route:', err);
      alert('Failed to delete route from server. Please try again.');
    }
  };

  // Initial load effect: check localStorage for 'savedDestinations' if no shortId in URL
  useEffect(() => {
    if (!shortId) {
      try {
        const savedData = localStorage.getItem('savedDestinations');
        if (savedData) {
          const parsed = JSON.parse(savedData);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const sanitized = parsed.map((item, idx) => ({
              ...item,
              id: String(item.id || `saved_${idx}_${Date.now()}`),
            }));
            setDestinations(sanitized);
          }
        }
      } catch (e) {
        console.warn('Error loading savedDestinations from localStorage:', e);
      }
    }
  }, [shortId]);

  // Effect listening for changes to destinations array to save to localStorage
  useEffect(() => {
    try {
      if (destinations && destinations.length > 0) {
        localStorage.setItem('savedDestinations', JSON.stringify(destinations));
      } else {
        localStorage.removeItem('savedDestinations');
      }
    } catch (e) {
      console.warn('Error saving savedDestinations to localStorage:', e);
    }
  }, [destinations]);

  // Fetch route if shortId exists in URL on load or URL change
  useEffect(() => {
    if (!shortId) {
      setCreatedShortId(null);
      return;
    }

    async function fetchSavedRoute() {
      setIsLoadingRoute(true);
      setErrorMessage(null);
      try {
        const apiUrl = `/api/routes/${shortId}`;
        const response = await axios.get(apiUrl).catch(() =>
          axios.get(`http://localhost:5000/api/routes/${shortId}`)
        );

        if (response.data && response.data.destinations) {
          const sanitized = response.data.destinations.map((d, idx) => ({
            ...d,
            id: String(d.id || `route_${idx}_${Date.now()}`),
          }));
          setDestinations(sanitized);
          if (response.data.title) {
            setRouteTitle(response.data.title);
          }
          if (response.data.travelMode) {
            setTravelMode(response.data.travelMode);
          }
          setCreatedShortId(shortId);
        }
      } catch (err) {
        console.error('Failed to load saved route:', err);
        setErrorMessage('Could not load the requested route. It may have expired or does not exist.');
      } finally {
        setIsLoadingRoute(false);
      }
    }

    fetchSavedRoute();
  }, [shortId]);

  // Toggle favorite location with strict duplicate prevention
  const handleToggleFavorite = (location) => {
    if (!location) return;

    setFavorites((prev) => {
      const exists = prev.some(
        (f) =>
          (f.name && location.name && String(f.name).trim().toLowerCase() === String(location.name).trim().toLowerCase()) ||
          (f.lat != null && location.lat != null && Math.abs(f.lat - location.lat) < 0.0001 && Math.abs(f.lng - location.lng) < 0.0001) ||
          (f.id && location.id && String(f.id) === String(location.id))
      );

      let updated;
      if (exists) {
        // Toggle OFF: Remove existing favorite
        updated = prev.filter(
          (f) =>
            !(f.name && location.name && String(f.name).trim().toLowerCase() === String(location.name).trim().toLowerCase()) &&
            !(f.lat != null && location.lat != null && Math.abs(f.lat - location.lat) < 0.0001 && Math.abs(f.lng - location.lng) < 0.0001) &&
            (!f.id || !location.id || String(f.id) !== String(location.id))
        );
      } else {
        // Toggle ON: Add to favorites (guaranteed no duplicate will exist)
        const favItem = {
          ...location,
          id: String(location.id || `fav_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`),
        };
        updated = [...prev, favItem];
      }

      try {
        localStorage.setItem('favoriteLocations', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save favoriteLocations to localStorage:', e);
      }

      return updated;
    });
  };

  // Add location to destinations array with duplicate check and unique string ID
  const handleSelectLocation = (newLocation) => {
    if (!newLocation) return;

    setDestinations((prev) => {
      // Check if this location already exists in current route destinations
      const existsInRoute = prev.some(
        (loc) =>
          (loc.name && newLocation.name && String(loc.name).trim().toLowerCase() === String(newLocation.name).trim().toLowerCase()) ||
          (loc.lat != null && newLocation.lat != null && Math.abs(loc.lat - newLocation.lat) < 0.0001 && Math.abs(loc.lng - newLocation.lng) < 0.0001)
      );

      if (existsInRoute) {
        // Already in route itinerary: return existing destinations without adding duplicate
        return prev;
      }

      const locWithId = {
        ...newLocation,
        id: String(newLocation.id || `loc_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`),
      };
      return [...prev, locWithId];
    });
  };

  // Remove location by index or id
  const handleRemoveLocation = (id) => {
    setDestinations((prev) => prev.filter((loc) => String(loc.id) !== String(id)));
  };

  // Clear all destinations
  const handleClearRoute = () => {
    setDestinations([]);
    setRouteTitle('');
    setRouteMetrics(null);
    setCreatedShortId(null);
    localStorage.removeItem('savedDestinations');
    if (shortId) {
      navigate('/');
    }
  };

  // Save route via POST /api/routes and navigate to /[shortId]
  const handleCreateRoute = async () => {
    if (destinations.length === 0) return;

    setIsSaving(true);
    setErrorMessage(null);
    try {
      const titleToSave = routeTitle.trim() || `Route (${destinations.length} stops)`;
      const response = await axios.post('/api/routes', {
        destinations,
        title: titleToSave,
        travelMode,
        totalDistance: routeMetrics?.distance || 0,
        totalDuration: routeMetrics?.duration || 0,
      }).catch(() =>
        axios.post('http://localhost:5000/api/routes', {
          destinations,
          title: titleToSave,
          travelMode,
          totalDistance: routeMetrics?.distance || 0,
          totalDuration: routeMetrics?.duration || 0,
        })
      );

      const newShortId = response.data.shortId;
      if (newShortId) {
        setCreatedShortId(newShortId);
        fetchSavedRoutes();
        navigate(`/${newShortId}`);
      }
    } catch (err) {
      console.error('Error saving route:', err);
      setErrorMessage('Failed to create shareable route. Please check backend connection.');
    } finally {
      setIsSaving(false);
    }
  };

  // Export destinations waypoints to GPX file download
  const handleExportGPX = () => {
    if (!destinations || destinations.length === 0) return;

    // Filter valid stops with non-NaN numeric latitude & longitude
    const validStops = destinations.filter(
      (d) =>
        d &&
        !isNaN(parseFloat(d.lat)) &&
        !isNaN(parseFloat(d.lng != null ? d.lng : d.lon))
    );

    if (validStops.length === 0) {
      alert('Please add at least 1 destination stop with valid coordinates before exporting GPX.');
      return;
    }

    try {
      let gpxXmlString = '';

      // Try generating via togpx library
      try {
        const geojsonFeatureCollection = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: validStops.map((d) => [
                  parseFloat(d.lng != null ? d.lng : d.lon),
                  parseFloat(d.lat),
                ]),
              },
              properties: {
                name: routeTitle || 'my-travel-route',
                description: `Travel route with ${validStops.length} stops`,
              },
            },
          ],
        };

        const converter = typeof togpx === 'function' ? togpx : (togpx.default || togpx);
        gpxXmlString = converter(geojsonFeatureCollection);
      } catch (e) {
        console.warn('togpx library call fallback to standard XML generator:', e);
      }

      // Bulletproof GPX XML generator if library returns empty or throws
      if (!gpxXmlString || typeof gpxXmlString !== 'string' || gpxXmlString.trim().length === 0) {
        const cleanTitle = (routeTitle || 'my-travel-route').replace(/[<>&'"]/g, '');
        const trackPointsXml = validStops
          .map(
            (d, i) =>
              `      <trkpt lat="${parseFloat(d.lat)}" lon="${parseFloat(d.lng != null ? d.lng : d.lon)}">\n        <name>Stop #${i + 1}: ${(d.shortName || d.name || '').replace(/[<>&'"]/g, '')}</name>\n      </trkpt>`
          )
          .join('\n');

        gpxXmlString = `<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="SmartRoutePlanner" xmlns="http://www.topografix.com/GPX/1/1">\n  <metadata>\n    <name>${cleanTitle}</name>\n  </metadata>\n  <trk>\n    <name>${cleanTitle}</name>\n    <trkseg>\n${trackPointsXml}\n    </trkseg>\n  </trk>\n</gpx>`;
      }

      // Create Blob and trigger browser file download
      const blob = new Blob([gpxXmlString], { type: 'application/gpx+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      const fileName = (routeTitle || 'my-travel-route').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
      downloadLink.download = `${fileName}.gpx`;
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // Clean up DOM element and object URL
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating GPX file:', err);
      alert('Error generating GPX file: ' + err.message);
    }
  };

  // Copy shareable link to clipboard
  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/${createdShortId || shortId}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareUrl = (createdShortId || shortId)
    ? `${window.location.origin}/${createdShortId || shortId}`
    : '';

  // Format distance (meters -> km)
  const formatDistance = (meters) => {
    if (!meters) return '0 km';
    const km = meters / 1000;
    return `${km.toFixed(1)} km`;
  };

  // Format duration (seconds -> hrs & mins)
  const formatDuration = (seconds) => {
    if (!seconds) return '0 min';
    const mins = Math.round(seconds / 60);
    if (mins < 60) return `${mins} min`;
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hrs}h ${remMins}m`;
  };

  return (
    <div className="app-container">
      {/* Full-Screen Leaflet Map with OSRM Routing and Dark Tile Layer */}
      <MapComponent
        destinations={destinations}
        travelMode={travelMode}
        onRouteCalculated={(metrics) => setRouteMetrics(metrics)}
        darkMode={darkMode}
      />

      {/* Floating Collapsible Control Panel (Mobile Drawer) */}
      <div className={`overlay-panel ${isPanelCollapsed ? 'collapsed' : ''}`}>
        <div className="panel-header">
          <div className="app-icon">🗺️</div>
          <div className="header-titles">
            <h1 className="panel-title">Smart Route Planner</h1>
            <p className="panel-subtitle">Multi-stop OSRM Road Routing</p>
          </div>
          <div className="header-actions">
            {/* Theme Toggle Button */}
            <button
              className="btn-theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {darkMode ? '🌙 Dark' : '☀️ Light'}
            </button>

            {/* Mobile Drawer Collapse Button */}
            <button
              className="btn-drawer-collapse"
              onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
              title={isPanelCollapsed ? 'Expand panel' : 'Collapse panel'}
            >
              {isPanelCollapsed ? '▲' : '▼'}
            </button>
          </div>
        </div>

        {/* Hide Panel Content when Collapsed */}
        {!isPanelCollapsed && (
          <>
            {/* Tab Navigation */}
            <div className="panel-tabs">
              <button
                className={`tab-btn ${activeTab === 'planner' ? 'active' : ''}`}
                onClick={() => setActiveTab('planner')}
              >
                🗺️ Planner
              </button>
              <button
                className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
                onClick={() => setActiveTab('favorites')}
              >
                ⭐ Favorites ({favorites.length})
              </button>
              <button
                className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
                onClick={() => setActiveTab('saved')}
              >
                📂 Saved ({savedRoutes.length})
              </button>
            </div>

            {/* TAB 1: ROUTE PLANNER VIEW */}
            {activeTab === 'planner' && (
              <>
                {/* Search Box Component with Star feature */}
                <SearchBox
                  onSelectLocation={handleSelectLocation}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />

                {/* Loading / Error Banners */}
                {isLoadingRoute && (
                  <div className="loading-banner">
                    <div className="search-spinner"></div>
                    <span>Loading saved route...</span>
                  </div>
                )}

                {errorMessage && (
                  <div className="empty-state" style={{ color: '#fca5a5', borderColor: '#ef4444' }}>
                    ⚠️ {errorMessage}
                  </div>
                )}

                {/* Shareable URL Card */}
                {shareUrl && !isLoadingRoute && (
                  <div className="share-card">
                    <div className="share-card-header">
                      <span>✨ Route Saved & Shareable!</span>
                    </div>
                    <div className="share-link-wrapper">
                      <input
                        type="text"
                        readOnly
                        className="share-input"
                        value={shareUrl}
                      />
                      <button className="btn-copy" onClick={handleCopyLink}>
                        {copied ? 'Copied! ✓' : 'Copy'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Travel Mode Selector & Metrics */}
                {destinations.length >= 2 && (
                  <div className="metrics-card">
                    <div className="travel-mode-selector">
                      <button
                        className={`btn-mode ${travelMode === 'Driving' || travelMode === 'driving' ? 'active' : ''}`}
                        onClick={() => setTravelMode('Driving')}
                        title="Driving OSRM route"
                      >
                        🚗 Drive
                      </button>
                      <button
                        className={`btn-mode ${travelMode === 'Cycling' || travelMode === 'cycling' || travelMode === 'bike' ? 'active' : ''}`}
                        onClick={() => setTravelMode('Cycling')}
                        title="Cycling OSRM route"
                      >
                        🚴 Cycle
                      </button>
                      <button
                        className={`btn-mode ${travelMode === 'Walking' || travelMode === 'walking' || travelMode === 'foot' ? 'active' : ''}`}
                        onClick={() => setTravelMode('Walking')}
                        title="Walking OSRM route"
                      >
                        🚶 Walk
                      </button>
                    </div>

                    {routeMetrics && (
                      <div className="metrics-stats">
                        <div className="stat-item">
                          <span className="stat-label">Total Distance</span>
                          <span className="stat-value">{formatDistance(routeMetrics.distance)}</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                          <span className="stat-label">Est. Time</span>
                          <span className="stat-value">{formatDuration(routeMetrics.duration)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Destination Stops Section with Drag & Drop */}
                <div className="destinations-section">
                  <div className="destinations-header">
                    <span>Route Destinations</span>
                    <span className="badge-count">{destinations.length}</span>
                  </div>

                  {destinations.length === 0 && !isLoadingRoute ? (
                    <div className="empty-state">
                      <span>📍 Search for a location above to start planning your route.</span>
                    </div>
                  ) : (
                    <DraggableList
                      destinations={destinations}
                      onReorderDestinations={setDestinations}
                      onRemoveLocation={handleRemoveLocation}
                      favorites={favorites}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  )}

                  {/* Route Title Input & Actions */}
                  <div className="action-buttons">
                    {destinations.length > 0 && (
                      <input
                        type="text"
                        className="route-title-input"
                        placeholder="Route Title (e.g., Kerala Roadtrip)"
                        value={routeTitle}
                        onChange={(e) => setRouteTitle(e.target.value)}
                      />
                    )}

                    <button
                      className="btn-create-route"
                      disabled={destinations.length === 0 || isSaving}
                      onClick={handleCreateRoute}
                    >
                      {isSaving ? 'Saving Route...' : '🚀 Save & Share Route'}
                    </button>

                    {destinations.length >= 2 && (
                      <button className="btn-export-gpx" onClick={handleExportGPX}>
                        📥 Export to GPX
                      </button>
                    )}

                    {destinations.length > 0 && (
                      <button className="btn-clear" onClick={handleClearRoute}>
                        Clear Entire Route
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* TAB 2: FAVORITES DISPLAY LIST VIEW */}
            {activeTab === 'favorites' && (
              <div className="favorites-tab-view">
                <h3 className="section-title">Starred Favorite Places</h3>
                {favorites.length === 0 ? (
                  <div className="empty-state">
                    <span>⭐ No favorite places saved yet. Click the star icon (☆) next to any search result or destination stop to star it!</span>
                  </div>
                ) : (
                  <div className="favorites-list">
                    {favorites.map((fav) => (
                      <div key={fav.id || fav.name} className="favorite-card">
                        <div
                          className="fav-info"
                          onClick={() => handleSelectLocation(fav)}
                          title="Click to add to current route"
                        >
                          <span className="fav-icon">📍</span>
                          <div>
                            <div className="fav-title">{fav.shortName || fav.name}</div>
                            <div className="fav-sub">{fav.name}</div>
                          </div>
                        </div>
                        <div className="fav-actions">
                          <button
                            className="btn-add-fav"
                            title="Add to current route"
                            onClick={() => handleSelectLocation(fav)}
                          >
                            + Add
                          </button>
                          <button
                            className="btn-star active"
                            title="Remove from favorites list"
                            onClick={() => handleToggleFavorite(fav)}
                          >
                            ★
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: MY SAVED ROUTES VIEW */}
            {activeTab === 'saved' && (
              <div className="saved-routes-view">
                <h3 className="section-title">My Saved Itineraries</h3>
                {savedRoutes.length === 0 ? (
                  <div className="empty-state">
                    <span>📂 No saved routes yet. Click 'Save & Share Route' to save your trips here!</span>
                  </div>
                ) : (
                  <div className="saved-list">
                    {savedRoutes.map((route) => (
                      <div key={route.shortId} className="saved-route-card">
                        <div
                          className="saved-route-info"
                          onClick={() => {
                            const sanitized = (route.destinations || []).map((d, idx) => ({
                              ...d,
                              id: String(d.id || `loaded_${idx}_${Date.now()}`),
                            }));
                            setDestinations(sanitized);
                            if (route.title) setRouteTitle(route.title);
                            if (route.travelMode) setTravelMode(route.travelMode);
                            setCreatedShortId(route.shortId);
                            setActiveTab('planner');
                            navigate(`/${route.shortId}`);
                          }}
                        >
                          <div className="saved-route-title">
                            🗺️ {route.title || 'Untitled Route'}
                          </div>
                          <div className="saved-route-meta">
                            <span>📍 {route.destinations ? route.destinations.length : 0} stops</span>
                            <span>•</span>
                            <span>{route.travelMode === 'foot' || route.travelMode === 'walking' || route.travelMode === 'Walking' ? '🚶 Walk' : route.travelMode === 'bike' || route.travelMode === 'cycling' || route.travelMode === 'Cycling' ? '🚴 Cycle' : '🚗 Drive'}</span>
                            {route.totalDistance ? (
                              <>
                                <span>•</span>
                                <span>{formatDistance(route.totalDistance)}</span>
                              </>
                            ) : null}
                          </div>
                        </div>

                        <div className="saved-route-actions">
                          <button
                            className="btn-load-route"
                            onClick={() => {
                              const sanitized = (route.destinations || []).map((d, idx) => ({
                                ...d,
                                id: String(d.id || `loaded_${idx}_${Date.now()}`),
                              }));
                              setDestinations(sanitized);
                              if (route.title) setRouteTitle(route.title);
                              if (route.travelMode) setTravelMode(route.travelMode);
                              setCreatedShortId(route.shortId);
                              setActiveTab('planner');
                              navigate(`/${route.shortId}`);
                            }}
                          >
                            Load
                          </button>
                          <button
                            className="btn-delete-saved"
                            title="Delete saved route permanently"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm(`Are you sure you want to delete "${route.title || 'this route'}"?`)) {
                                handleDeleteSavedRoute(route.shortId);
                              }
                            }}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PlannerView />} />
      <Route path="/:shortId" element={<PlannerView />} />
    </Routes>
  );
}
