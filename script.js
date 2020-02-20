var startLocation = {lat: -25.344, lng: 131.036};
var currentPos;

var styledMapType;
var map;

// initialises map and styles and positions it correctly.
function initMap() {

  styledMapType = new google.maps.StyledMapType([
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#523735"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#c9b2a6"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#dcd2be"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ae9e90"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#93817c"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a5b076"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#447530"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fdfcf8"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f8c967"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#e9bc62"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e98d58"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#db8555"
          }
        ]
      },
      {
        "featureType": "road.local",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#806b63"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8f7d77"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b9d3c2"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#92998d"
          }
        ]
      }], {name: 'Styled Map'});

  map = new google.maps.Map(document.getElementById('map'), {
    disableDefaultUI: true, zoom: 13, center: startLocation,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain','styled_map']
    }
  });

  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      currentPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var userLocation = new google.maps.Marker({animation: google.maps.Animation.DROP, position: currentPos, icon: "assets/person.png", map: map, title:"test"});
      google.maps.event.addDomListener(map, 'click', function() {clearShopInfo()});

      var request = new XMLHttpRequest();
      request.open('GET', 'https://europe-west2-waste2o-268013.cloudfunctions.net/allShops', true);

      request.onload = function() {
        var data = JSON.parse(this.response);
        data.forEach(element => convertAndDrop(element));
      }
      request.send();

      map.setCenter(currentPos);
      map.zoom = 13;

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });

  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }

}

// drops a marker at a given coordinate location
function drop(title, position){
	var newMarker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    Title: title,
    position: position,
    map: map,
  });
  google.maps.event.addDomListener(newMarker, 'click', function() {markerClick(newMarker)});
}

// geocodes address and drops a marker at that location
function convertAndDrop(location){
  var request = new XMLHttpRequest()
  fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + location.address + '&key=AIzaSyDSbrWA2sznywFet3dt4yodoLdTCLpVxJE', {
    mode: 'cors',
    method: "GET"
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      drop(location.address, data.results[0].geometry.location);
    });
}

// decides the page to redirect to on click of the account icon
function profileClick(){
  location.href = 'pages/ProfilePage.html';
}

// TODO: move code to function above
function logIn(){
	//document.cookie = "username=; expires=Thu, 18 Dec 2014 12:00:00 UTC; path=/";
  if(document.cookie == ""){
    location.href = "pages/SignIn.html"
  } else {
    location.href = "pages/ProfilePage.html"
  }
	console.log(document.cookie);
}

// makes the shopInfo tab appear and displays in it the info of the
// chosen shop
function markerClick(marker){
  if(document.getElementById("shopPageHidden")){
    document.getElementById("shopPageHidden").id = "shopPageVisible";
  }

  fetch('https://europe-west2-waste2o-268013.cloudfunctions.net/shopDetails', {
    body: JSON.stringify({address:marker.getTitle()}),
    headers: {"Content-Type": "application/json"},
    mode: 'cors',
    method: "POST"
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.getElementById("shopName").innerHTML = data.name;
      document.getElementById("shopAddress").innerHTML = data.address;
      document.getElementById("shopPic").src = data.image;
      document.getElementById("shopDescription").innerHTML = data.description;
      document.getElementById("shopProducts").innerHTML = "";

      for(product in data.products){
        var html =
          "<div id='product'>" +
          "<p><a style='font-weight: bold'>Name : </a>" + data.products[product].name + "</p>" +
          "<p><a style='font-weight: bold'>Description : </a>" + data.products[product].description + "</p>" +
          "<p><a style='font-weight: bold'>Packaging : </a>" + data.products[product].packaging + "</p>" +
          "<p><a style='font-weight: bold'>Rating : </a><a id='" + data.products[product].name + "'>" + data.products[product].rating + "</a></p>" +

          "<p><a class='rateUp' id='" + data.products[product].name + "Upvote' onclick='rate(\"" + data.address + "\", \"" + data.products[product].name + "\", \"up\")'>Upvote</a>" +
          "<a class='rateDown' id='" + data.products[product].name + "Downvote' onclick='rate(\"" + data.address + "\", \"" + data.products[product].name + "\", \"down\")'>Downvote</a></p>" +

          "</div>";

        document.getElementById("shopProducts").innerHTML += html;
      }
    });

}

// makes the shopInfo tab dissapear if it is visible
function clearShopInfo(){
  if(document.getElementById("shopPageVisible")) {
    document.getElementById("shopPageVisible").id = "shopPageHidden";
  }
}

// updates the rating of a given product in the database
function rate(shopAddress, productName, value){
  fetch('https://europe-west2-waste2o-268013.cloudfunctions.net/ratings', {
    body: JSON.stringify(
      {
        address:shopAddress,
        product:productName,
        rating:value
      }
    ),
    headers: {"Content-Type": "application/json"},
    mode: 'cors',
    method: "POST"
  })
    .then((response) => {
      if(value == "up"){
        document.getElementById(productName).innerHTML = (parseInt(document.getElementById(productName).innerHTML) + 1);
        document.getElementById(productName+"Upvote").onclick = "";
        document.getElementById(productName+"Upvote").style.backgroundColor = "rgba(125, 164, 90, 0.7)";
      } else {
        document.getElementById(productName).innerHTML = (parseInt(document.getElementById(productName).innerHTML) - 1);
        document.getElementById(productName+"Downvote").onclick = "";
        document.getElementById(productName+"Downvote").style.backgroundColor = "rgba(158, 83, 141, 0.7)";
      }
      return response.json();
    })

}

// on submit of searchBar will center on the geocoded value of the searchBar
function searchLocation(){
  fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + document.getElementById("searchBar").value + '&key=AIzaSyDSbrWA2sznywFet3dt4yodoLdTCLpVxJE', {
    mode: 'cors',
    method: "GET"
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      map.setCenter(data.results[0].geometry.location);
    });
}
