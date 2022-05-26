import React, { useEffect, useState } from "react";
import HomeRight from "./HomeRight/HomeRight";
import HomeLeft from "./HomeLeft/HomeLeft";
import { Container } from "@material-ui/core";
import "./Dashboard.css";
require("dotenv").config();

const API_KEY = "9d3f8d0c8e62e5ad4c7157553bc15108";
const Dashboard = () => {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          setTemperature(data.main.temp);
          setHumidity(data.main.humidity);
        })
        .catch((error) => console.log(error));
    });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);
  return (
    <div className="dashboard">
      <div className="home-left">
        <HomeLeft temperature={temperature} humidity={humidity} />
      </div>
      <div className="home-right">
        <HomeRight />
      </div>
    </div>
  );
};

export default Dashboard;
