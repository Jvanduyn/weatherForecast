var lon;
var lat;
var input = document.querySelector('.searchInput');
var searchBtn = document.querySelector('.searchBtn');
var userLocation = document.querySelector('.searchInput').value;
var prevCities = document.querySelector('.prev-cities');

var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=b2888db4f0baa774a62c34dc4c426cad';
var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + input + '&limit=1&appid=b2888db4f0baa774a62c34dc4c426cad';
//how do i get the state code and country code from the input

searchBtn.addEventListener('click', function (event) {
    event.preventDefault
});

// need to take the input that the user puts and run it through geo url
//then need to take the object to get the lat and lon from geo url to put that into requesturl
//take the data and display it to the page

//need to do the same thing above for the 5 day weather forcast

//store local storage a list of cities that user has searched

renderLastRegistered();

function renderLastRegistered() {
    var userLocation = localStorage.getItem("city")

    if (!userLocation) {
        return;
    }

    prevCities.textContent = userLocation;

};