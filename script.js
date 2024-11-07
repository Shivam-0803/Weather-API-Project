document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherButton = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  const API_KEY = "559577e4ea19585145b4c6a9e75a8348";
  getWeatherButton.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (city === "") {
      return;
    }

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    //gets the data------
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

   const response = await fetch(url);
   console.log(response);

   if(!response.ok){
    throw new Error("City not Found");
   }
   const data = await response.json();
   return data;
  }

  function displayWeatherData(data) {
      //displays the data------
    console.group(data);
    const{name , main , weather} = data;
    cityNameDisplay.textContent = name;


    //unlock the display----
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    temperatureDisplay.textContent = `${main.temp}°C`;
    descriptionDisplay.textContent = weather[0].description;
    

  }

  function showError() {
    //shows error message------
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }
});
