document.querySelector(".get").addEventListener("click", () => {
  console.log("getting map...");
  // set map options, we're gunna start the map in boston

  const coordinates = { lat: 42.361145, lng: -71.057083 };
  const mapOptions = {
    center: coordinates,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  // creating our map
  const map = new google.maps.Map(
    document.getElementById("googleMap"),
    mapOptions
  );

  // getting directions
  var directionsService = new google.maps.DirectionsService();

  //create a DirectionsRenderer object which we will use to display the directions
  var directionsDisplay = new google.maps.DirectionsRenderer();

  //attach the DirectionsRenderer to the map
  directionsDisplay.setMap(map);

  getRoute(directionsDisplay, directionsService, map, coordinates);
});

function getRoute(directionsDisplay, directionsService, map, coordinates) {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  // make a request in the format google api needs
  const request = {
    origin: from,
    destination: to,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
  };

  // send the request to google api's route method
  directionsService.route(request, (result, status) => {
    if (status == google.maps.DirectionsStatus.OK) {
      // if everythings good, then get the distance and time it'll take to get there
      console.log(result, "result");
      const distanceInMiles = result.routes[0].legs[0].distance.text;
      const steps = result.routes[0].legs[0].steps;
      const ul = document.querySelector("#steps");
      for (let i = 0; i < steps.length; i++) {
        let instruction = document.createElement("li");
        instruction.innerHTML = steps[i].instructions;
        ul.appendChild(instruction);
      }

      const output = document.querySelector("#output");
      output.innerText = `It'll take you ${distanceInMiles} to get from ${from} to ${to}.`;

      //display route
      directionsDisplay.setDirections(result);
    } else {
      //delete route from map

      directionsDisplay.setDirections({ routes: [] });

      //recenter map in Boston
      map.setCenter(coordinates);

      //show error message
      output.innerText = "Could not retrieve driving distance.";
    }
  });
  console.log(request, "what we send to the api");
}

// autocomplete all inputs
const input1 = document.getElementById("from");
const autocomplete1 = new google.maps.places.Autocomplete(input1);

const input2 = document.getElementById("to");
const autocomplete2 = new google.maps.places.Autocomplete(input2);
