import React, { useEffect, useState } from "react";
import Temperature from "./componenets/Temperature";
import Highlights from "./componenets/Highlights";

function App() {
  const [city, setCity] = useState("Nagpur");  // bydefault value is Nagpur  save by dynamically
  const [weatherData, setWeatherData] = useState(null);  //it will tell us to weather data 

  useEffect(() => {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=c055f9183df44163bf8140635241003&q=${city}&aqi=no`;

    fetch(apiUrl)  // frtching the data
      .then((res) => {
        if (!res.ok) {   // if respone is false then throe an eror
          throw new Error("Could not get data");
        }
        return res.json();  // and if the response is true then it will convert to json formate and return it
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);  // am sending data to weatherstate state
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city]); // its a dependency array

  return (
    // am using thailwing over here for less code and good redablity
    <div className="bg-slate-800  flex flex-col justify-center items-center md:flex-row md:justify-center md:items-start">
      <div className="w-full md:w-1/5 h-1/3 mt-40 md:mt-0">
        {weatherData && (  // if weatherdata have some value then it will go on temprature component
          <Temperature
            setCity={setCity}
            stats={{
              temp: weatherData.current.temp_c,
              condition: weatherData.current.condition.text,
              isDay: weatherData.current.is_day,
              location: weatherData.location.name,
              time: weatherData.location.localtime,
            }}
          />
        )}
      </div>
      <div className="w-full md:w-1/3 h-1/3 mt-40 p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <h1 className="text-slate-200 text-2xl col-span-2">
          Today's Highlights
        </h1>
        {weatherData && (
          <>
            <Highlights
              stats={{
                title: "Wind Status",
                value: weatherData.current.wind_mph,
                unit: "mph",
                direction: weatherData.current.wind_dir,
              }}
            />
            <Highlights
              stats={{
                title: "Humidity",
                value: weatherData.current.humidity,
                unit: "%",
              }}
            />
            <Highlights
              stats={{
                title: "Visibility",
                value: weatherData.current.vis_miles,
                unit: "miles",
              }}
            />
            <Highlights
              stats={{
                title: "Air Pressure",
                value: weatherData.current.pressure_mb,
                unit: "mb",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;