import React, { useState, useEffect } from 'react';
import clearImg from '../assets/clear.png';
import cloudImg from '../assets/cloud.png';
import drizzleImg from '../assets/drizzle.png';
import humidityImg from '../assets/humidity.png';
import rainImg from '../assets/rain.png';
import searchIcon from '../assets/search.png';
import snowImg from '../assets/snow.png';
import windImg from '../assets/wind.png';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clearImg,
    "01n": clearImg,
    "02d": cloudImg,
    "02n": cloudImg,
    "03d": cloudImg,
    "03n": cloudImg,
    "04d": drizzleImg,
    "04n": drizzleImg,
    "09d": rainImg,
    "09n": rainImg,
    "10d": rainImg,
    "10n": rainImg,
    "13d": snowImg,
    "13n": snowImg,
  };

  const search = async (cityName) => {
    try {
      const apiKey = import.meta.env.VITE_APP_ID;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || clearImg;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      alert("Failed to fetch weather data");
      console.error(error);
      setWeatherData(false);
    }
  };

  useEffect(() => {
    search("Chennai");
  }, []);

  return (
    <div className='weather'>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => search(city)}
          style={{ cursor: 'pointer' }}
        />
      </div>

      {weatherData && (
        <>
          <img src={weatherData.icon} alt="weather-icon" className='weather-icon' />
          <p className='temp'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>
          <div className='weather-data'>
            <div className='col'>
              <img src={humidityImg} alt="humidity" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={windImg} alt="wind" />
              <div>
                <p>{weatherData.windSpeed} km/hr</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
