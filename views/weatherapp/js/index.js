//6e0cecac33a36e163a298aa43dc9a0f8
$(document).ready(function() {
  $.ajaxSetup({ cache: false });
  var lat = 0;
  var lon = 0;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      lat = position.coords.latitude.toFixed(2);
      lon = position.coords.longitude.toFixed(2);
      var apiCall = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=6e0cecac33a36e163a298aa43dc9a0f8";
      $.getJSON(apiCall,function(weather){
        var city     = weather.name;
        var forecast = weather.weather[0].description;
        var ktemp    = weather.main.temp;
        var ctemp    = (ktemp - 273.15).toFixed(0);
				var ftemp    = (ktemp * (9/5) - 459.67).toFixed(0);
				var icon 	   = 'https://openweathermap.org/img/w/' + weather.weather[0].icon + '.png';
				console.log(icon)
        $("#location").html(city)
				$("#temp").html(ftemp + "°F")
				$("#forecast").html(forecast)
				$("#icon").attr('src', icon)
				$("#celcius").on('click',function(){$("#temp").html(ctemp + "°C")})
				$("#farenheit").on('click',function(){$("#temp").html(ftemp + "°F")})
      })
    });
  };
 });
