// api key: 46bc2c42a8260a4e45e15ae9d7661e9b
// api url: api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
var input = $("input");
var currentDate = moment().format("MM/DD/YYYY");
console.log(currentDate);

function WeatherDashboard () {

    $(document).ready(function () {

        $("#submitBtn").on("click", function(event) {
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
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?" +"&q=" + searchCity + "&appid=" + APIKey;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(response);

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

        
        



        // currentUV = 

    })

}

WeatherDashboard();
