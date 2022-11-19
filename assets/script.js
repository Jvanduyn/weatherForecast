var input = document.querySelector('.searchInput');
var searchBtn = document.querySelector('.searchBtn');
var userLocation = document.querySelector('.searchInput').value;
var prevCities = document.querySelector('.prev-cities');
var currentWeatherContainer = document.querySelector('#current-weather');
var listCurrentWeather = document.querySelector('#list');
var citySearchHistory = []

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
            var currentTemp = Math.floor(data.main.temp);
            var cityName = data.name;
            var wind = Math.floor(data.wind.speed);
            var humidity = data.main.humidity;

            cityInfo = [cityName, currentTemp, wind, humidity];
            cityInfoNames = ['City: ', 'Current temperature: ', 'Wind speed: ', 'Humidity percentage: ']
            cityInfoAfter = ['', ' °F', ' mph', '%'];

            for (let index = 0; index < cityInfo.length; index++) {
                var li = document.createElement('li');
                li.textContent = cityInfoNames[index] + cityInfo[index] + cityInfoAfter[index];
                li.setAttribute('class', 'list-group-item');
                li.setAttribute('id', 'li');
                listCurrentWeather.appendChild(li);
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
            for (let i = 0; i < forecastArr.length; i++) {
                //    create elements

                // add content to elements from the forecast arr

                // append newly created elements to the forcast container

            }
            console.log(forecastArr)
        })
}

function saveHistory(city) {

    citySearchHistory.push(city)

    localStorage.setItem('searchHistory', JSON.stringify(citySearchHistory))
}

searchBtn.addEventListener('click', handleUserInput);


//store local storage a list of cities that user has searched

// renderLastRegistered();

// function renderLastRegistered() {
//     var userLocation = localStorage.getItem("city")

//     prevCities.textContent = userLocation;
//     //need to get teh text as a button
// };