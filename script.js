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
            var searchCity = $(this).siblings("input").val().trim();
            console.log(searchCity);
            selectedCity(searchCity);
        });
 
    });
};

function selectedCity(searchCity) {
    var APIKey = "46bc2c42a8260a4e45e15ae9d7661e9b"
    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + APIKey;
    console.log(queryURL);

}

WeatherDashboard();
