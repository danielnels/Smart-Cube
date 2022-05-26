import React, { useState } from "react";
import "./HomeLeft.css";
import TabNav from "./TabNav/TabNav";

const HomeLeft = ({ temperature, humidity }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const updateTime = () => setTime(new Date().toLocaleTimeString());
  setInterval(updateTime, 1000);
  // console.log(temperature);
  return (
    <div className="home-left">
      <h2 className="time">{time}</h2>
      <TabNav temperature={temperature} humidity={humidity} />
    </div>
  );
};

export default HomeLeft;
