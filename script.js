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
            var searchCity = $(this).siblings("input").val().toString().trim();
            
            console.log(searchCity);
            selectedCity(searchCity);
        });

    });
};

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

            // var date2 = moment().add(1, 'd').format("MM/DD/YYYY")
            // console.log(date2);
            // var conditions2 = response.list[1].weather[0].icon;
            // console.log(conditions2);
            // var icon2 = "http://openweathermap.org/img/w/" + conditions2 + ".png";
            // var temp2 = (((response.list[1].main.temp) - 273.15) * 1.80 + 32).toFixed(1);
            // var humidity2 = response.list[1].main.humidity;

            // $("#nextDay").text(date2);
            // $("#nextDayC").attr("src", icon2);
            // $("#nextDayT").text("Temp: " + temp2);
            // $("#nextDayH").text("Humidity: " + humidity2);

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


        });

}


WeatherDashboard();
