//Global elements needed for the functions
var citySearchName = document.getElementById('searchValue')
var searchButton = document.getElementById('search-button')
moment().format('L');
//var moment1 = moment().format('L').add(1, 'days');

//var APIKey = "0b276ca072mshebd5f85a364591cp19a269jsn385a7112a304";
var APIKey = "166a433c57516f51dfab1f7edaed8413";
var lat = "";
var lon = "";

//Local storage for searched cities
var citySearchArray = localStorage.citySearchArray ? JSON.parse(localStorage.citySearchArray) : []

function showCityButtons () {
	document.querySelector('#cityArray').innerHTML=''
	for( i=0; i<citySearchArray.length; i++ )
	document.querySelector('#cityArray').innerHTML+=`
	<li onclick="weatherResults('${citySearchArray[i]}')"class="btn btn-secondary mb-1">${citySearchArray[i]}</li>`
}

showCityButtons()

//Add event listener added to the magnifying glass icon to trigger main page display and local storage functions
searchButton.addEventListener('click', searchButtonClick);
//searchBarHistory()
//Onclick event to take the Select City bar input and pass it into the API and also to use for local storage and display
function searchButtonClick(event) {
	let city = citySearchName.value;
	console.log(city)
	//This is part of local storage where we push the value of 'city' into our array for storage and display
	citySearchArray.push(city)
	localStorage.citySearchArray=JSON.stringify(citySearchArray)
	showCityButtons()
	//addToSearchHistory(city);
	weatherResults(city);
	console.log(city)
}



function weatherResults (name) {
	
	// Here we are building the URL we need to query the database
	var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=` + name + `&units=metric&appid=` + APIKey;

	// We then created an AJAX call
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {
		console.log(`response is: `, response )
		apiData = response
	
		//This places the information collected into the jumbotron section 
		document.querySelector('#cityNameJumboDisplay').textContent = apiData.name + ' ' + moment().format('L');
		document.querySelector('#currentJumboTemp').innerHTML = `Temperature : ${(apiData.main.temp)} &#186 C`
		document.querySelector('#jumboHumidity').innerHTML = `Humidity : ${apiData.main.humidity} %`
		document.querySelector('#jumboWindSpeed').textContent = `Wind Speed : ${apiData.wind.speed} MPH`
		document.querySelector('#icon').innerHTML = `<img class="ml-5" src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png"/>`
	
 
	  //Had to get lat and long as per Fil
	  lat = apiData.coord.lat;
	  lon = apiData.coord.lon;
	  //5 Day forecast address
	  var DailyURL =
		`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=` +
		APIKey;
  
	  $.ajax({
		url: DailyURL,
		method: "GET",
	  }).then(function (response) {
		//5 Day Forecast Section. Similar to the jumbotron
		document.querySelector('#date1').textContent = moment().add(1, 'days').format('L');
		document.querySelector('#temp1').innerHTML = `Temp: ${response.daily[1].temp.day} \xB0C`;
		document.querySelector('.img1').innerHTML = `<img src="https://openweathermap.org/img/wn/${response.daily[1].weather[0].icon}@2x.png"/>`;
		document.querySelector('#humid1').innerHTML = `Temp: ${response.daily[1].humidity}%`;
		console.log(response);
		
		document.querySelector('#date2').textContent = moment().add(2, 'days').format('L');
		document.querySelector('#temp2').innerHTML = `Temp: ${response.daily[2].temp.day} \xB0C`
		document.querySelector('.img2').innerHTML = `<img src="https://openweathermap.org/img/wn/${response.daily[2].weather[0].icon}@2x.png"/>`;
		document.querySelector('#humid2').innerHTML = `Temp: ${response.daily[2].humidity}%`;
		console.log(response);
  
		document.querySelector('#date3').textContent = moment().add(3, 'days').format('L');
		document.querySelector('#temp3').innerHTML = `Temp: ${response.daily[3].temp.day} \xB0C`
		document.querySelector('.img3').innerHTML = `<img src="https://openweathermap.org/img/wn/${response.daily[3].weather[0].icon}@2x.png"/>`;
		document.querySelector('#humid3').innerHTML = `Temp: ${response.daily[3].humidity}%`;
		console.log(response);
 
		document.querySelector('#date4').textContent = moment().add(4, 'days').format('L');
		document.querySelector('#temp4').innerHTML = `Temp: ${response.daily[4].temp.day} \xB0C`
		document.querySelector('.img4').innerHTML = `<img src="https://openweathermap.org/img/wn/${response.daily[4].weather[0].icon}@2x.png"/>`;
		document.querySelector('#humid4').innerHTML = `Temp: ${response.daily[4].humidity}%`;
		console.log(response);

		document.querySelector('#date5').textContent = moment().add(5, 'days').format('L');
		document.querySelector('#temp5').innerHTML = `Temp: ${response.daily[5].temp.day} \xB0C`
		document.querySelector('.img5').innerHTML = `<img src="https://openweathermap.org/img/wn/${response.daily[5].weather[0].icon}@2x.png"/>`;
		document.querySelector('#humid5').innerHTML = `Temp: ${response.daily[5].humidity}%`;
		console.log(response);
  
	  });
  
	  var UvURL =
		`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=` +
		APIKey;
  
	  $.ajax({
		url: UvURL,
		method: "GET",
	  }).then(function (response) {
		//UV Index creator
		$("#uvNum").text(`${response.value}`);
		console.log(response.value);
		//setting UV color
		if (response.value < 2) {
		  $("#uvNum").attr("class", "btn btn-success");
		} else if (response.value >= 2 && response.value <= 5) {
		  $("#uvNum").attr("class", "btn btn-warning");
		} else if (response.value > 5 && response.value <= 7) {
		  $("#uvNum").attr("class", "btn btn-orange");
		} else if (response.value >= 8 && response.value <= 10) {
		  $("#uvNum").attr("class", "btn btn-danger");
		}
	  });
	})
}