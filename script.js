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
        console.log('current', data)
        if (data.cod == 404) {
          alert("City not found!");
          return;
        }
        displayDaily(data, userInput);
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

var displayDaily = function (data, city) {
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
        console.log("five day" , data)
        displayForecast(data);
        saveToHistory(city);
      });
    }
  });
 $("#current-city-element").addClass("card-title").text(data.name);
  $("#current-temp").addClass("card-text").text(data.main.temp);
  // $("#current-temp").addClass("card-text").text(data.main.temp);
  $(".current-humidity").addClass("card-text").text(data.main.humidity);
  $("#current-wind").addClass("card-text").text(data.wind.speed);
  /
};
// display hidden five day forecast elements
const forecastEl = document.querySelector("#five-day-container");
function showFiveDay() {
  forecastEl.classList.remove("hidden");
}

function displayForecast(forecast) {
  forecastEl.textContent = "";
  for (let i = 0; i < 5; i++) {
    let fiveDayCards = document.createElement("ul");
    forecastEl.append(fiveDayCards);
    console.log(forecast.list[i].main);

    const iconEl = document.createElement("li");
    const iconImg = document.createElement("img");
    console.log(forecast);
    iconImg.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" +
        forecast.list[i].weather[0].icon +
        ".png"
    );
    iconEl.setAttribute("class", ".list-group-item icon");
    iconEl.append(iconImg);
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

function saveToHistory(city) {
  let storage = JSON.parse(localStorage.getItem("weatherHistory"));
  if (storage === null) {
    storage = [];
  }

  storage.push(city);

  localStorage.setItem("weatherHistory", JSON.stringify(storage));
  displaySearchHistory();
}

function displaySearchHistory() {
  let storage = JSON.parse(localStorage.getItem("weatherHistory"));
  if (storage === null) {
    let p = document.createElement("p");
    p.textContent = "No History";
    historyBox.append(p);
  } else {
    historyBox.textContent = "";

    for (let i = 0; i < storage.length; i++) {
      var searchHistory = document.createElement("button");
      searchHistory.setAttribute("class", "btn btn-secondary");
      searchHistory.textContent = storage[i];
      historyBox.append(searchHistory);

      searchHistory.addEventListener("click", function (e) {
        let userInput = e.target.textContent;
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
              displayDaily(data, userInput);
            });
        }
      });
    }
  }
}

displaySearchHistory();

searchButton.addEventListener("click", searchSubmission);
// userInput.addEventListener("submit", searchSubmission);
