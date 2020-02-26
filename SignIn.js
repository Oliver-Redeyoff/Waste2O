function checkAccount(){

  var email = document.getElementById("email")
  var password = document.getElementById("password")

  fetch('https://europe-west2-waste2o-268013.cloudfunctions.net/login', {
    body: JSON.stringify(
      {
        email: email.value,
        password: password.value,
      }
    ),
    headers: {"Content-Type": "application/json"},
    mode: 'cors',
    method: "POST"
  })
    .then((response) => {
      console.log(response)
      // if(response.statusText=="OK"){
      //   console.log("created account")
      //   setCookie("email", email.value, 100)
      //   location.href = "../index.html"
      // } else {
      //   console.log("didn't create account")
      //   message.style.display = "block"
      //   message.innerHTML = "Your details are wrong or your account already exists"
      //   console.log(document.cookie);
      // }
    })
}

function test(){
  console.log("this words")
}
