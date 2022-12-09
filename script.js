var APIKey = "59ae0903b9c09ab9e0fdda3cbdca2806";
var searchButton = document.querySelector(".search-button");
var historyBox = document.querySelector("#search-history");
var mainPane = document.querySelector("#today-weather");
var fiveDay = document.querySelector("#five-day-container");

var searchSubmission = function (event) {
  event.preventDefault();
  var userInput = document.querySelector(".user-input").value.trim();
  console.log(userInput);
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    userInput +
    "&units=imperial&appid=" +
    APIKey;
  if (!userInput) {
    alert("Please enter a city!");
    return;
  } else {
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.cod == 404) {
          alert("City not found!");
          return;
        }
        displayDaily(data);
      });
  }
};

// var getTheWeather = function (userSearch) {
//     var weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" +lat+ "&lon=" +lon+ "&appid=" + APIKey

//      fetch(weatherURL)
//         .then(function (response) {
//         if (response.ok) {
//         console.log(response);
//         response.json().then(function (data) {
//         console.log(data);
//         displayForecast(data);})
//             }
//         })
//     }

var displayDaily = function (data) {
//   console.log(data);
  var cityNameEl = $("<h2>").addClass("card-title").text(data.name);
  var tempEl = $("<p>").addClass("card-text").text(data.main.temp);

  // var todaysWeather = document.createElement("div");
  // todaysWeather.setAttribute("id", "search-result");
  // var fiveDayCards = document.createElement("div");
  // fiveDayCards.setAttribute("id", "five-day-container");
  $('#today-weather').append(cityNameEl, tempEl);

  // fiveDay.appendChild(fiveDayCards);
};

// function displaySearchHistory(data) {
//     var searchHistory = document.createElement("button");
//     searchHistory.setAttribute("class", "btn btn-secondary");
//     searchHistory.textContent = data.city.name;
//     historyBox.append(searchHistory);

// }

searchButton.addEventListener("click", searchSubmission);
// userInput.addEventListener("submit", searchSubmission);
