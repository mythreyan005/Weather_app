function WeatherCard({ data }) {
  if (!data) return null;

  return (
    <div className="card">
      <h3>Weather Details</h3>
      <p><strong>Condition:</strong> {data.condition}</p>
      <p><strong>Temperature:</strong> {data.temperature} °C</p>
      <p><strong>Humidity:</strong> {data.humidity}%</p>
      <p><strong>Pressure:</strong> {data.pressure} hPa</p>
    </div>
  );
}

export default WeatherCard;