import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedZone, setSelectedZone] = useState('America/New_York');
  const [selectedName, setSelectedName] = useState('NEW YORK');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (timeZone) => {
    return currentTime.toLocaleTimeString('en-US', {
      timeZone: timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (timeZone) => {
    return currentTime.toLocaleDateString('en-US', {
      timeZone: timeZone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDay = (timeZone) => {
    return currentTime.toLocaleDateString('en-US', {
      timeZone: timeZone,
      weekday: 'long',
    }).toUpperCase();
  };

  const formatShortDate = (timeZone) => {
    return currentTime.toLocaleDateString('en-US', {
      timeZone: timeZone,
      month: 'short',
      day: 'numeric',
    }).toUpperCase();
  };

  const calculateOffset = (targetZone) => {
    const baseZone = 'UTC';
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    const baseDateStr = currentTime.toLocaleString('en-US', { ...options, timeZone: baseZone });
    const targetDateStr = currentTime.toLocaleString('en-US', { ...options, timeZone: targetZone });
    const baseMs = new Date(baseDateStr).getTime();
    const targetMs = new Date(targetDateStr).getTime();
    const diffHours = Math.round((targetMs - baseMs) / (1000 * 60 * 60));
    return diffHours >= 0 ? `UTC+${diffHours}` : `UTC${diffHours}`;
  };

  const handleSelect = (zone, name) => {
    setSelectedZone(zone);
    setSelectedName(name);
  };

  const locations = [
    // North America
    { name: 'NEW YORK', zone: 'America/New_York', flag: '🇺🇸' },
    { name: 'LOS ANGELES', zone: 'America/Los_Angeles', flag: '🇺🇸' },
    { name: 'MEXICO CITY', zone: 'America/Mexico_City', flag: '🇲🇽' },
    { name: 'TORONTO', zone: 'America/Toronto', flag: '🇨🇦' },
    { name: 'VANCOUVER', zone: 'America/Vancouver', flag: '🇨🇦' },
    // South America
    { name: 'SAO PAULO', zone: 'America/Sao_Paulo', flag: '🇧🇷' },
    { name: 'BUENOS AIRES', zone: 'America/Argentina/Buenos_Aires', flag: '🇦🇷' },
    { name: 'SANTIAGO', zone: 'America/Santiago', flag: '🇨🇱' },
    { name: 'BOGOTA', zone: 'America/Bogota', flag: '🇨🇴' },
    { name: 'LIMA', zone: 'America/Lima', flag: '🇵🇪' },
    // Europe
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
    // Asia
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
    // Africa
    { name: 'CAIRO', zone: 'Africa/Cairo', flag: '🇪🇬' },
    { name: 'LAGOS', zone: 'Africa/Lagos', flag: '🇳🇬' },
    { name: 'CAPE TOWN', zone: 'Africa/Johannesburg', flag: '🇿🇦' },
    { name: 'CASABLANCA', zone: 'Africa/Casablanca', flag: '🇲🇦' },
    // Australia & Pacific
    { name: 'SYDNEY', zone: 'Australia/Sydney', flag: '🇦🇺' },
    { name: 'AUCKLAND', zone: 'Pacific/Auckland', flag: '🇳🇿' },
    { name: 'HONOLULU', zone: 'Pacific/Honolulu', flag: '🇺🇸' },
  ];

  const selectedCity = locations.find(l => l.zone === selectedZone);

  return (
    <div className="dashboard-wrapper">
      <div className="shader-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="container">
        {/* Selected Country Clock */}
        <div className="weather-card selected-card">
          <div className="card-header">
            <div className="selected-flag-time">
              <span className="big-flag">{selectedCity?.flag || '🌍'}</span>
              <span className="big-time">{formatTime(selectedZone)}</span>
            </div>
            <button className="menu-btn">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <div className="card-body">
            <div className="offset-badge">{calculateOffset(selectedZone)}</div>
          </div>
          <div className="card-footer">
            <div className="time-location">
              <span className="location">{selectedCity?.name || selectedName}</span>
              <span className="time-label">CURRENT TIME</span>
            </div>
            <div className="date-day">
              <span className="day">{formatDay(selectedZone)}</span>
              <span className="date">{formatShortDate(selectedZone)}</span>
            </div>
          </div>
        </div>

        {/* World Locations */}
        <div className="locations-card">
          <h2 className="section-title">🌍 WORLD CLOCK</h2>
          <div className="region-group">
            <h3 className="region-title">NORTH AMERICA</h3>
            <ul className="location-list">
              {locations.filter(l => ['America/New_York','America/Los_Angeles','America/Mexico_City','America/Toronto','America/Vancouver'].includes(l.zone)).map((loc, index) => (
                <li key={index} className={`location-item ${selectedZone === loc.zone ? 'active' : ''}`} onClick={() => handleSelect(loc.zone, loc.name)}>
                  <span className="city">
                    <span className="flag-small">{loc.flag}</span>
                    {loc.name}
                    <span className="offset">{calculateOffset(loc.zone)}</span>
                  </span>
                  <span className="local-time">{formatTime(loc.zone)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="region-group">
            <h3 className="region-title">SOUTH AMERICA</h3>
            <ul className="location-list">
              {locations.filter(l => ['America/Sao_Paulo','America/Argentina/Buenos_Aires','America/Santiago','America/Bogota','America/Lima'].includes(l.zone)).map((loc, index) => (
                <li key={index} className={`location-item ${selectedZone === loc.zone ? 'active' : ''}`} onClick={() => handleSelect(loc.zone, loc.name)}>
                  <span className="city">
                    <span className="flag-small">{loc.flag}</span>
                    {loc.name}
                    <span className="offset">{calculateOffset(loc.zone)}</span>
                  </span>
                  <span className="local-time">{formatTime(loc.zone)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="region-group">
            <h3 className="region-title">EUROPE</h3>
            <ul className="location-list">
              {locations.filter(l => ['Europe/London','Europe/Paris','Europe/Berlin','Europe/Moscow','Europe/Madrid','Europe/Rome','Europe/Amsterdam','Europe/Stockholm','Europe/Kyiv','Europe/Istanbul'].includes(l.zone)).map((loc, index) => (
                <li key={index} className={`location-item ${selectedZone === loc.zone ? 'active' : ''}`} onClick={() => handleSelect(loc.zone, loc.name)}>
                  <span className="city">
                    <span className="flag-small">{loc.flag}</span>
                    {loc.name}
                    <span className="offset">{calculateOffset(loc.zone)}</span>
                  </span>
                  <span className="local-time">{formatTime(loc.zone)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="region-group">
            <h3 className="region-title">ASIA</h3>
            <ul className="location-list">
              {locations.filter(l => ['Asia/Dubai','Asia/Tashkent','Asia/Tokyo','Asia/Seoul','Asia/Shanghai','Asia/Kolkata','Asia/Bangkok','Asia/Singapore','Asia/Jerusalem','Asia/Karachi'].includes(l.zone)).map((loc, index) => (
                <li key={index} className={`location-item ${selectedZone === loc.zone ? 'active' : ''}`} onClick={() => handleSelect(loc.zone, loc.name)}>
                  <span className="city">
                    <span className="flag-small">{loc.flag}</span>
                    {loc.name}
                    <span className="offset">{calculateOffset(loc.zone)}</span>
                  </span>
                  <span className="local-time">{formatTime(loc.zone)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="region-group">
            <h3 className="region-title">AFRICA</h3>
            <ul className="location-list">
              {locations.filter(l => ['Africa/Cairo','Africa/Lagos','Africa/Johannesburg','Africa/Casablanca'].includes(l.zone)).map((loc, index) => (
                <li key={index} className={`location-item ${selectedZone === loc.zone ? 'active' : ''}`} onClick={() => handleSelect(loc.zone, loc.name)}>
                  <span className="city">
                    <span className="flag-small">{loc.flag}</span>
                    {loc.name}
                    <span className="offset">{calculateOffset(loc.zone)}</span>
                  </span>
                  <span className="local-time">{formatTime(loc.zone)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="region-group">
            <h3 className="region-title">AUSTRALIA & PACIFIC</h3>
            <ul className="location-list">
              {locations.filter(l => ['Australia/Sydney','Pacific/Auckland','Pacific/Honolulu'].includes(l.zone)).map((loc, index) => (
                <li key={index} className={`location-item ${selectedZone === loc.zone ? 'active' : ''}`} onClick={() => handleSelect(loc.zone, loc.name)}>
                  <span className="city">
                    <span className="flag-small">{loc.flag}</span>
                    {loc.name}
                    <span className="offset">{calculateOffset(loc.zone)}</span>
                  </span>
                  <span className="local-time">{formatTime(loc.zone)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;