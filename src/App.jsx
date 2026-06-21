import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedZone, setSelectedZone] = useState('America/New_York');
  const [isAnimating, setIsAnimating] = useState(false);
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
    { name: 'NEW YORK', zone: 'America/New_York', flag: '🇺🇸' },
    { name: 'LOS ANGELES', zone: 'America/Los_Angeles', flag: '🇺🇸' },
    { name: 'MEXICO CITY', zone: 'America/Mexico_City', flag: '🇲🇽' },
    { name: 'TORONTO', zone: 'America/Toronto', flag: '🇨🇦' },
    { name: 'VANCOUVER', zone: 'America/Vancouver', flag: '🇨🇦' },
    { name: 'SAO PAULO', zone: 'America/Sao_Paulo', flag: '🇧🇷' },
    { name: 'BUENOS AIRES', zone: 'America/Argentina/Buenos_Aires', flag: '🇦🇷' },
    { name: 'SANTIAGO', zone: 'America/Santiago', flag: '🇨🇱' },
    { name: 'BOGOTA', zone: 'America/Bogota', flag: '🇨🇴' },
    { name: 'LIMA', zone: 'America/Lima', flag: '🇵🇪' },
    { name: 'LONDON', zone: 'Europe/London', flag: '🇬🇧' },
    { name: 'PARIS', zone: 'Europe/Paris', flag: '🇫🇷' },
    { name: 'BERLIN', zone: 'Europe/Berlin', flag: '🇩🇪' },
    { name: 'MOSCOW', zone: 'Europe/Moscow', flag: '🇷🇺' },
    { name: 'MADRID', zone: 'Europe/Madrid', flag: '🇪🇸' },
    { name: 'ROME', zone: 'Europe/Rome', flag: '🇮🇹' },
    { name: 'AMSTERDAM', zone: 'Europe/Amsterdam', flag: '🇳🇱' },
    { name: 'STOCKHOLM', zone: 'Europe/Stockholm', flag: '🇸🇪' },
    { name: 'KYIV', zone: 'Europe/Kyiv', flag: '🇺🇦' },
    { name: 'ISTANBUL', zone: 'Europe/Istanbul', flag: '🇹🇷' },
    { name: 'DUBAI', zone: 'Asia/Dubai', flag: '🇦🇪' },
    { name: 'TASHKENT', zone: 'Asia/Tashkent', flag: '🇺🇿' },
    { name: 'TOKYO', zone: 'Asia/Tokyo', flag: '🇯🇵' },
    { name: 'SEOUL', zone: 'Asia/Seoul', flag: '🇰🇷' },
    { name: 'BEIJING', zone: 'Asia/Shanghai', flag: '🇨🇳' },
    { name: 'MUMBAI', zone: 'Asia/Kolkata', flag: '🇮🇳' },
    { name: 'BANGKOK', zone: 'Asia/Bangkok', flag: '🇹🇭' },
    { name: 'SINGAPORE', zone: 'Asia/Singapore', flag: '🇸🇬' },
    { name: 'TEL AVIV', zone: 'Asia/Jerusalem', flag: '🇮🇱' },
    { name: 'KARACHI', zone: 'Asia/Karachi', flag: '🇵🇰' },
    { name: 'CAIRO', zone: 'Africa/Cairo', flag: '🇪🇬' },
    { name: 'LAGOS', zone: 'Africa/Lagos', flag: '🇳🇬' },
    { name: 'CAPE TOWN', zone: 'Africa/Johannesburg', flag: '🇿🇦' },
    { name: 'CASABLANCA', zone: 'Africa/Casablanca', flag: '🇲🇦' },
    { name: 'SYDNEY', zone: 'Australia/Sydney', flag: '🇦🇺' },
    { name: 'AUCKLAND', zone: 'Pacific/Auckland', flag: '🇳🇿' },
    { name: 'HONOLULU', zone: 'Pacific/Honolulu', flag: '🇺🇸' },
  ];

  const regions = [
    { name: 'NORTH AMERICA', zones: ['America/New_York','America/Los_Angeles','America/Mexico_City','America/Toronto','America/Vancouver'] },
    { name: 'SOUTH AMERICA', zones: ['America/Sao_Paulo','America/Argentina/Buenos_Aires','America/Santiago','America/Bogota','America/Lima'] },
    { name: 'EUROPE', zones: ['Europe/London','Europe/Paris','Europe/Berlin','Europe/Moscow','Europe/Madrid','Europe/Rome','Europe/Amsterdam','Europe/Stockholm','Europe/Kyiv','Europe/Istanbul'] },
    { name: 'ASIA', zones: ['Asia/Dubai','Asia/Tashkent','Asia/Tokyo','Asia/Seoul','Asia/Shanghai','Asia/Kolkata','Asia/Bangkok','Asia/Singapore','Asia/Jerusalem','Asia/Karachi'] },
    { name: 'AFRICA', zones: ['Africa/Cairo','Africa/Lagos','Africa/Johannesburg','Africa/Casablanca'] },
    { name: 'OCEANIA', zones: ['Australia/Sydney','Pacific/Auckland','Pacific/Honolulu'] },
  ];

  const selectedCity = locations.find(l => l.zone === selectedZone);

  // Generate particle positions
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  return (
    <div className="dashboard-wrapper">
      {/* Advanced Animated Background */}
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
        {/* Selected Country Clock */}
        <div className={`main-clock ${isAnimating ? 'clock-switch' : ''}`}>
          <div className="clock-glow"></div>
          <div className="clock-header">
            <div className="clock-main">
              <span className="country-flag">{selectedCity?.flag || '🌍'}</span>
              <div className="time-display">
                <span className="time-digits">{formatTime(selectedZone)}</span>
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

        {/* World Clock List */}
        <div className="world-clock-card">
          <div className="card-title-bar">
            <h2 className="card-title">🌍 WORLD CLOCK</h2>
            <span className="card-subtitle">{locations.length} CITIES</span>
          </div>

          {regions.map((region) => (
            <div key={region.name} className="region-block">
              <div className="region-header">
                <span className="region-name">{region.name}</span>
                <span className="region-line"></span>
              </div>
              <div className="region-cities">
                {locations
                  .filter(l => region.zones.includes(l.zone))
                  .map((loc, index) => (
                    <div
                      key={index}
                      className={`city-row ${selectedZone === loc.zone ? 'active' : ''}`}
                      onClick={() => handleSelect(loc.zone, loc.name)}
                    >
                      <div className="city-info">
                        <span className="city-flag">{loc.flag}</span>
                        <span className="city-name">{loc.name}</span>
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
            <span>Data updates in real-time via browser timezone API</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;