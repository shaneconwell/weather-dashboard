var APIkey = "388416c71446005d44aef09629cecf59";
var citySearchVal;
var now = moment().format("MM/DD/YYYY");
var weatherIcon;


console.log(now);

var citySearchButtonEl = document.querySelector('#city-search');
var cityResultsMainEl = document.querySelector('#result-text');
var cityResultIcon = document.querySelector('#result-icon');
var dailyTemp = document.querySelector('#daily-temp');
var dailyWind = document.querySelector('#daily-wind');
var dailyHumidity = document.querySelector('#daily-humidity');


function handleSearchFormSubmit(event) {
    event.preventDefault();

    citySearchVal = document.querySelector('#search-input').value;


    if (!citySearchVal) {
        console.error('You need a search input value!');
        return;
    }


    var currentWeatherQueryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearchVal + "&units=imperial&appid=" + APIkey;
    var fiveDayWeatherQueryURL = 'https://api.openweathermap.org/data/2.5/forecast/?q=' + citySearchVal + "&units=imperial&appid=" + APIkey;
    console.log(currentWeatherQueryURL);
    console.log(fiveDayWeatherQueryURL);


    fetch(currentWeatherQueryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var iconCode = data.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";


           
            cityResultsMainEl.textContent = data.name + " (" + now + ") ";
            dailyTemp.textContent = "Temp: " + data.main.temp + "°F";
            dailyWind.textContent = "Wind: " + data.wind.speed + " MPH"
            dailyHumidity.textContent = "Humidity: " + data.main.humidity + " %";


            console.log(data)
        })
    
        
        fetch(fiveDayWeatherQueryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var fiveDayTemp = document.querySelector('#5day-temp');

        })
}

citySearchButtonEl.addEventListener('submit', handleSearchFormSubmit);

console.log(APIkey);

            // cityResultIcon.textContent = '<img src="' + iconURL + '>"';
