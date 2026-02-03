import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncSelect from 'react-select/async';
import './App.scss';

function App() {
const [weather, setWeather] = useState(null);
const [history, setHistory] = useState([]);
const [loadingMsg, setLoadingMsg] = useState('');

useEffect(() => {
const saved = JSON.parse(localStorage.getItem('weather_history')) || [];
setHistory(saved);
}, []);

const loadOptions = async (inputValue) => {
if (inputValue.length < 2) return [];
try {
const res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${inputValue}&count=5&language=en&format=json`);
if (!res.data.results) return [];
return res.data.results.map(city => ({
label: `${city.name}, ${city.country}`,
value: { lat: city.latitude, lon: city.longitude }
}));
} catch (err) {
return [];
}
};

const handleSearch = async (selectedOption) => {
if (!selectedOption || !selectedOption.value) return;

setLoadingMsg('Loading...');
const cityName = selectedOption.label;
const { lat, lon } = selectedOption.value;

axios.post('http://localhost:5000/api/log', {
city: cityName,
timestamp: new Date().toLocaleString()
}).catch(() => console.log("Backend offline"));

try {
const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
const res = await axios.get(url);

const currentHour = new Date().getHours();
const humidity = res.data.hourly.relative_humidity_2m[currentHour];

setWeather({
name: cityName,
current: res.data.current_weather,
humidity: humidity,
daily: res.data.daily
});

const updatedHistory = [selectedOption, ...history.filter(item => item.label !== cityName)].slice(0, 3);
setHistory(updatedHistory);
localStorage.setItem('weather_history', JSON.stringify(updatedHistory));

setLoadingMsg('');
} catch (error) {
setLoadingMsg('Error fetching data');
}
};

return (
<div className="app-container">
<h1>Weather <strong>Forecast</strong></h1>

<div className="controls-section">
<AsyncSelect
loadOptions={loadOptions}
onChange={handleSearch}
placeholder="Search for any city..."
cacheOptions
defaultOptions
/>

{history.length > 0 && (
<div className="history-labels">
<span>Recently viewed:</span>
{history.map(city => (
<button key={city.label} onClick={() => handleSearch(city)}>
{city.label.split(',')[0]} 
</button>
))}
</div>
)}
</div>

{loadingMsg && <p className="loading-text">{loadingMsg}</p>}

{weather && !loadingMsg && (
<div className="weather-card">
<div className="main-info">
<div className="city-name">{weather.name}</div>
<div className="temp-large">{Math.round(weather.current.temperature)}°C</div>
</div>

<div className="extra-conditions">
<div className="condition-item">
<strong>Wind:</strong> {weather.current.windspeed} km/h
</div>
<div className="condition-item">
<strong>Humidity:</strong> {weather.humidity}%
</div>
</div>

<div className="forecast-grid">
{weather.daily.time.slice(0, 5).map((date, i) => (
<div key={date} className="day-item">
<span className="date">
{new Date(date).toLocaleDateString('en-GB', {weekday: 'short'})}
</span>
<span className="temp-max">{Math.round(weather.daily.temperature_2m_max[i])}°</span>
<span className="temp-min">{Math.round(weather.daily.temperature_2m_min[i])}°</span>
</div>
))}
</div>
</div>
)}
</div>
);
}

export default App;