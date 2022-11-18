var input = document.querySelector('.searchInput');
var searchBtn = document.querySelector('.searchBtn');
var userLocation = document.querySelector('.searchInput').value;
var prevCities = document.querySelector('.prev-cities');

var citySearchHistory = []

function handleUserInput() {
    var city = input.value
    getCoord(city)
}
function getCoord(city) {
    var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=b2888db4f0baa774a62c34dc4c426cad';
    fetch(geoUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            var cityName = data[0].name
            // console.log(data)
            saveHistory(cityName)
            getCurrentWeather(lat, lon);
            getFutureWeather(lat, lon);
        })
}

function getCurrentWeather(lat, lon) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=b2888db4f0baa774a62c34dc4c426cad';
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {

            console.log(data)
            //need to obtain name of city, current weather, wind, and humidity and display it on page
            //create all the elements to display on page
            //add content to those elements
            //need to append that content to the elements they need to go into
        })
}

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



//take the data and display it to the page


//store local storage a list of cities that user has searched

// renderLastRegistered();

// function renderLastRegistered() {
//     var userLocation = localStorage.getItem("city")

//     prevCities.textContent = userLocation;
//     //need to get teh text as a button
// };