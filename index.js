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
            document.body.style.backgroundImage = "url('Assets/Cloudbg.jpg')";
            break;
        case "Clear":
            weatherIcon.src = "/Assets/Clear Weather icon.png";
            weatherIcon.alt = "Clear Sky";
            document.body.style.backgroundImage = "url('Assets/clearbg.jpg')";
            break;
        case "Drizzle":
            weatherIcon.src = "/Assets/Drizzle Weather icon.png";
            weatherIcon.alt = "Drizzle";
            document.body.style.backgroundImage = "url('Assets/Drizzlebg.png')";
            break;
        case "Mist":
            weatherIcon.src = "/Assets/Mist Icon.png";
            weatherIcon.alt = "Misty";
            document.body.style.backgroundImage = "url('Assets/Mistbg.jpg')";
            break;
        case "Rain":
            weatherIcon.src = "/Assets/Rain Icon.png";
            weatherIcon.alt = "Rainy Weather";
            document.body.style.backgroundImage = "url('Assets/Rainbg.jpg')";
            break;
        case "Snow":
            weatherIcon.src = "/Assets/Snow Icon.png";
            weatherIcon.alt = "Snowy Weather";
            document.body.style.backgroundImage = "url('Assets/Snowbg.jpg')";
            break;
			case "Thunderstorm":
            weatherIcon.src = "/Assets/Thunderstorm.png";
            weatherIcon.alt = "Thunderstorm Weather";
            document.body.style.backgroundImage = "url('Assets/Thunderstormbg.jpg')";
            break;
			case "Haze":
            weatherIcon.src = "/Assets/Haze.png";
            weatherIcon.alt = "Haze Weather";
            document.body.style.backgroundImage = "url('Assets/Hazebg.jpg')";
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