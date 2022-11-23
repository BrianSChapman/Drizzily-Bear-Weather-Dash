var APIKey = "59ae0903b9c09ab9e0fdda3cbdca2806";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + userSearch + "&appid=" + APIKey;
var userInput = document.querySelector(".user-input");
var searchButton = document.querySelector(".search-button");
var historyBox = document.querySelector("#search-history");
var mainPane = document.querySelector("#today-weather");
var fiveDay = document.querySelector("#five-day-container");
var  userSearch = document.querySelector("#floatingInput").value.trim();

var searchSubmission = function (event) {
    event.preventDefault();

    if(userSearch) {
    getTheWeather(userSearch);
    
        mainPane.textContent = "";
        fiveDay.textContent = "";
    }
}

fetch(queryURL)
.then(function (response) {
    if(response.ok) {
    console.log(response); 
    response.json().then(function (data){

var lat = data.city.coord.lat;
var lon = data.city.coord.lon;

var getTheWeather = function (userSearch) {
    var weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" +lat+ "&lon=" +lon+ "&appid=" + APIKey

     fetch(weatherURL)
        .then(function (response) {
        if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
        console.log(data);
        displayForecast(data);})
            } 
        })
    }
 }
)}
});

var displayForecast = function() {
        var todaysWeather = document.createElement("div");
        todaysWeather.setAttribute("id", "search-result");
        var fiveDayCards = document.createElement("div");
        fiveDayCards.setAttribute("id", "five-day-container");
        mainPane.appendChild(todaysWeather);
        fiveDay.appendChild(fiveDayCards);
};

displaySearchHistory(data); {
    var searchHistory = document.createElement("button");
    searchHistory.setAttribute("class", "btn btn-secondary");
    searchHistory.textContent = data.city.name;
    historyBox.append(searchHistory);

}

        searchButton.addEventListener("click", searchSubmission);
        userInput.addEventListener("submit", searchSubmission);
        
 








    