const apikey = "8YrvGJwvrIwJOsteYRXDOK21AgyJEWdu";

// Step 1: Get location key for the city (e.g., Delhi)
async function getLocationKey(city) {
    const locationUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apikey}&q=${city}`;
    const response = await fetch(locationUrl);
    const data = await response.json();
    return data[0].Key; // Get the first matching location key
}

// Step 2: Get current weather conditions using location key
async function checkWeather(city = "Delhi") {
    try {
        const locationKey = await getLocationKey(city);

        const conditionsUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apikey}`;
        const response = await fetch(conditionsUrl);
        const data = await response.json();
        const weather = data[0];

        console.log(weather);

        document.querySelector(".city").innerHTML = city;
        document.querySelector(".temp").innerHTML = weather.Temperature.Metric.Value + "°C";
        document.querySelector(".humidity").innerHTML = (weather.RelativeHumidity || 'N/A') + "%";
        document.querySelector(".wind").innerHTML = weather.Wind.Speed.Metric.Value + " km/h";

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("City not found or API limit reached.");
    }
}

// Listen for Enter key in the input
document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".search input");

    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            const city = input.value.trim();
            if (city) {
                checkWeather(city);
            }
        }
    });
});

// Load default city
checkWeather();
