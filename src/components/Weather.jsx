import React, { useState } from "react";
import axios from "axios";
import bgImg from "../assets/bg.jpeg";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=16f01dd38ce4a5ade7816b3832b6c1f4&units=metric`
      );
      setWeather(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative w-screen h-screen font-['Poppins']">
      {/* Background */}
      <img
        src={bgImg}
        alt="bg"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-80 brightness-50"
      />

      {/* Center Card */}
      <div className="absolute inset-0 flex justify-center items-center z-50">
        <div className="w-fit p-8 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-500 rounded-3xl shadow-2xl text-white text-center backdrop-blur-md">
          {/* Title */}
          <h1 className="text-6xl font-bold mb-6 tracking-wide drop-shadow-md text-black">
            🌤️ Weather App
          </h1>

          {/* Search Box */}
          <div className="flex gap-2 justify-center mb-6">
            <input
              type="text"
              placeholder="Enter city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="px-6 py-3 rounded-lg text-black w-2/3 outline-none focus:ring-2 focus:ring-purple-400 text-xl"
            />
            <button
              onClick={fetchWeather}
              className="px-5 py-2 bg-black/40 rounded-lg hover:bg-black/60 transition font-semibold text-xl"
            >
              Search
            </button>
          </div>

          {/* Weather Report */}
          {weather && (
            <div className="mt-6 space-y-3">
              <h2 className="text-4xl font-semibold text-black">{weather.name}</h2>
              <p className="text-5xl font-bold text-black">{Math.round(weather.main.temp)}°C</p>
              <p className="capitalize text-2xl text-black font-semibold opacity-90">
                {weather.weather[0].description}
              </p>

              <div className="flex justify-around mt-4 text-sm">
                <div className="flex flex-col items-center">
                  <span className="text-6xl">💧</span>
                  <span className="font-medium text-2xl text-black">{weather.main.humidity}%</span>
                  <span className="opacity-80 text-2xl text-black">Humidity</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-6xl">💨</span>
                  <span className="font-medium text-2xl text-black">{weather.wind.speed} m/s</span>
                  <span className="opacity-80 text-2xl text-black">Wind</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
