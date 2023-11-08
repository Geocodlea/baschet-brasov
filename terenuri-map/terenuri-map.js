// Initialize and add the map
let map;
let markers = [];
let createdMarkers = []; // Keep track of created markers

async function initMap() {
  // The location of Brasov
  const position = { lat: 45.6524781, lng: 25.5964628 };

  // Request needed libraries
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Brasov
  map = new Map(document.getElementById("map"), {
    zoom: 13,
    center: position,
    mapId: "Basketball_Map",
  });

  try {
    const response = await fetch(
      "https://basketball-app-production.up.railway.app/api/v1/courts/search"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    markers = await response.json();

    // Create markers for each item in the 'markers' array
    createdMarkers = markers
      .filter(
        (markerData) =>
          markerData.coordinates?.latitude || markerData.coordinates?.longitudeß
      )
      .map((markerData, index) => {
        const contentMarker = document.createElement("div");
        contentMarker.innerHTML = `<div id=pin-${index} style="display: block"><img src="/wp-content/uploads/2023/10/pin.png" width=35 height=35 alt="baschet pin" /></div>
                                   <div id=popup-${index} style="display: none; background: white; padding: 2rem; text-align: center; font-size: 1.5rem;">
                                      <h3 style="margin-bottom: 10px; ">${markerData.name}</h3>
                                      <a href="/teren-de-baschet/teren?teren=${markerData.name}&lat=${markerData.coordinates.latitude}&lng=${markerData.coordinates.longitude}&type=${markerData.courtType}" style="text-decoration: none; font-weight: bold;">VEZI DETALII TEREN</a>
                                   </div>`;

        const marker = new AdvancedMarkerElement({
          map: map,
          position: {
            lat: markerData.coordinates.latitude,
            lng: markerData.coordinates.longitude,
          },
          title: markerData.name,
          content: contentMarker,
        });
        marker.setAttribute("data-type", markerData.courtType);
        marker.setAttribute("data-state", markerData.renovationStatus);
        marker.setAttribute("id", index);

        marker.setAttribute("data-name", markerData.name);
        marker.setAttribute("data-lat", markerData.coordinates.latitude);
        marker.setAttribute("data-lng", markerData.coordinates.longitude);

        marker.addEventListener("gmp-click", () => {
          //toggleHighlight(marker);

          const terenName = document.querySelector("#terenModal h3");
          const terenLink = document.querySelector("#terenModal a");

          terenName.textContent = markerData.name; //markerView.dataset.name;
          terenLink.href = `/teren?teren=${markerData.name}&lat=${markerData.coordinates.latitude}&lng=${markerData.coordinates.longitude}&type=${markerData.courtType}`; //`/teren?teren=${markerView.dataset.name}&lat=${markerView.dataset.lat}&lng=${markerView.dataset.lng}&type=${markerView.dataset.type}`;

          document.getElementById("terenModal").style.display = "block";
          document.getElementById("overlay").style.display = "block";

          document
            .getElementById("closeModal")
            .addEventListener("click", function () {
              document.getElementById("terenModal").style.display = "none";
              document.getElementById("overlay").style.display = "none";
            });

          document
            .getElementById("overlay")
            .addEventListener("click", function () {
              document.getElementById("terenModal").style.display = "none";
              document.getElementById("overlay").style.display = "none";
            });
        });

        return marker;
      });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function toggleHighlight(markerView) {
  if (markerView.content.classList.contains("highlight")) {
    markerView.content.classList.remove("highlight");

    // const pin = document.querySelector(`#pin-${markerView.id}`);
    // pin.style.display = "block";
    // const popup = document.querySelector(`#popup-${markerView.id}`);
    // popup.style.display = "none";

    // Show all other markers
    // createdMarkers.forEach((otherMarker) => {
    //   if (otherMarker !== markerView) {
    //     otherMarker.content.style.display = "block";
    //   }
    // });
  } else {
    markerView.content.classList.add("highlight");

    // const pin = document.querySelector(`#pin-${markerView.id}`);
    // pin.style.display = "none";
    // const popup = document.querySelector(`#popup-${markerView.id}`);
    // popup.style.display = "block";

    const terenName = document.querySelector("#terenModal h3");
    const terenLink = document.querySelector("#terenModal a");

    terenName.textContent = markerView.dataset.name;
    terenLink.href = `/teren?teren=${markerView.dataset.name}&lat=${markerView.dataset.lat}&lng=${markerView.dataset.lng}&type=${markerView.dataset.type}`;

    document.getElementById("terenModal").style.display = "block";
    document.getElementById("overlay").style.display = "block";

    document
      .getElementById("closeModal")
      .addEventListener("click", function () {
        document.getElementById("terenModal").style.display = "none";
        document.getElementById("overlay").style.display = "none";
      });

    document.getElementById("overlay").addEventListener("click", function () {
      document.getElementById("terenModal").style.display = "none";
      document.getElementById("overlay").style.display = "none";
    });

    // Hide all other markers
    // createdMarkers.forEach((otherMarker) => {
    //   if (otherMarker !== markerView) {
    //     otherMarker.content.style.display = "none";
    //   }
    // });
  }
}

const changeMarkers = (selectedType, selectedState) => {
  createdMarkers.forEach((marker) => {
    marker.map = null;
  });

  const filteredMarkers = createdMarkers.filter((marker) => {
    return (
      (selectedType === "" ||
        selectedType === undefined ||
        marker.getAttribute("data-type") === selectedType) &&
      (selectedState === "" ||
        selectedState === undefined ||
        marker.getAttribute("data-state") === selectedState)
    );
  });

  if (filteredMarkers.length > 0) {
    // Center the map on the first matching marker
    const firstMatchingMarker = filteredMarkers[0];
    map.setCenter(firstMatchingMarker.position);
    // Set the map with all filtered markers
    filteredMarkers.forEach((marker) => {
      marker.map = map;
    });
  }
};

const urlMarkers = () => {
  // Get the URL of the current page
  const url = new URL(window.location.href);

  // Access the search (query) parameters
  const queryParams = url.searchParams;

  const selectedType = queryParams.get("terrain");
  const selectedState = queryParams.get("status");

  if (selectedType !== null && selectedState !== null) {
    changeMarkers(selectedType, selectedState);
  }
};

async function runMapFunctions() {
  await initMap();
  urlMarkers();
}

setTimeout(() => {
  const button = document.querySelector("#submitButtonVite");

  button.addEventListener("click", (e) => {
    e.preventDefault();

    const selectedType = document.querySelector("#selectedType")?.dataset.type;
    const selectedState =
      document.querySelector("#selectedStatus")?.dataset.type;

    changeMarkers(selectedType, selectedState);
  });
}, 500);

runMapFunctions();
