import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import "./App.scss";

const weatherConfig = {
  0: { label: "Clear sky", icon: "☀️" },
  1: { label: "Mainly clear", icon: "🌤️" },
  2: { label: "Partly cloudly", icon: "⛅" },
  3: { label: "Overcast", icon: "☁️" },
  45: { label: "Foggy", icon: "🌫️" },
  48: { label: "Depositing rime fog", icon: "🌫️" },
  51: { label: "Light drizzle", icon: "🌦️" },
  61: { label: "Rainy", icon: "🌧️" },
  71: { label: "Snowy", icon: "❄️" },
  95: { label: "Thunderstorm", icon: "⛈️" },
};

function App() {
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("weather_history")) || [],
  );
  const [loadingMsg, setLoadingMsg] = useState("");

  const getBackgroundClass = (code) => {
    const hour = new Date().getHours();
    const isNight = hour >= 20 || hour <= 6;
    if (code === undefined || code === null) return "default-bg";

    const c = Number(code);

    if (isNight && c <= 3) return "night-bg";

    if (c === 0) return "sunny-bg";
    if (c >= 1 && c <= 3) return "cloudy-bg";
    if (c >= 45 && c <= 67) return "rainy-bg";
    if (c >= 71) return "snowy-bg";
    return "default-bg";
  };

  const loadOptions = async (inputValue) => {
    if (!inputValue) return [];
    try {
      const res = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${inputValue}`,
      );
      return (
        res.data.results?.map((city) => ({
          label: `${city.name}, ${city.country}`,
          value: { lat: city.latitude, lon: city.longitude },
        })) || []
      );
    } catch {
      return [];
    }
  };

  const handleSearch = async (selectedOption) => {
    if (!selectedOption) return;
    setLoadingMsg("Loading...");
    const { lat, lon } = selectedOption.value;
    const cityName = selectedOption.label;

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
      const res = await axios.get(url);

      const currentHour = new Date().getHours();
      setWeather({
        name: cityName,
        current: res.data.current_weather,
        humidity: res.data.hourly.relative_humidity_2m[currentHour],
        daily: res.data.daily,
      });

      const updatedHistory = [
        selectedOption,
        ...history.filter((item) => item.label !== cityName),
      ].slice(0, 3);
      setHistory(updatedHistory);
      localStorage.setItem("weather_history", JSON.stringify(updatedHistory));
      setLoadingMsg("");
    } catch (error) {
      setLoadingMsg("Error fetching data");
    }
  };

  return (
    <div
      className={`app-container ${getBackgroundClass(weather?.current?.weathercode)}`}
    >
      <h1>
        Weather <strong>Forecast</strong>
      </h1>

      <div className="controls-section">
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          onChange={handleSearch}
          placeholder="Search for any city..."
          isClearable
          className="city-select"
          styles={{
            option: (providet) => ({ ...providet, color: "#333" }),
            singleValue: (providet) => ({ ...providet, color: "#333" }),
            input: (providet) => ({ ...providet, color: "#333" }),
          }}
        />

        {history.length > 0 && (
          <div className="history-labels">
            <span>Recently viewed:</span>
            {history.map((city) => (
              <button key={city.label} onClick={() => handleSearch(city)}>
                {city.label.split(",")[0]}
              </button>
            ))}
          </div>
        )}
      </div>

      {loadingMsg && <p className="loading-text">{loadingMsg}</p>}

      {weather && !loadingMsg && (
        <div className="weather-card">
          <div className="main-info">
            <div className="city-info">
              <h2 className="city-name">{weather.name}</h2>
              <div className="weather-status">
                <span className="weather-icon">
                  {weatherConfig[weather.current.weathercode]?.icon || "🌡️"}
                </span>
                <p>
                  {weatherConfig[weather.current.weathercode]?.label ||
                    "Moderate"}
                </p>
              </div>
            </div>
            <div className="temp-large">
              {Math.round(weather.current.temperature)}°C
            </div>
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
                  {new Date(date).toLocaleDateString("en-GB", {
                    weekday: "short",
                  })}
                </span>
                <span className="temp-max">
                  {Math.round(weather.daily.temperature_2m_max[i])}°
                </span>
                <span className="temp-min">
                  {Math.round(weather.daily.temperature_2m_min[i])}°
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
