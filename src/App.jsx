import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedZone, setSelectedZone] = useState('America/New_York');
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const previousZone = useRef('America/New_York');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = useCallback((timeZone) => {
    return currentTime.toLocaleTimeString('en-US', {
      timeZone: timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  }, [currentTime]);

  const formatDay = useCallback((timeZone) => {
    return currentTime.toLocaleDateString('en-US', {
      timeZone: timeZone,
      weekday: 'long',
    }).toUpperCase();
  }, [currentTime]);

  const formatShortDate = useCallback((timeZone) => {
    return currentTime.toLocaleDateString('en-US', {
      timeZone: timeZone,
      month: 'short',
      day: 'numeric',
    }).toUpperCase();
  }, [currentTime]);

  const calculateOffset = useCallback((targetZone) => {
    const baseZone = 'UTC';
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    const baseDateStr = currentTime.toLocaleString('en-US', { ...options, timeZone: baseZone });
    const targetDateStr = currentTime.toLocaleString('en-US', { ...options, timeZone: targetZone });
    const baseMs = new Date(baseDateStr).getTime();
    const targetMs = new Date(targetDateStr).getTime();
    const diffHours = Math.round((targetMs - baseMs) / (1000 * 60 * 60));
    return diffHours >= 0 ? `UTC+${diffHours}` : `UTC${diffHours}`;
  }, [currentTime]);

  const handleSelect = (zone, name) => {
    if (zone === selectedZone) return;
    previousZone.current = selectedZone;
    setIsAnimating(true);
    setSelectedZone(zone);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const locations = [
    { name: 'NEW YORK', zone: 'America/New_York', flag: '🇺🇸', country: 'UNITED STATES' },
    { name: 'LOS ANGELES', zone: 'America/Los_Angeles', flag: '🇺🇸', country: 'UNITED STATES' },
    { name: 'MEXICO CITY', zone: 'America/Mexico_City', flag: '🇲🇽', country: 'MEXICO' },
    { name: 'TORONTO', zone: 'America/Toronto', flag: '🇨🇦', country: 'CANADA' },
    { name: 'VANCOUVER', zone: 'America/Vancouver', flag: '🇨🇦', country: 'CANADA' },
    { name: 'SAO PAULO', zone: 'America/Sao_Paulo', flag: '🇧🇷', country: 'BRAZIL' },
    { name: 'BUENOS AIRES', zone: 'America/Argentina/Buenos_Aires', flag: '🇦🇷', country: 'ARGENTINA' },
    { name: 'SANTIAGO', zone: 'America/Santiago', flag: '🇨🇱', country: 'CHILE' },
    { name: 'BOGOTA', zone: 'America/Bogota', flag: '🇨🇴', country: 'COLOMBIA' },
    { name: 'LIMA', zone: 'America/Lima', flag: '🇵🇪', country: 'PERU' },
    { name: 'LONDON', zone: 'Europe/London', flag: '🇬🇧', country: 'UNITED KINGDOM' },
    { name: 'PARIS', zone: 'Europe/Paris', flag: '🇫🇷', country: 'FRANCE' },
    { name: 'BERLIN', zone: 'Europe/Berlin', flag: '🇩🇪', country: 'GERMANY' },
    { name: 'MOSCOW', zone: 'Europe/Moscow', flag: '🇷🇺', country: 'RUSSIA' },
    { name: 'MADRID', zone: 'Europe/Madrid', flag: '🇪🇸', country: 'SPAIN' },
    { name: 'ROME', zone: 'Europe/Rome', flag: '🇮🇹', country: 'ITALY' },
    { name: 'AMSTERDAM', zone: 'Europe/Amsterdam', flag: '🇳🇱', country: 'NETHERLANDS' },
    { name: 'STOCKHOLM', zone: 'Europe/Stockholm', flag: '🇸🇪', country: 'SWEDEN' },
    { name: 'KYIV', zone: 'Europe/Kyiv', flag: '🇺🇦', country: 'UKRAINE' },
    { name: 'ISTANBUL', zone: 'Europe/Istanbul', flag: '🇹🇷', country: 'TURKEY' },
    { name: 'DUBAI', zone: 'Asia/Dubai', flag: '🇦🇪', country: 'UAE' },
    { name: 'TASHKENT', zone: 'Asia/Tashkent', flag: '🇺🇿', country: 'UZBEKISTAN' },
    { name: 'TOKYO', zone: 'Asia/Tokyo', flag: '🇯🇵', country: 'JAPAN' },
    { name: 'SEOUL', zone: 'Asia/Seoul', flag: '🇰🇷', country: 'SOUTH KOREA' },
    { name: 'BEIJING', zone: 'Asia/Shanghai', flag: '🇨🇳', country: 'CHINA' },
    { name: 'MUMBAI', zone: 'Asia/Kolkata', flag: '🇮🇳', country: 'INDIA' },
    { name: 'BANGKOK', zone: 'Asia/Bangkok', flag: '🇹🇭', country: 'THAILAND' },
    { name: 'SINGAPORE', zone: 'Asia/Singapore', flag: '🇸🇬', country: 'SINGAPORE' },
    { name: 'TEL AVIV', zone: 'Asia/Jerusalem', flag: '🇮🇱', country: 'ISRAEL' },
    { name: 'KARACHI', zone: 'Asia/Karachi', flag: '🇵🇰', country: 'PAKISTAN' },
    { name: 'CAIRO', zone: 'Africa/Cairo', flag: '🇪🇬', country: 'EGYPT' },
    { name: 'LAGOS', zone: 'Africa/Lagos', flag: '🇳🇬', country: 'NIGERIA' },
    { name: 'CAPE TOWN', zone: 'Africa/Johannesburg', flag: '🇿🇦', country: 'SOUTH AFRICA' },
    { name: 'CASABLANCA', zone: 'Africa/Casablanca', flag: '🇲🇦', country: 'MOROCCO' },
    { name: 'SYDNEY', zone: 'Australia/Sydney', flag: '🇦🇺', country: 'AUSTRALIA' },
    { name: 'AUCKLAND', zone: 'Pacific/Auckland', flag: '🇳🇿', country: 'NEW ZEALAND' },
    { name: 'HONOLULU', zone: 'Pacific/Honolulu', flag: '🇺🇸', country: 'UNITED STATES' },
  ];

  const regions = [
    { name: 'NORTH AMERICA', zones: ['America/New_York','America/Los_Angeles','America/Mexico_City','America/Toronto','America/Vancouver'] },
    { name: 'SOUTH AMERICA', zones: ['America/Sao_Paulo','America/Argentina/Buenos_Aires','America/Santiago','America/Bogota','America/Lima'] },
    { name: 'EUROPE', zones: ['Europe/London','Europe/Paris','Europe/Berlin','Europe/Moscow','Europe/Madrid','Europe/Rome','Europe/Amsterdam','Europe/Stockholm','Europe/Kyiv','Europe/Istanbul'] },
    { name: 'ASIA', zones: ['Asia/Dubai','Asia/Tashkent','Asia/Tokyo','Asia/Seoul','Asia/Shanghai','Asia/Kolkata','Asia/Bangkok','Asia/Singapore','Asia/Jerusalem','Asia/Karachi'] },
    { name: 'AFRICA', zones: ['Africa/Cairo','Africa/Lagos','Africa/Johannesburg','Africa/Casablanca'] },
    { name: 'OCEANIA', zones: ['Australia/Sydney','Pacific/Auckland','Pacific/Honolulu'] },
  ];

  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return locations.filter(loc => 
      loc.name.toLowerCase().includes(q) || 
      loc.country.toLowerCase().includes(q) ||
      loc.zone.toLowerCase().includes(q)
    );
  }, [searchQuery, locations]);

  const selectedCity = locations.find(l => l.zone === selectedZone);

  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  const renderCityRow = (loc) => (
    <div
      key={loc.zone}
      className={`city-row ${selectedZone === loc.zone ? 'active' : ''}`}
      onClick={() => handleSelect(loc.zone, loc.name)}
    >
      <div className="city-info">
        <span className="city-flag">{loc.flag}</span>
        <div className="city-name-group">
          <span className="city-name">{loc.name}</span>
          <span className="city-country">{loc.country}</span>
        </div>
        <span className="city-offset">{calculateOffset(loc.zone)}</span>
      </div>
      <div className="city-time">
        <span className="city-time-digits">{formatTime(loc.zone)}</span>
        <div className="select-indicator">
          <div className="indicator-ring"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-wrapper">
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="gradient-orb orb-4"></div>
        <div className="grid-overlay"></div>
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              opacity: p.opacity,
            }}
          />
        ))}
        <div className="scanline"></div>
      </div>

      <div className="container">
        {/* Main Clock */}
        <div className={`main-clock ${isAnimating ? 'clock-switch' : ''}`}>
          <div className="clock-glow"></div>
          <div className="clock-header">
            <div className="clock-main">
              <span className="country-flag">{selectedCity?.flag || '🌍'}</span>
              <div className="time-display">
                <span className="time-digits">{formatTime(selectedZone)}</span>
                <span className="time-seconds-label">{selectedCity?.country || ''}</span>
              </div>
            </div>
            <div className="clock-actions">
              <div className="offset-pill">{calculateOffset(selectedZone)}</div>
              <div className="status-dot"></div>
            </div>
          </div>
          <div className="clock-divider"></div>
          <div className="clock-footer">
            <div className="footer-left">
              <span className="country-name">{selectedCity?.name || selectedName}</span>
              <span className="live-badge">● LIVE</span>
            </div>
            <div className="footer-right">
              <span className="current-day">{formatDay(selectedZone)}</span>
              <span className="current-date">{formatShortDate(selectedZone)}</span>
            </div>
          </div>
        </div>

        {/* World Clock Card */}
        <div className="world-clock-card">
          <div className="card-title-bar">
            <h2 className="card-title">🌍 WORLD CLOCK</h2>
            <span className="card-subtitle">{locations.length} CITIES</span>
          </div>

          {/* Search Input */}
          <div className="search-container">
            <div className="search-icon">🔍</div>
            <input
              ref={searchInputRef}
              type="text"
              className="search-input"
              placeholder="Search country or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery('')}>
                ✕
              </button>
            )}
          </div>

          {/* Search Results */}
          {filteredLocations && (
            <div className="search-results">
              <div className="search-results-header">
                <span>SEARCH RESULTS ({filteredLocations.length})</span>
                <span className="region-line"></span>
              </div>
              {filteredLocations.length > 0 ? (
                <div className="region-cities">
                  {filteredLocations.map((loc) => (
                    <div
                      key={loc.zone}
                      className={`city-row ${selectedZone === loc.zone ? 'active' : ''}`}
                      onClick={() => {
                        handleSelect(loc.zone, loc.name);
                        setSearchQuery('');
                      }}
                    >
                      <div className="city-info">
                        <span className="city-flag">{loc.flag}</span>
                        <div className="city-name-group">
                          <span className="city-name">{loc.name}</span>
                          <span className="city-country">{loc.country}</span>
                        </div>
                        <span className="city-offset">{calculateOffset(loc.zone)}</span>
                      </div>
                      <div className="city-time">
                        <span className="city-time-digits">{formatTime(loc.zone)}</span>
                        <div className="select-indicator">
                          <div className="indicator-ring"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <span>🔍</span>
                  <p>No cities found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          )}

          {/* Regions */}
          {!filteredLocations && regions.map((region) => (
            <div key={region.name} className="region-block">
              <div className="region-header">
                <span className="region-name">{region.name}</span>
                <span className="region-line"></span>
              </div>
              <div className="region-cities">
                {locations
                  .filter(l => region.zones.includes(l.zone))
                  .map((loc) => (
                    <div
                      key={loc.zone}
                      className={`city-row ${selectedZone === loc.zone ? 'active' : ''}`}
                      onClick={() => handleSelect(loc.zone, loc.name)}
                    >
                      <div className="city-info">
                        <span className="city-flag">{loc.flag}</span>
                        <div className="city-name-group">
                          <span className="city-name">{loc.name}</span>
                          <span className="city-country">{loc.country}</span>
                        </div>
                        <span className="city-offset">{calculateOffset(loc.zone)}</span>
                      </div>
                      <div className="city-time">
                        <span className="city-time-digits">{formatTime(loc.zone)}</span>
                        <div className="select-indicator">
                          <div className="indicator-ring"></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}

          <div className="card-footer-info">
            <div className="footer-glow"></div>
            <span>Real-time data via browser timezone API</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;