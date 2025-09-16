"use client";

import { useEffect, useState } from "react";

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  city: string;
  feels_like: number;
  humidity: number;
  wind_speed: number;
}

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

const GoogleStyleWeatherCard = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Dhaka,BD&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();

        if (res.ok) {
          setWeather({
            temp: data.main.temp,
            feels_like: data.main.feels_like,
            humidity: data.main.humidity,
            wind_speed: data.wind.speed,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            city: data.name,
          });
        } else {
          console.error("API error:", data);
        }
      } catch (err) {
        console.error("Failed to fetch weather:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center animate-pulse">
        Loading weather...
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-red-500">
        Failed to load weather data.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-3/3  mx-3 text-gray-800">
      {/* City & Temp */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{weather.city}</h2>
        <p className="text-3xl font-bold">{Math.round(weather.temp)}°C</p>
      </div>

      {/* Description & Icon */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
          className="w-16 h-16"
        />
        <p className="capitalize text-lg">{weather.description}</p>
      </div>

      {/* Additional info */}
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div>Feels like: {Math.round(weather.feels_like)}°C</div>
        <div>Humidity: {weather.humidity}%</div>
        <div>Wind: {weather.wind_speed} m/s</div>
        <div>Pressure: {Math.round(weather.temp * 10)} hPa</div>
      </div>
    </div>
  );
};

export default GoogleStyleWeatherCard;
