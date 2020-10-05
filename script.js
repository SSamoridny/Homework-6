//variable to store the current date
const currentDay = moment()
	.format('L');
//variable to store unique API key
var API_KEY = "555f0f1cc17650cb7069ee6104be4ed1";
var searchHistory = getSearchHistory();
var searchButton = document.getElementById("search-button");
var searchValue = document.getElementById("search-value");
var card = {
	date: document.querySelectorAll(".card-title"),
	images: document.querySelectorAll(".card-body .card-image"),
	temp: document.querySelectorAll(".card-body .card-temp span"),
	humidity: document.querySelectorAll(".card-body .card-humid span")
}

var apiData
// This function adds search to localstorage and updates sidebar
function addToSearchHistory(City) {
	searchHistory.push(City);
	setSearchHistory(searchHistory);
	var node = document.createElement("li");
	node.setAttribute("class", "list-group-item");
	var textnode = document.createTextNode(City);
	node.appendChild(textnode);
	//onclick eventlistener for list items
	node.addEventListener("click", function () {
		handleSideBarOnClick(City);
	});
	document.querySelector(".cities")
		.appendChild(node);
}