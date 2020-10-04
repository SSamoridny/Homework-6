//var APIKey = "0b276ca072mshebd5f85a364591cp19a269jsn385a7112a304";
var APIKey = "166a433c57516f51dfab1f7edaed8413";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Edmonton,Alberta&appid=" + APIKey;

var apiData
// We then created an AJAX call
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(`response is: `, response )
  apiData = response

  document.querySelector('#cityNameJumboDisplay').textContent = apiData.name
  document.querySelector('.wind').textContent =apiData.wind.speed
  document.querySelector('#jumboHumidity').innerHTML = apiData.main.humidity
  document.querySelector('#currentJumboTemp').innerHTML = `Temperature : ${(apiData.main.temp - 273.15).toFixed(2)}`

  console.log(response.main.temp)
  // Create CODE HERE to Log the queryURL
  // Create CODE HERE to log the resulting object
  // Create CODE HERE to calculate the temperature (converted from Kelvin)
  // Create CODE HERE to transfer content to HTML
  // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
  // Create CODE HERE to dump the temperature content into HTML

});