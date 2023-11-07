// Initialize and add the map
let map;

// Get the URL of the current page
const url = new URL(window.location.href);

// Access the search (query) parameters
const queryParams = url.searchParams;

// Get specific query parameters by name
const courtName = queryParams.get("teren");
const lat = queryParams.get("lat");
const lng = queryParams.get("lng");
const courtType = queryParams.get("type");

async function initMap() {
  // The location of Brasov
  const position = { lat: parseFloat(lat), lng: parseFloat(lng) };

  // Request needed libraries
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Brasov
  map = new Map(document.getElementById("map"), {
    zoom: 16,
    center: position,
    mapId: "Court_Map",
  });

  const markerPin = document.createElement("img");
  markerPin.src = "./pin.png";
  markerPin.width = 75;
  markerPin.height = 75;

  const marker = new AdvancedMarkerElement({
    map,
    position,
    title: courtName,
    content: markerPin,
  });
}

initMap();

const terenTitle = document.querySelector("#teren-title");
terenTitle.textContent = courtName;

const nerenovatImage = document.querySelector("#nerenovat-image");
const actualNerenovatImage = new Image();
actualNerenovatImage.src = `/wp-content/uploads/2023/terenuri/${courtName}/nerenovat.png`;
actualNerenovatImage.addEventListener("load", function () {
  nerenovatImage.src = actualNerenovatImage.src;
});

const renovatImage = document.querySelector("#renovat-image");
const actualRenovatImage = new Image();
actualRenovatImage.src = `/wp-content/uploads/2023/terenuri/${courtName}/renovat.png`;
actualRenovatImage.addEventListener("load", function () {
  renovatImage.src = actualRenovatImage.src;
});

const terenType = document.querySelector("#tip-suprafata");
terenType.textContent = courtType;
