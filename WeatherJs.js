const apikey = "376c2ac3227717c4ada5c1026faa4902";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icons");

async function checkWeather(city) {
    const response = await fetch(apiurl + city + '&appid=' + apikey);
    const weatherSection = document.querySelector(".weather");
    const errorSection = document.querySelector(".Error");

    if (response.status === 404) {
        errorSection.style.display = "block";
        weatherSection.style.display = "none";
        return;
    }

    const info = await response.json();
    errorSection.style.display = "none";
    weatherSection.style.display = "block";

    document.querySelector(".city").textContent = info.name;
    document.querySelector(".temp").textContent = Math.round(info.main.temp) + "°C";
    document.querySelector(".humidity").textContent = info.main.humidity + "%";
    document.querySelector(".wind").textContent = info.wind.speed + " Km/h";

    const condition = info.weather[0].main;
    switch (condition) {
        case "Clouds":
            weatherIcon.src = "/Assets/Cloud Weather Icon.png";
            weatherIcon.alt = "Cloudy Weather";
            break;
        case "Clear":
            weatherIcon.src = "/Assets/Clear Weather icon.png";
            weatherIcon.alt = "Clear Sky";
            break;
        case "Drizzle":
            weatherIcon.src = "/Assets/Drizzle Weather icon.png";
            weatherIcon.alt = "Drizzle";
            break;
        case "Mist":
            weatherIcon.src = "/Assets/Mist Icon.png";
            weatherIcon.alt = "Misty";
            break;
        case "Rain":
            weatherIcon.src = "/Assets/Rain Icon.png";
            weatherIcon.alt = "Rainy Weather";
            break;
        case "Snow":
            weatherIcon.src = "/Assets/Snow Icon.png";
            weatherIcon.alt = "Snowy Weather";
            break;
        default:
            weatherIcon.src = "/Assets/Weather Default Icon.png";
            weatherIcon.alt = "Weather Condition";
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city !== "") {
        checkWeather(city);
    }
});
