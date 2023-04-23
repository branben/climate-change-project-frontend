import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [weatherData, setWeatherData] = useState([]);


  

  return (
    <div>
      <h1>BeeWatch</h1>
      <ul>
        {weatherData.map((weatherObj, index) => (
          <li key={index}>
            <p>Time: {weatherObj.time}</p>
            <p>Weather Code: {weatherObj.weatherCode}</p>
            <p>Temperature: {weatherObj.temperature}</p>
            <p>Precipitation: {weatherObj.precipitation}</p>
            <p>Wind Speed: {weatherObj.windSpeed}</p>
            <p>Wind Gust: {weatherObj.windGust}</p>
            <p>Bee Activity Level: {weatherObj.beeActivity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
