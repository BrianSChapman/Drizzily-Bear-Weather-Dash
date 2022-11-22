var APIKey = "59ae0903b9c09ab9e0fdda3cbdca2806";
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
var userInput = document.getElementsByClassName("user-input")
var searchButton = document.getElementsByClassName("search-button")
var historyBox = document.getElementById("search-history")
var mainPane = document.getElementById("search-result")
var fiveDay = document.getElementById("five-day-forecast")
 

var searchSubmission = function (event) {
event.preventdefault();

var  userSearch = userInput.value.trim();
    
    if(userSearch) {
    getTheWeather(city);
    
        mainPane.textContent = "";
        fiveDay.textContent = "";
        

    }
        
}

var getTheWeather = function() {

    fetch(queryURL)
    .then(function (response) {
       if (response.ok) {
        console.log(response);
        response.json()
        .then(function (data) {
        var fiveDayCards = document.createElement("div");
        fiveDayCards.setAttribute("id", "five-day-forecast");
            



        
        })

       } 
       
        
    })

}








    