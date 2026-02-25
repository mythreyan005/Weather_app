

export const getWeatherByCityAndDate = async (city, date) => {
  
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
  );

  if (!geoRes.ok) throw new Error("City not found");

  const geoData = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("City not found");
  }

  const { latitude, longitude, name } = geoData.results[0];

 
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,surface_pressure&timezone=auto&start_date=${date}&end_date=${date}`
  );

  if (!weatherRes.ok) throw new Error("Weather fetch failed");

  const weatherData = await weatherRes.json();

 
  const hourIndex = 0;

  return {
    city: name,
    date: date,
    temperature: weatherData.hourly.temperature_2m[hourIndex],
    humidity: weatherData.hourly.relative_humidity_2m[hourIndex],
    pressure: weatherData.hourly.surface_pressure[hourIndex],
  };
};