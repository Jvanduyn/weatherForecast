//global variables that need to be used outside of a function
var input = document.querySelector('.searchInput');
var searchBtn = document.querySelector('.searchBtn');
var userLocation = document.querySelector('.searchInput').value;
var prevCities = document.querySelector('.prev-cities');
var currentWeatherContainer = document.querySelector('#current-weather');
var listCurrentWeather = document.querySelector('#list');
var citySearchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []
var fiveDayContainer = document.querySelector('#fiveDayContainer');

//function to take the user input to be able to put it in the get coord function to get the city coordinates
function handleUserInput() {
    var collection = document.querySelectorAll('li');
    //for loope to remove previous li's that the current weather was listed in
    for (let i = 0; i < collection.length; i++) {
        collection[i].remove();
    }
    var city = input.value
    getCoord(city)
}

//function to get the city coordinates that the user inputs and store them in a var. 
function getCoord(city) {
    var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=b2888db4f0baa774a62c34dc4c426cad';
    fetch(geoUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            var cityName = data[0].name
            saveHistory(cityName)
            getCurrentWeather(lat, lon);
            getFutureWeather(lat, lon)
        })
}

//function to get current weather data and display on the page
function getCurrentWeather(lat, lon) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=b2888db4f0baa774a62c34dc4c426cad';
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            var dateUTC = data.dt
            var currentTemp = Math.floor(data.main.temp);
            var cityName = data.name;
            var wind = Math.floor(data.wind.speed);
            var humidity = data.main.humidity;
            var convertedUTC = new Date(dateUTC * 1000)
            var date = convertedUTC.toLocaleDateString()
            var icon = data.weather[0].icon
            var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
            var weatherIcon = document.createElement('img')
            weatherIcon.setAttribute('src', iconurl)

            cityInfo = [cityName + ' ' + date, currentTemp, wind, humidity];
            cityInfoNames = ['City: ', 'Current temperature: ', 'Wind speed: ', 'Humidity percentage: ']
            cityInfoAfter = ['', ' °F', ' mph', '%'];

            for (let index = 0; index < cityInfo.length; index++) {
                var li = document.createElement('li');
                li.textContent = cityInfoNames[index] + cityInfo[index] + cityInfoAfter[index];
                li.setAttribute('class', 'list-group-item');
                // li.setAttribute('id', 'li');
                listCurrentWeather.append(li);
            }


        })
}

//getting 5 day weather forecast and displaying it on the page
function getFutureWeather(lat, lon) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=b2888db4f0baa774a62c34dc4c426cad';
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            var forecastArr = [data.list[7], data.list[15], data.list[23], data.list[31], data.list[39]]
            fiveDayContainer.innerHTML = ''
            for (let i = 0; i < forecastArr.length; i++) {
                var highTemp = Math.floor(forecastArr[i].main.temp);
                var wind = Math.floor(forecastArr[i].wind.speed);
                var humidity = forecastArr[i].main.humidity;
                var date = forecastArr[i].dt_txt;
                var div = document.createElement('div');
                var liTemp = document.createElement('li');
                var liWind = document.createElement('li');
                var liHumid = document.createElement('li');
                var liDate = document.createElement('li');

                liTemp.setAttribute('class', 'list-group-item');
                liWind.setAttribute('class', 'list-group-item');
                liHumid.setAttribute('class', 'list-group-item');
                liDate.setAttribute('class', 'list-group-item');

                liTemp.textContent = 'Temp: ' + highTemp + ' °F'
                liWind.textContent = 'Wind speed: ' + wind + ' mph'
                liHumid.textContent = 'Humidity: ' + humidity + '%'
                liDate.textContent = 'Date: ' + date.slice(0, 10)

                div.setAttribute('class', 'col-2')
                div.append(liDate, liTemp, liWind, liHumid)
                fiveDayContainer.append(div)

                // var icon = forecastArr.weather.0.icon;
                // var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
                // var weatherIcon = document.createElement('img')
                // weatherIcon.setAttribute('src', iconurl)
                // li.setAttribute('id', 'li');
                // console.log(data);
            }
        })
}

function saveHistory(city) {
    if (citySearchHistory.includes(city)) {
        return
    }
    citySearchHistory.push(city)
    createButton(city)
    localStorage.setItem('searchHistory', JSON.stringify(citySearchHistory))
}

renderLastRegistered();

function renderLastRegistered() {
    for (var i = 0; i < citySearchHistory.length; i++) {
        createButton(citySearchHistory[i])

    }
};

function createButton(city) {
    var createBtn = document.createElement('button')
    createBtn.textContent = city;
    prevCities.append(createBtn)
}

function buttonClick(city) {
    createButton.setAttribute("on")
}
createButton.setAttribute("onclick", "createButton(city)");

searchBtn.addEventListener('click', handleUserInput);