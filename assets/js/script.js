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
            $("#result-icon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
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


            document.querySelector('#fiveDayDate-01').textContent = moment(data.list[3].dt_txt).format("MM/DD/YYYY");
            $('#fiveDayIcon-01').html("<img src='http://openweathermap.org/img/w/" + data.list[3].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            document.querySelector('#fiveDayTemp-01').textContent = "Temp: " + data.list[3].main.temp + "°F";
            document.querySelector('#fiveDayWind-01').textContent = "Wind: " + data.list[3].wind.speed + " MPH";
            document.querySelector('#fiveDayHum-01').textContent = "Humidity " + data.list[3].main.temp + " %";

            document.querySelector('#fiveDayDate-02').textContent = moment(data.list[11].dt_txt).format("MM/DD/YYYY");
            $('#fiveDayIcon-02').html("<img src='http://openweathermap.org/img/w/" + data.list[11].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            document.querySelector('#fiveDayTemp-02').textContent = "Temp: " + data.list[11].main.temp + "°F";
            document.querySelector('#fiveDayWind-02').textContent = "Wind: " + data.list[11].wind.speed + " MPH";
            document.querySelector('#fiveDayHum-02').textContent = "Humidity " + data.list[11].main.temp + " %";

            document.querySelector('#fiveDayDate-03').textContent = moment(data.list[19].dt_txt).format("MM/DD/YYYY");
            $('#fiveDayIcon-03').html("<img src='http://openweathermap.org/img/w/" + data.list[19].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            document.querySelector('#fiveDayTemp-03').textContent = "Temp: " + data.list[19].main.temp + "°F";
            document.querySelector('#fiveDayWind-03').textContent = "Wind: " + data.list[19].wind.speed + " MPH";
            document.querySelector('#fiveDayHum-03').textContent = "Humidity " + data.list[19].main.temp + " %";

            document.querySelector('#fiveDayDate-04').textContent = moment(data.list[27].dt_txt).format("MM/DD/YYYY");
            $('#fiveDayIcon-04').html("<img src='http://openweathermap.org/img/w/" + data.list[27].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            document.querySelector('#fiveDayTemp-04').textContent = "Temp: " + data.list[27].main.temp + "°F";
            document.querySelector('#fiveDayWind-04').textContent = "Wind: " + data.list[27].wind.speed + " MPH";
            document.querySelector('#fiveDayHum-04').textContent = "Humidity " + data.list[27].main.temp + " %";

            document.querySelector('#fiveDayDate-05').textContent = moment(data.list[35].dt_txt).format("MM/DD/YYYY");
            $('#fiveDayIcon-05').html("<img src='http://openweathermap.org/img/w/" + data.list[35].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            document.querySelector('#fiveDayTemp-05').textContent = "Temp: " + data.list[35].main.temp + "°F";
            document.querySelector('#fiveDayWind-05').textContent = "Wind: " + data.list[35].wind.speed + " MPH";
            document.querySelector('#fiveDayHum-05').textContent = "Humidity " + data.list[35].main.temp + " %";


        })
}

citySearchButtonEl.addEventListener('submit', handleSearchFormSubmit);

console.log(APIkey);

            // cityResultIcon.textContent = '<img src="' + iconURL + '>"';
