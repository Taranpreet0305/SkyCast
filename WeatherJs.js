const apikey = "376c2ac3227717c4ada5c1026faa4902";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icons");

async function checkWeather(city) {
    const response = await fetch(apiurl + city + '&appid=' + apikey);
    if(response.status==404)
    {
        document.querySelector(".Error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }
    else
    {
        document.querySelector(".weather").style.display="block";
        document.querySelector(".Error").style.display="none";
    }
    const info = await response.json();
    console.log(info);

    document.querySelector(".city").innerHTML = info.name;
    document.querySelector(".temp").innerHTML = Math.round(info.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = info.main.humidity + "%";
    document.querySelector(".wind").innerHTML = info.wind.speed + " Km/h";

    // Use info (not DataTransfer)
    if (info.weather[0].main == "Clouds") {
        weatherIcon.src = "/Assets/Cloud Weather Icon.png";
    } else if (info.weather[0].main == "Clear") {
        weatherIcon.src = "/Assets/Clear Weather icon.png";
    } else if (info.weather[0].main == "Drizzle") {
        weatherIcon.src = "/Assets/Drizzle Weather icon.png";
    } else if (info.weather[0].main == "Mist") {
        weatherIcon.src = "/Assets/Mist Icon.png";
    } else if (info.weather[0].main == "Rain") {
        weatherIcon.src = "/Assets/Rain Icon.png";
    } else if (info.weather[0].main == "Snow") {
        weatherIcon.src = "/Assets/Snow Icon.png";
    }

    document.querySelector(".weather").style.display="block";
} 

// Add event listener for the search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
