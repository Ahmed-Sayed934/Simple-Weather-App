const findLocationInput = document.getElementById("findLocationInput");

// !-------------TODAY Elements------->
const cityName = document.getElementById("cityName");
const todayTemp = document.getElementById("todayTemp");
const todayStatus = document.getElementById("todayStatus");
const todayWeatherImg = document.getElementById("todayWeatherImg");
const todayRain = document.getElementById("todayRain");
const todayWind = document.getElementById("todayWind");
const todayWindDirection = document.getElementById("todayWindDirection");
const todayDayName = document.getElementById("todayDayName");
const todayDayNumber = document.getElementById("todayDayNumber");
const todayMonthName = document.getElementById("todayMonthName");
// !-------------TODAY Elements------->
findLocationInput.addEventListener("input", function (e) {
  getData(e.target.value);
});
async function getData(cityName) {
  if (cityName.length > 2) {
    let res =
      await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a7a15e4fc1024a3c964204709242112&q=${cityName}&days=3&aqi=no&alerts=no
`);
    let data = await res.json();
    console.log(data);
    displayData(data);
  }
}

// ^==========================Display================>>
function displayData(data) {
  let dateToday = new Date(data.current.last_updated);

  let dayName = dateToday.toLocaleString("en-us", { weekday: "long" });
  let monthName = dateToday.toLocaleString("en-us", { month: "long" });
  // &-----------------TODAY----------------->
  todayDayName.innerHTML = dayName;
  todayDayNumber.innerHTML = dateToday.getDate();
  todayMonthName.innerHTML = monthName;
  cityName.innerHTML = data.location.region;
  todayTemp.innerHTML = data.current.temp_c;
  todayStatus.innerHTML = data.current.condition.text;
  todayRain.innerHTML = data.current.humidity;
  todayWind.innerHTML = data.current.wind_kph;
  todayWindDirection.innerHTML = data.current.wind_dir;
  todayWeatherImg.setAttribute("src", `https:${data.current.condition.icon}`);

  // &-----------------TODAY----------------->
  // &-----------------TOMORROW----------------->
  let cardContainer = "";
  for (let i = 1; i <= 2; i++) {
    let dateTomorrow = new Date(data.forecast.forecastday[i].date);
    console.log(dateTomorrow);

    cardContainer = `<header class="d-flex justify-content-between">
                <h3>${dateTomorrow.toLocaleString("en-us", {
                  weekday: "long",
                })}</h3>
              </header>
              <div class="d-flex flex-column align-items-center">
                <h2>${
                  data.forecast.forecastday[i].day.avgtemp_c
                }<sup>o</sup></h2>
                <div
                  class="d-flex justify-content-evenly flex-column align-items-center"
                >
                  <p>${data.forecast.forecastday[i].day.condition.text}</p>
                  <img src="https:${
                    data.forecast.forecastday[i].day.condition.icon
                  }" alt="icon" />
                </div>
              </div>
            `;
    document.querySelectorAll(".cardInnerNext")[i - 1].innerHTML =
      cardContainer;
  }
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    getData(`${lat},${long}`);
  });
}
