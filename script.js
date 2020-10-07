//Global elements needed for the functions
var citySearchName = document.getElementById('searchValue')
var searchButton = document.getElementById('search-button')
var moment = moment().format('L');
//var APIKey = "0b276ca072mshebd5f85a364591cp19a269jsn385a7112a304";
var APIKey = "166a433c57516f51dfab1f7edaed8413";

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
searchBarHistory()
//Onclick event to take the Select City bar input and pass it into the API and also to use for local storage and display
function searchButtonClick(event) {
	let city = citySearchName.value;
	console.log(city)
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
		document.querySelector('#cityNameJumboDisplay').textContent = apiData.name + ` (` + moment + ')'
		document.querySelector('#currentJumboTemp').innerHTML = `Temperature : ${(apiData.main.temp)} &#186 C`
		document.querySelector('#jumboHumidity').innerHTML = `Humidity : ${apiData.main.humidity} %`
		document.querySelector('#jumboWindSpeed').textContent = `Wind Speed : ${apiData.wind.speed} MPH`
	
	});
} 



