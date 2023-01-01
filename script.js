var APIKey = "59ae0903b9c09ab9e0fdda3cbdca2806";
var searchButton = document.querySelector(".search-button");
var historyBox = document.querySelector("#search-history");
var mainPane = document.querySelector("#today-weather");
var fiveDay = document.querySelector("#five-day-container");

var searchSubmission = function (event) {
  event.preventDefault();
  var userInput = document
    .querySelector("#exampleFormControlInput1")
    .value.trim();

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
        console.log(data);
        displayDaily(data);
      });
  }
};
// Creating a new instance of search history if there isn't one.
// var searchArray = JSON.parse(localStorage.getItem(searchHistory));
// if (!searchArray) {
//   searchArray = {
//     previousCity: [],
//   };
// } else {
//   for (let i = 0; i < searchArray.length; i++) {
//     cityHistory(searchArray.previousCity[i]);
//   }
// }
// searchArray.previousCity.push(city);

// // Save search history to localStorage.
// function storeSearchHistory() {
//   localStorage.setItem(searchHistory, JSON.stringify(searchArray));
// }

// var getTheWeather = function (userSearch) {

//  fetch(weatherURL)
//     .then(function (response) {
//     if (response.ok) {
//     console.log(response);
//     response.json().then(function (data) {
//     console.log(data);
//     displayForecast(data);})
//         }
//     })
//     }

var displayDaily = function (data) {
  var weatherURL =
    "http://api.openweathermap.org/data/2.5/forecast?lat=" +
    data.coord.lat +
    "&lon=" +
    data.coord.lon +
    "&units=imperial&appid=" +
    APIKey;

  fetch(weatherURL).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data, "second fetch");
        displayForecast(data);
      });
    }
  });
  var cityNameEl = $("<h2>").addClass("card-title").text(data.name);
  var tempEl = $("<p>").addClass("card-text").text(data.main.temp);

  var todaysWeather = document.createElement("div");
  todaysWeather.setAttribute("id", "search-result");
  var fiveDayCards = document.createElement("div");
  fiveDayCards.setAttribute("id", "five-day-container");
  $("#today-weather").append(cityNameEl, tempEl);

  // fiveDay.appendChild(fiveDayCards);
};
function displayForecast(forecast) {
  const forecastEl = document.querySelector(".five-day-container");
  forecastEl.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    console.log(forecast.list[i].main);
  
    const tempEl = document.createElement("div");
    tempEl.textContent = forecast.list[i].main.temp;
    tempEl.setAttribute("class", ".temp");
    forecastEl.appendChild(tempEl);
    

    const windEl = document.createElement("div");
    windEl.textContent = forecast.list[i].wind.speed;
    windEl.setAttribute("class", ".wind");
    forecastEl.appendChild(windEl);
    

    const humEl = document.createElement("div");
    humEl.textContent = forecast.list[i].main.humidity;
    humEl.setAttribute("class", ".humidity")
    forecastEl.appendChild(humEl);
  }
}

// function displaySearchHistory(data) {
//     var searchHistory = document.createElement("button");
//     searchHistory.setAttribute("class", "btn btn-secondary");
//     searchHistory.textContent = data.city.name;
//     historyBox.append(searchHistory);

// }

searchButton.addEventListener("click", searchSubmission);
// userInput.addEventListener("submit", searchSubmission);
