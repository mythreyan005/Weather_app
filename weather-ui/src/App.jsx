import { useState } from "react";
import "./index.css";
import { getWeatherByCityAndDate } from "./services/weatherService";

function App() {
  const [city, setCity] = useState("");
  const [date, setDate] = useState(""); 
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!city || !date) {
      setError("Please enter both city and date");
      setWeather(null);
      return;
    }

    try {
      setError("");
      const data = await getWeatherByCityAndDate(city, date);
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="card">
          <h2>{weather.city}</h2>
          <p><strong>Date:</strong> {weather.date}</p>
          <p><strong>Temperature:</strong> {weather.temperature} °C</p>
          <p><strong>Humidity:</strong> {weather.humidity} %</p>
          <p><strong>Pressure:</strong> {weather.pressure} hPa</p>
        </div>
      )}
    </div>
  );
}

export default App;