var APIKey = "59ae0903b9c09ab9e0fdda3cbdca2806";
var searchButton = document.querySelector(".search-button");
var historyBox = document.querySelector("#search-history");
var mainPane = document.querySelector("#today-weather");
// const fiveDayCards = document.querySelector(".five-day");

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
      response.json(response).then(function (data) {
        console.log(data, "second fetch");
        displayForecast(data);
      });
    }
  });
  var cityNameEl = $("<h2>").addClass("card-title").text(data.name);
  var tempEl = $("<p>").addClass("card-text").text(data.main.temp);

  var todaysWeather = document.createElement("div");
  todaysWeather.setAttribute("id", "search-result");
  $("#today-weather").append(cityNameEl, tempEl);
};
// display hidden five day forecast elements
const forecastEl = document.querySelector("#five-day-container");
function showFiveDay() {

  forecastEl.classList.remove('hidden')

  // if (forecastEl.style.display === "none") {
  //   forecastEl.style.display = "block";
  // } else {
  //   forecastEl.style.display = "none";
  // }
  // if (fiveDayCards.style.display === "none") {
  //   fiveDayCards.style.display = "inline-block";
  // } else {
  //   fiveDayCards.style.display = "none";
  // }
}

function displayForecast(forecast) {
  for (let i = 0; i < 5; i++) {
    let fiveDayCards = document.createElement('ul')
    forecastEl.append(fiveDayCards)
    console.log(forecast.list[i].main);

    const iconEl = document.createElement("li");
    iconEl.innerHTML = forecast.list[i].weather.icon;
    iconEl.setAttribute("class", ".list-group-item icon");
    fiveDayCards.appendChild(iconEl);

    const tempEl = document.createElement("li");
    tempEl.textContent = forecast.list[i].main.temp;
    tempEl.setAttribute("class", ".list-group-item temp");
    fiveDayCards.appendChild(tempEl);

    const windEl = document.createElement("li");
    windEl.textContent = forecast.list[i].wind.speed;
    windEl.setAttribute("class", ".list-group-item wind");
    fiveDayCards.appendChild(windEl);

    const humEl = document.createElement("li");
    humEl.textContent = forecast.list[i].main.humidity;
    humEl.setAttribute("class", ". list-group-item humidity");
    fiveDayCards.appendChild(humEl);
  }
  showFiveDay();
}

// function displaySearchHistory(data) {
//     var searchHistory = document.createElement("button");
//     searchHistory.setAttribute("class", "btn btn-secondary");
//     searchHistory.textContent = data.city.name;
//     historyBox.append(searchHistory);

// }

searchButton.addEventListener("click", searchSubmission);
// userInput.addEventListener("submit", searchSubmission);
