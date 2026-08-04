import React, { useState, useEffect, useRef } from 'react';

export default function SearchBox({ onSelectLocation, favorites = [], onToggleFavorite }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Debounced API fetch for OpenStreetMap Nominatim
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}&limit=6&addressdetails=1`,
          {
            headers: {
              'Accept-Language': 'en',
            },
          }
        );
        const data = await response.json();
        setSuggestions(data || []);
        setIsOpen(true);
      } catch (err) {
        console.error('Error fetching Nominatim autocomplete suggestions:', err);
      } finally {
        setIsLoading(false);
      }
    }, 350); // 350ms debounce delay

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    const mainName = item.display_name.split(',')[0];
    const locationData = {
      id: item.place_id ? String(item.place_id) : String(Date.now()),
      name: item.display_name,
      shortName: mainName,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
    };

    onSelectLocation(locationData);
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
  };

  return (
    <div className="search-container" ref={dropdownRef}>
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search location, city, landmark..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && suggestions.length > 0 && setIsOpen(true)}
        />
        {isLoading && <div className="search-spinner"></div>}
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((item) => {
            const mainName = item.display_name.split(',')[0];
            const subName = item.display_name.split(',').slice(1).join(',').trim();
            const locationObj = {
              id: item.place_id ? String(item.place_id) : String(Date.now()),
              name: item.display_name,
              shortName: mainName,
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lon),
            };

            const isFav = favorites.some(
              (f) =>
                String(f.name).trim() === String(item.display_name).trim() ||
                String(f.id) === String(item.place_id) ||
                (Math.abs(f.lat - parseFloat(item.lat)) < 0.0001 &&
                  Math.abs(f.lng - parseFloat(item.lon)) < 0.0001)
            );

            return (
              <li
                key={item.place_id || item.osm_id || Math.random()}
                className="suggestion-item"
                onClick={() => handleSelect(item)}
              >
                <span className="suggestion-icon">📍</span>
                <div className="suggestion-details">
                  <span className="suggestion-title">{mainName}</span>
                  {subName && <span className="suggestion-sub">{subName}</span>}
                </div>
                {onToggleFavorite && (
                  <button
                    className={`btn-star ${isFav ? 'active' : ''}`}
                    title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(locationObj);
                    }}
                  >
                    {isFav ? '★' : '☆'}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
