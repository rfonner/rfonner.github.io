'use strict';

var weatherConditions = new XMLHttpRequest();
var weatherForecast = new XMLHttpRequest();
var cObj;
var fObj;

function loadWeather()
{
    var zip = document.getElementById('zip').value;
    if (zip == '') {zip = '23060';}
    var conditionsPath = 'http://api.wunderground.com/api/a48adda2436c8791/conditions/q/CA/' + zip + '.json';
    var forecastPath   = 'http://api.wunderground.com/api/a48adda2436c8791/forecast/q/CA/' + zip + '.json';

    // GET THE CONDITIONS
    weatherConditions.open('GET', conditionsPath, true);
    weatherConditions.responseType = 'text';
    weatherConditions.send(null);

    // GET THE FORECARST
    weatherForecast.open('GET', forecastPath, true);
    weatherForecast.responseType = 'text'; 
    weatherForecast.send();

}

weatherConditions.onload = function()
{
    if (weatherConditions.status === 200){
        cObj = JSON.parse(weatherConditions.responseText); 
        console.log(cObj);
        
        document.getElementById('location').innerHTML = cObj.current_observation.display_location.full;
        document.getElementById('weather').innerHTML = cObj.current_observation.weather;
        document.getElementById('temperature').innerHTML = cObj.current_observation.temp_f;

    } //end if
}; //end function

weatherForecast.onload = function()
{
    if (weatherForecast.status === 200)
    {
	   fObj = JSON.parse(weatherForecast.responseText);
	   console.log(fObj);

        document.getElementById('desc').innerHTML = fObj.forecast.txt_forecast.forecastday[0].fcttext;

        for(var i=0;i<3;i++)
        {
            var row = i + 1;
            document.getElementById('r' + row + 'c1').innerHTML = fObj.forecast.simpleforecast.forecastday[i].date.weekday;
            document.getElementById('r' + row + 'c3').innerHTML = fObj.forecast.simpleforecast.forecastday[i].high.fahrenheit; // +"shift option 8"
            document.getElementById('r' + row + 'c4').innerHTML = fObj.forecast.simpleforecast.forecastday[i].low.fahrenheit; // +"shift option 8"
            var imagePath = fObj.forecast.simpleforecast.forecastday[i].icon_url;
            document.getElementById('r' + row + 'c2').src = imagePath;
        }
    } //end if
}; //end function

loadWeather()
