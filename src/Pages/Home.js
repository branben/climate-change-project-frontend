import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Pages/Home.css"

const Home = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");


  // Changes date of Climate Data to readable text eg. January 1, 2021 etc
  function formattedDate(date) {
    const dob = new Date(date);
    const month = dob.toLocaleString("default", { month: "long" });
    const day = dob.getDate();
    const year = dob.getFullYear();

    return month + " " + day + ", " + year;
  }

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const filteredData = selectedMonth
  ? weatherData.filter((weatherObj) => weatherObj.time.includes(selectedMonth))
  : weatherData;


  const calculateBeeActivityLevel = (temperature, windSpeed, precipitation) => {
    let beeActivity = 10;
    if (temperature > 95 || temperature < 25) {
      beeActivity -= 3;
    }
    if (windSpeed > 20) {
      beeActivity -= 3;
    }
    if (precipitation > 2) {
      beeActivity -= 3;
    }
    if (beeActivity < 1) {
      beeActivity = 1;
    }
    return beeActivity;
  };

  useEffect(() => {
    const apiUrl =
      "https://archive-api.open-meteo.com/v1/archive?latitude=40.71&longitude=-74.01&start_date=2022-01-01&end_date=2023-04-18&daily=weathercode,temperature_2m_mean,precipitation_sum,windspeed_10m_max,windgusts_10m_max&timezone=America%2FNew_York";

    axios
      .get(apiUrl)
      .then((response) => {
        const dailyData = response.data.daily;
        const timeArray = dailyData.time;
        const weatherObjs = [];

        timeArray.forEach((time, index) => {
          const temperature = dailyData.temperature_2m_mean[index];
          const windSpeed = dailyData.windspeed_10m_max[index];
          const precipitation = dailyData.precipitation_sum[index];
          const beeActivity = calculateBeeActivityLevel(
            temperature,
            windSpeed,
            precipitation
          );

          const weatherObj = {
            time: formattedDate(time),
            weatherCode: dailyData.weathercode[index],
            temperature: temperature,
            precipitation: precipitation,
            windSpeed: windSpeed,
            windGust: dailyData.windgusts_10m_max[index],
            beeActivity: beeActivity,
          };

          weatherObjs.push(weatherObj);
        });

        setWeatherData(weatherObjs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="data">
      <h1>BeeWatch</h1>
      <select value={selectedMonth} onChange={handleMonthChange}>
        <option value="">Filter by Month</option>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>
      <ul className="info">
        {filteredData.map((weatherObj, index) => (
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
