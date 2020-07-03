// api key: 46bc2c42a8260a4e45e15ae9d7661e9b
// api url: api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
var input = $("input");
var currentDate = moment().format("MM/DD/YYYY");
console.log(currentDate);

function WeatherDashboard() {

    $(document).ready(function () {

        $("#submitBtn").on("click", function (event) {
            event.preventDefault();
            console.log("submit button correctly submit");
            var searchCity = $(this).siblings("input").val().trim();
            localStorage.setItem("City Search", JSON.stringify(searchCity));
            console.log(searchCity);
            selectedCity(searchCity);
        });

        $("#cityIdea button").on("click", function (event) {
            event.preventDefault();

            var searchCity = $(this).html().toString();
            localStorage.setItem("City Search", JSON.stringify(searchCity));
            console.log(searchCity);
            selectedCity(searchCity);
        });

    });
};

// Starts function to fill in information for selected city
function selectedCity(searchCity) {

    var APIKey = "46bc2c42a8260a4e45e15ae9d7661e9b"
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?" + "&q=" + searchCity + "&appid=" + APIKey;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);

            var cityLon = response.city.coord.lon;
            var cityLat = response.city.coord.lat;

            //logs current day weather conditions
            var currentCity = response.city.name;
            console.log(currentCity);

            var currentCondition = response.list[0].weather[0].icon;
            console.log(currentCondition);
            var iconImg = "http://openweathermap.org/img/w/" + currentCondition + ".png";

            var currentTemp = response.list[0].main.temp;
            var tempF = ((currentTemp - 273.15) * 1.80 + 32);
            console.log(tempF);

            var currentHumidity = response.list[0].main.humidity;
            console.log(currentHumidity);

            var currentWind = response.list[0].wind.speed;
            console.log(currentWind);

            $("#currentCity").text(currentCity).append(" " + currentDate).append($("#currentCondition").attr("src", iconImg));
            $("#currentTemp").text("Temperature: " + tempF.toFixed(1) + "°F");
            $("#currentHumidity").text("Humidity: " + currentHumidity + "%");
            $("#currentWind").text("Wind Speed: " + currentWind);

            //Yakini from my group gave me great inspiration and code for this for loop!
            $("#forecast").empty();

            for (var i = 1; i <= 5; i++) {

                var forecast5day = function (i) {

                    return (
                        '<div class="col-xs-2 five-day">' +
                        `<h6>${moment().add(i, 'd').format("MM/DD/YYYY")}</h6>` +
                        `<img src="https://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png" alt=${response.list[i].weather[0].description}>` +
                        `<p>Temp: ${((response.list[i].main.temp - 273.15) * 1.80 + 32).toFixed(1)}&nbsp;°F</p>` +
                        `<p>Humidity: ${response.list[i].main.humidity}%</p>` +
                        '</div>'
                    );
                };

                $("#forecast").append(forecast5day(i));
            };

            $("#currentUV").empty();

            var query2URL = "http://api.openweathermap.org/data/2.5/uvi?&appid=" + APIKey + "&lat=" + cityLat + "&lon=" + cityLon;

            // Gets UV index and background color for severity
            $.ajax({
                url: query2URL,
                method: "GET"
            })
                .then(function (response) {
                    console.log(response);
                    var currentUV = response.value;
                    console.log(currentUV);
                    if (currentUV < 3) {
                        var backgroundUV = $("<span>").attr("style", "background-color: green").text(currentUV);
                    } else if (currentUV >= 3 && currentUV < 5) {
                        var backgroundUV = $("<span>").attr("style", "background-color: yellow").text(currentUV);
                    } else if (currentUV >= 5 && currentUV < 8) {
                        var backgroundUV = $("<span>").attr("style", "background-color: orange").text(currentUV);
                    } else if (currentUV >= 8) {
                        var backgroundUV = $("<span>").attr("style", "background-color: red").text(currentUV);
                    }
                    $("#currentUV").text("UV Index: ").append(backgroundUV);
                });


        });



}


WeatherDashboard();
