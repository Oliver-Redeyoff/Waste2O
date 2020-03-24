var startLocation = {lat: -25.344, lng: 131.036};
var currentPos;

var styledMapType;
var map;


document.addEventListener('DOMContentLoaded', function() {
  checkCookie();
}, false);


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

  var request = new XMLHttpRequest();
  request.open('GET', 'https://europe-west2-waste2o-268013.cloudfunctions.net/allShops', true);

  request.onload = function() {
    var data = JSON.parse(this.response);
    data.forEach(element => convertAndDrop(element, "blue"));
  }
  request.send();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      currentPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var userLocation = new google.maps.Marker({animation: google.maps.Animation.DROP, position: currentPos, icon: "assets/person.png", map: map, title:"test"});
      google.maps.event.addDomListener(map, 'click', function() {clearShopInfo()});

      map.setCenter(currentPos);
      map.zoom = 13;

    }, function() {
      //handleLocationError(true, infoWindow, map.getCenter());
    });

  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }

}


// drops a marker at a given coordinate location
function drop(title, position, color){
	var newMarker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    Title: title,
    position: position,
    map: map,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/" + color + "-dot.png"
    }
  });
  google.maps.event.addDomListener(newMarker, 'click', function() {markerClick(newMarker)});
}


// geocodes address and drops a marker at that location
function convertAndDrop(location, color){
  var request = new XMLHttpRequest()
  fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + location.address + '&key=AIzaSyDSbrWA2sznywFet3dt4yodoLdTCLpVxJE', {
    mode: 'cors',
    method: "GET"
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      drop(location.address, data.results[0].geometry.location, color);
    });
}


// decides the page to redirect to on click of the account icon
function profileClick(){
  //document.cookie = "username=; expires=Thu, 18 Dec 2014 12:00:00 UTC; path=/";
  if(getCookie("email") == ""){
    location.href = "pages/SignIn.html"
  } else {
    setCookie("email", "", -1)
    setCookie("notMess", "Signed out", 1)
    location.reload()
  }
}


// TODO: move code to function above
function checkCookie(){
  if(getCookie("email") != ""){
    setCookie("notMess", "You are signed in", 1)
    document.getElementById("profileText").innerHTML = "Sign out";
  } else {
    if(getCookie("notMess") != "Signed out"){
      setCookie("notMess", "Welcome to Waste2O", 1)
    }
  }
  notification()
}


// makes the shopInfo tab appear and displays in it the info of the
function markerClick(marker){

  if(document.getElementById("addShopVisible")){
    toggleAddShop()
    return
  }

  if(document.getElementById("shopPageHidden")){
    document.getElementById("shopPageHidden").id = "shopPageVisible";
  }
  else if(document.getElementById("shopPageInitial")){
    document.getElementById("shopPageInitial").id = "shopPageVisible";
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
      console.log(data)
      document.getElementById("shopName").innerHTML = data.name;
      document.getElementById("shopAddress").innerHTML = data.address;
      document.getElementById("shopPic").src = data.image;
      document.getElementById("shopDescription").innerHTML = data.description;
      document.getElementById("shopProducts").innerHTML = "";

      var tags = []

      for(product in data.products){

        for (tag in data.products[product].tags){
          tags.push(data.products[product].tags[tag])
        }

        if(data.products[product].rating > -10){
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
      }

      for (tag in tags){
        tags[tag] = tags[tag].toLowerCase();
      }

      var set = new Set(tags);
      var tagSet = Array.from(set)
      document.getElementById("shopTags").innerHTML = ""

      for(var i=0 ; i<tagSet.length ; i++){
        console.log(tagSet[i])
        document.getElementById("shopTags").innerHTML += "<a id='productTag'>" + tagSet[i] + "</a>"
        console.log("added tag")
      }
      console.log(tags)
      console.log(tagSet)

      if(document.getElementById("newProductVisible")){
        document.getElementById("newProductVisible").id = "newProductHidden";
      }

      if(getCookie("email") == "" && document.getElementById("addProduct")){
        document.getElementById("addProduct").id = "addProductDisabled"
      }

    });

}


// makes the shopInfo tab dissapear if it is visible
function clearShopInfo(){
  if(document.getElementById("shopPageVisible")) {
    document.getElementById("shopPageVisible").id = "shopPageHidden";
  }
  if(document.getElementById("newProductVisible")){
    document.getElementById("newProductVisible").id = "newProductHidden";
  }
  if(document.getElementById("addShopVisible")){
    document.getElementById("addShopVisible").id = "addShopHidden";
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
        setCookie("notMess", "Product upvoted", 1)
        notification()
      } else {
        document.getElementById(productName).innerHTML = (parseInt(document.getElementById(productName).innerHTML) - 1);
        document.getElementById(productName+"Downvote").onclick = "";
        document.getElementById(productName+"Downvote").style.backgroundColor = "rgba(158, 83, 141, 0.7)";
        setCookie("notMess", "Product downvoted", 1)
        notification()
      }
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


// toggle the new product window
function toggleNewProduct(){
  if(document.getElementById("addProduct")){
    if(document.getElementById("newProductInitial")){
      document.getElementById("newProductInitial").id = "newProductVisible";
    }
    else if(document.getElementById("newProductHidden")){
      document.getElementById("newProductHidden").id = "newProductVisible";
    }
    else if(document.getElementById("newProductVisible")){
      document.getElementById("newProductVisible").id = "newProductHidden";
    }
  } else {
    setCookie("notMess", "You must sign in to add a product", 1)
    notification()
  }
}


// function which creates cookie with name, value and expiration date in certain amount of days
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


// function which gets value of cookie with certain name
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


// function adds a product based on user input
function addProduct(){

  //var type = document.getElementById("typeInput").value
  var name = document.getElementById("nameInput").value
  var description = document.getElementById("descriptionInput").value
  var packaging = document.getElementById("packagingInput").value
  var tags = document.getElementById("tagsInput").value.split(", ")
  var address = document.getElementById("shopAddress").innerHTML

  if(name != "" && description != "" && packaging != "" && tags.length != 0){
    // post the product to the database
    fetch('https://europe-west2-waste2o-268013.cloudfunctions.net/addProduct', {
      body: JSON.stringify(
        {
          type: "test",
          name: name,
          description: description,
          tags: tags,
          packaging: packaging,
          ownerAdded: true,
          address: address
        }
      ),
      headers: {"Content-Type": "application/json"},
      mode: 'cors',
      method: "POST"
    })
      .then((response) => {
        if(response.ok){
          setCookie("notMess", "Added new product", 1)
          notification()
          clearShopInfo()
        } else {
          setCookie("notMess", "Couldn't add product", 1)
          notification()
        }
      })
  }
}


// toggles visibility of addShop window
function toggleAddShop(){
  console.log("email is " + getCookie("email"))
  if(getCookie("email") != ""){
    if(document.getElementById("shopPageVisible")) {
      document.getElementById("shopPageVisible").id = "shopPageHidden";
    }
    if(document.getElementById("newProductVisible")){
      document.getElementById("newProductVisible").id = "newProductHidden";
    }

    if(document.getElementById("addShopInitial")){
      document.getElementById("addShopInitial").id = "addShopVisible"
    }
    else if(document.getElementById("addShopHidden")){
      document.getElementById("addShopHidden").id = "addShopVisible"
    }
    else if(document.getElementById("addShopVisible")){
      document.getElementById("addShopVisible").id = "addShopHidden"
    }
  } else {
    setCookie("notMess", "Sign in to add shop", 1)
    notification()
  }
}


// adds a shop to the databse based on user input
function addShop(){

  if(getCookie("email") != ""){

    var name = document.getElementById("shopNameInput").value
    var description = document.getElementById("shopDescriptionInput").value
    var address = document.getElementById("shopAddressInput").value
    var image = document.getElementById("shopImgInput").value

    if(name != "" && description != "" && address != ""){
      fetch('https://europe-west2-waste2o-268013.cloudfunctions.net/newShop', {
        body: JSON.stringify(
          {
            name: name,
            description: description,
            address: address,
            image: image,
            email: getCookie("email")
          }
        ),
        headers: {"Content-Type": "application/json"},
        mode: 'cors',
        method: "POST"
      })
        .then((response) => {
          if(response.ok){
            setCookie("notMess", "Added new shop", 1)
            location.reload()
          } else {
            setCookie("notMess", "Couldn't add new shop", 1)
            notification()
            console.log(response)
          }
        })
    }

  } else {
    setCookie("notMess", "Sign in to add new shop", 1)
    notification()
  }

}


// adds notification saying that the shop has been reported
function reportShop(){
  setCookie("notMess", "You have reported a shop<br>we will forward this to an admin", 1)
  notification()
  clearShopInfo()
}


// displays only shops which have a certain product
function searchProduct(){

  var productName = document.getElementById("productSearchBar").value

  fetch('https://europe-west2-waste2o-268013.cloudfunctions.net/searchItem', {
    body: JSON.stringify(
      {
        product: productName
      }
    ),
    headers: {"Content-Type": "application/json"},
    mode: 'cors',
    method: "POST"
  })
  .then(response => response.json())
  .then(data => {
    if(data.length == 0){
      setCookie("notMess", "No such product exists", 1)
      notification()
      return
    }
    for(shop in data){
      console.log(shop)
      convertAndDrop(data[shop], "green")
    }
  })
}


// displays notification with cookie as it's message
function notification(){
  if(getCookie("notMess") != ""){
    document.getElementById("notificationMessage").innerHTML = getCookie("notMess")
  }

  if(document.getElementById("not1")){
    document.getElementById("not1").id = "not2"
  } else{
    document.getElementById("not2").id = "not1"
  }
}
