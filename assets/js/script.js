var citySearchButtonEl = document.querySelector('#city-search');
var recentCityListButtonEl = document.querySelector('#recentCityList');
var cityResultsMainEl = document.querySelector('#result-text');
var cityResultIcon = document.querySelector('#result-icon');
var dailyTemp = document.querySelector('#daily-temp');
var dailyWind = document.querySelector('#daily-wind');
var dailyHumidity = document.querySelector('#daily-humidity');
var dailyUVIndex = document.querySelector('#daily-UVindex');
var UVtext = document.querySelector('#UVtext');
var recentCityList = document.querySelector('#recentCityList');

var APIkey = "388416c71446005d44aef09629cecf59";
var citySearchVal;
var now = moment().format("MM/DD/YYYY");
var weatherIcon;
var recentCities = []


function renderCities() {
    recentCityList.innerHTML = "";
    for (var i = 0; i < recentCities.length; i++) {
        
        var city = recentCities[i].cityName;
        var button = document.createElement('button');
        
        button.textContent = city;
        
        button.setAttribute('class', "btn btn-block");
        button.setAttribute('id', city);
    
        recentCityList.appendChild(button);
    }
}

function init() {
    var storedCities = JSON.parse(localStorage.getItem('recentCities'));

    if (storedCities !== null) {
        recentCities = storedCities;
    }

    renderCities();
}

function handleRecentCityClick(event) {
    event.preventDefault();

    console.log(event.target.id);
    document.querySelector('#search-input').value = event.target.id
    handleSearchFormSubmit(event);
}

function handleSearchFormSubmit(event) {
    event.preventDefault();
    citySearchVal = document.querySelector('#search-input').value;
    if (!citySearchVal) {
        alert('You need a search input value!');
        return;
    }
    var city = {
        cityName: citySearchVal
    }
    recentCities.push(city);
    window.localStorage.setItem('recentCities', JSON.stringify(recentCities));
    renderCities();

    var latCoordinates;
    var lonCoordinates;
    var currentWeatherQueryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearchVal + "&units=imperial&appid=" + APIkey;
    var fiveDayWeatherQueryURL = 'https://api.openweathermap.org/data/2.5/forecast/?q=' + citySearchVal + "&units=imperial&appid=" + APIkey;


    fetch(currentWeatherQueryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            cityResultsMainEl.textContent = data.name + " (" + now + ") ";
            
            $("#result-icon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            
            dailyTemp.textContent = "Temp: " + data.main.temp + "°F";
            
            dailyWind.textContent = "Wind: " + data.wind.speed + " MPH"
            
            dailyHumidity.textContent = "Humidity: " + data.main.humidity + " %";
            
            latCoordinates = data.coord.lat;
            lonCoordinates = data.coord.lon;

            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latCoordinates + '&lon=' + lonCoordinates + '&units=standard&exclude=minutely,hourly,daily&appid=' + APIkey)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                   
                    dailyUVIndex.textContent = data.current.uvi
                    UVIndex = data.current.uvi

                    if (UVIndex < 3) {
                        UVtext.setAttribute('style', 'display:inline-block;  ')
                        dailyUVIndex.setAttribute("style", "background-color:green; color:white; padding:0 5px 0 5px; border-radius:5px;");
                        
                    } else if (UVIndex > 7) {
                        UVtext.setAttribute('style', 'display:inline-block;  ')
                        dailyUVIndex.setAttribute("style", "background-color:red; color:white; padding:0 5px 0 5px; border-radius:10px;");
                        
                    } else {
                        UVtext.setAttribute('style', 'display:inline-block;  ')
                        dailyUVIndex.setAttribute("style", "background-color:yellow; padding:0 5px 0 5px; border-radius:10px;");
                    }

                });



        })


    fetch(fiveDayWeatherQueryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            


            document.querySelector('#fiveDayDate-01').textContent = moment(data.list[5].dt_txt).format("MM/DD/YYYY");
            $('#fiveDayIcon-01').html("<img src='http://openweathermap.org/img/w/" + data.list[5].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            document.querySelector('#fiveDayTemp-01').textContent = "Temp: " + data.list[5].main.temp + "°F";
            document.querySelector('#fiveDayWind-01').textContent = "Wind: " + data.list[5].wind.speed + " MPH";
            document.querySelector('#fiveDayHum-01').textContent = "Humidity " + data.list[5].main.temp + " %";

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
recentCityListButtonEl.addEventListener('click', handleRecentCityClick);

init();