import { useEffect, useState } from "react";
import "./App.css";
import DateSearch from "./components/DateSearch";
import MonthSearch from "./components/MonthSearch";
import WeatherCard from "./components/WeatherCard";
import StatsCard from "./components/StatsCard";
import { loadWeatherData } from "./services/weatherService";

function App() {
  const [data, setData] = useState([]);
  const [weather, setWeather] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await loadWeatherData();
      setData(result);
    };
    fetchData();
  }, []);

  const handleDateSearch = (date) => {
    const filtered = data.find((item) =>
      item.datetime_utc?.startsWith(date.replaceAll("-", ""))
    );

    if (!filtered) return;

    setWeather({
      condition: filtered._conds,
      temperature: filtered._tempm,
      humidity: filtered._hum,
      pressure: filtered._pressurem,
    });
  };

  const handleMonthSearch = (year, month) => {
    const filtered = data.filter((item) => {
      if (!item.datetime_utc) return false;

      const datePart = item.datetime_utc.split("-")[0];
      const y = datePart.substring(0, 4);
      const m = datePart.substring(4, 6);

      return y === year && m === month.padStart(2, "0");
    });

    const temps = filtered
      .map((item) => Number(item._tempm))
      .filter((t) => !isNaN(t) && t !== -9999);

    if (temps.length === 0) return;

    temps.sort((a, b) => a - b);

    const min = temps[0];
    const high = temps[temps.length - 1];
    const median =
      temps.length % 2 === 0
        ? (temps[temps.length / 2 - 1] + temps[temps.length / 2]) / 2
        : temps[Math.floor(temps.length / 2)];

    setStats({ min, high, median });
  };

  return (
    <div className="container">
      <h1>Delhi Weather Dashboard</h1>

      <div className="grid">
        <DateSearch onSearch={handleDateSearch} />
        <MonthSearch onSearch={handleMonthSearch} />
      </div>

      <WeatherCard data={weather} />
      <StatsCard stats={stats} />
    </div>
  );
}

export default App;