function createAccount(){

  console.log("running function")

  var message = document.getElementById("message");
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var passwordConfirm = document.getElementById("passwordConfirm");

  if(email.value.includes("@") && password.value!="" && password.value.length >= 8 && password.value==passwordConfirm.value){
    email.disabled = true;
    password.disabled = true;
    passwordConfirm.disabled = true;
    console.log("adding account")
    // create account using given details
    fetch('https://europe-west2-waste2o-268013.cloudfunctions.net/createAccount', {
      body: JSON.stringify(
        {
          email: email.value,
          password: password.value,
          type:"regular"
        }
      ),
      headers: {"Content-Type": "application/json"},
      mode: 'cors',
      method: "POST"
    })
      .then((response) => {
        if(response.statusText=="OK"){
          console.log("created account")
          setCookie("email", email.value, 100)
          location.href = "../index.html"
        } else {
          console.log("didn't create account")
          message.style.display = "block"
          message.innerHTML = "Your details are wrong or your account already exists"
          console.log(document.cookie);
        }
      })
  } else {
    message.style.display = "block"
    message.innerHTML = "Your details are wrong or your account already exists"
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
