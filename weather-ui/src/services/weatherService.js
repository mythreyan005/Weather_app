import Papa from "papaparse";
const BASE_URL = "https://indianapi.in/weather-api";

export const getWeatherByDate = async (date) => {
  const res = await fetch(`${BASE_URL}?date=${date}`);
  return res.json();
};

export const getMonthlyStats = async (year, month) => {
  const res = await fetch(`${BASE_URL}?year=${year}&month=${month}`);
  return res.json();
};


export const loadWeatherData = async () => {
  const response = await fetch("/weather.csv");
  const text = await response.text();

  return new Promise((resolve) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        resolve(result.data);
      },
    });
  });
};