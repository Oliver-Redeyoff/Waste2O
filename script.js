var startLocation = {lat: -25.344, lng: 131.036};
var paris = {lat: 48.856613, lng: 2.352222};

var styledMapType;
var map;

var currentPos;

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

      // fetch('https://europe-west2-waste2o-268013.cloudfunctions.net/allShops', {
      //   mode: 'cors',
      //   credentials: 'include',
      //   method: "GET"
      // })
      //   .then((response) => {
      //     console.log(response.json());
      //     return response.json();
      //   })
      //   .then((data) => {
      //     data.forEach(element => convertAndDrop(element));
      //   });

      var request = new XMLHttpRequest();
      request.open('GET', 'https://europe-west2-waste2o-268013.cloudfunctions.net/allShops', true);

      request.onload = function() {
        var data = JSON.parse(this.response);
        console.log(data);
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

function drop(title, position){
	var newMarker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    Title: title,
    position: position,
    map: map,
  });
  google.maps.event.addDomListener(newMarker, 'click', function() {markerClick(newMarker)});
}


function convertAndDrop(location){
  var request = new XMLHttpRequest()

  // Open a new connection, using the GET request on the URL endpoint
  // request.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location.address + '&key=AIzaSyDSbrWA2sznywFet3dt4yodoLdTCLpVxJE', true)
  //
  // var data = null;
  // request.onload = function () {
  //   data = JSON.parse(this.response)
  //   drop(location.name, data.results[0].geometry.location);
  // }
  //
  // request.send()

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


function profileClick(){
  location.href = 'pages/ProfilePage.html';
}


function logIn(){
	//document.cookie = "username=; expires=Thu, 18 Dec 2014 12:00:00 UTC; path=/";
  if(document.cookie == ""){
    location.href = "pages/SignIn.html"
  } else {
    location.href = "pages/ProfilePage.html"
  }
	console.log(document.cookie);
}


function markerClick(marker){
  console.log(marker.getTitle());
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
      console.log(data);
      document.getElementById("shopName").innerHTML = data.name;
      document.getElementById("shopDescription").innerHTML = data.description;
      document.getElementById("shopAddress").innerHTML = data.address;
      document.getElementById("shopProducts").innerHTML = "";

      for(product in data.products){
        console.log(product);
        var html =
          "<div id='product'>" +
          "<p><a style='font-weight: bold'>Name : </a>" + data.products[product].name + "</p>" +
          "<p><a style='font-weight: bold'>Description : </a>" + data.products[product].description + "</p>" +
          "<p><a style='font-weight: bold'>Packaging : </a>" + data.products[product].packaging + "</p>" +
          "</div>";

        document.getElementById("shopProducts").innerHTML += html;
      }
    });

}

function clearShopInfo(){
  if(document.getElementById("shopPageVisible")) {
    document.getElementById("shopPageVisible").id = "shopPageHidden";
  }
}

// var shopInfoRequest = new XMLHttpRequest()
// var body = JSON.stringify({address:"29 Shaftesbury Road Bath, Somerset"})
// console.log(body)
// shopInfoRequest.open("POST", "https://us-central1-waste2o-268013.cloudfunctions.net/fetchShopDetails");
// var shopInfo = null;
// shopInfoRequest.send(body);
// shopInfoRequest.onload = function () {
// 	shopInfo = JSON.parse(this.response)
//   console.log(shopInfo);
// }
