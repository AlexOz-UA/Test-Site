document.onreadystatechange = function () {
  let state = document.readyState;
  if (state == "complete") {
    setTimeout(() => {
      document.getElementById("loader").style.visibility = "hidden";
      document.getElementById("headerMain").style.opacity = "1";
      document.getElementById("navbarMain").style.opacity = "1";
      document.getElementById("carouselMain").style.opacity = "1";
      document.getElementById("next").style.opacity = "1";
      document.getElementById("Video").style.opacity = "1";
      document.getElementById("prev").style.opacity = "1";
      loadCars();
    },1500);
  }
};
function showPass(pass) {
  let pass2 = document.getElementById(pass);
  if (pass2.type === "password") {
    pass2.type = "text";
  } else {
    pass2.type = "password";
  }
}
function openLogInForm() {
  const loginModal = document.getElementById("login-modal");
  const loginIframe = document.getElementById("login-iframe");
  loginModal.style.display = "block";
  loginIframe.src = "login.html";
}

function closeLogInForm() {
  const loginModal = document.getElementById("login-modal");
  const loginIframe = document.getElementById("login-iframe");
  loginModal.style.display = "none";
  loginIframe.src = "";
  userHello();
}
function openSignUpForm() {
  const signupModal = document.getElementById("signup-modal");
  const signupIframe = document.getElementById("signup-iframe");
  signupModal.style.display = "block";
  signupIframe.src = "signup.html";
}

function closeSignUpForm() {
  const signupModal = document.getElementById("signup-modal");
  const signupIframe = document.getElementById("signup-iframe");
  signupModal.style.display = "none";
  signupIframe.src = "";
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
function userHello() {
  let name = getCookie("username");
  if(name == undefined)
  {
    console.log("undefined name. not loginned yet")
  }
  else{
  document.getElementById("forms").innerHTML = `<div class='container-fluid'>
            <h2 style="font:italic;font-weight:600;color:white;">Hello, ${name}</h2>
        </div>`;
  } 
}
const slides = document.querySelectorAll(".slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const auto = true;
const intervalTime = 5000;
let slideInterval;
const nextSlide = () => {
  const current = document.querySelector(".current");
  current.classList.remove("current");
  if (current.nextElementSibling) {
    current.nextElementSibling.classList.add("current");
  } else {
    slides[0].classList.add("current");
  }
  setTimeout(() => current.classList.remove("current"));
};

const prevSlide = () => {
  const current = document.querySelector(".current");
  current.classList.remove("current");
  if (current.previousElementSibling) {
    current.previousElementSibling.classList.add("current");
  } else {
    slides[slides.length - 1].classList.add("current");
  }
  setTimeout(() => current.classList.remove("current"));
};

next.addEventListener("click", (e) => {
  nextSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

prev.addEventListener("click", (e) => {
  prevSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

if (auto) {
  slideInterval = setInterval(nextSlide, intervalTime);
}

function loadCars() {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "cars.json", true);
  xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState != 4) return;
    if (xhttp.status != 200) {
      alert(xhttp.status + ": " + xhr.statusText);
    } else {
      let cars = JSON.parse(xhttp.responseText);
      insertCars(cars);
    }
  };
}
function insertCars(cars) {
  var str = `<div class="container"> 
               <div class="row">`;
  for (let i = 0; i < cars.length; i++) {
    str += `<div class="d-flex flex-column col col-sm-4 col-lg-4 col-6">`;
    str += `<div id="card" class="card">`;
    str += `<img id="dot" src="images/dot.gif" class="fixed3" data-src="${cars[i].img}">`;
    str += `<div class="card-body">`;
    str += `<h5 class="card-title">${cars[i].name}</h5>`;
    str += `<h5 class="card-title">${cars[i].price}</h5>`;
    str += `<button onclick="loadCarsForCart(${i})" class="btn btn-success"> <src class="fas fa-shopping-cart" style="height: 25px;" width="29px"></src>Add to cart</button>`;
    str += `</div>`;
    str += `</div>`;
    str += `</div>`;
  }
  str += `<div id="cartField" class="col col-6 field" style="position:relative; left: 950px; bottom:700px;">`;
  str += `</div>
          </div>`;
  document.getElementById("cars").innerHTML = str;
  let dot = document.getElementById("dot");
  let newImg = dot.getAttribute("data-src");
  function isVisible(elem) {
    let coords = elem.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight;
    let topVisible = coords.top > 0 && coords.top < windowHeight;
    let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
    return topVisible || bottomVisible;
  }
  function showVisible() {
    for (let img of document.querySelectorAll("img")) {
      let realSrc = img.dataset.src;
      if (!realSrc) continue;
      if (isVisible(img)) {
        img.src = realSrc;
        img.dataset.src = "";
      }
    }
  }
  showVisible();
  window.onscroll = showVisible;
}
function showModal(modal) {
  let div = document.getElementById(modal);
  div.style.display = "block";
}
function closeCart() {
  let div = document.getElementById("cartModal");
  div.style.display = "none";
}
function loadCarsForCart(id) {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "cars.json", true);
  xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState != 4) return;
    if (xhttp.status != 200) {
      alert(xhttp.status + ": " + xhr.statusText);
    } else {
      let cars = JSON.parse(xhttp.responseText);
      addCarToCart(cars, id);
    }
  };
}
function addCarToCart(cars, id) {
  const cart = document.querySelector("#cart table");
  let str = document.createElement("tr");
  str.innerHTML += `<td class="image"><img style="width:190px; height:100px;" src="${cars[id].img}"></td>
    <td class="name" id="${cars[id].name}">${cars[id].name}</td>
       <td data-name="${id}" class="count">1</td>
       <td class="price">${cars[id].price}</td>
       <td><button class="remove-item btn btn-danger">Remove</button></td>`;
  cart.appendChild(str);
  const removeButton = str.querySelector(".remove-item");
  removeButton.addEventListener("click", removeItem);
}
function removeItem(event) {
  const row = event.target.parentNode.parentNode;
  row.parentNode.removeChild(row);
}
$(function () {
  const phrases = [
    "Hello! How can we help you today?",
    "Welcome to our auto shop! Is there anything we can assist you with?",
    "Good day! Are you in need of any car maintenance services?",
    "Hi there! Is there anything we can do to make your vehicle run smoother?",
    "Greetings! Do you have any questions about our services or pricing?",
    "Hello and welcome! How can we make your visit to our auto shop a great one?",
    "Hi! Is there anything we can do to help you get your vehicle back on the road?",
    "Hello and thanks for stopping by! How can we assist you with your car?",
    "Good afternoon! Are you in need of any maintenance or repair services for your vehicle?",
    "Hi there! What brings you to our auto shop today?"
  ];

  const autoPhrases = [
    "What kind of service do you need for your vehicle?",
    "We offer a wide range of services including oil changes, tire rotations, and brake inspections.",
    "Please provide us with the make and model of your car.",
    "Our team of experienced technicians will take care of your vehicle.",
    "You can trust us to provide high-quality service at an affordable price.",
    "We offer a satisfaction guarantee on all of our work.",
    "Would you like to schedule an appointment for your vehicle?",
    "We also offer towing services in case of emergency."
  ];
  const bebra = [
    "Of course we sell Bebra, we are happy to provide you it. 1kg of Bebra will be 100 Euro.",
    "Sorry! Our competitors - Bebreny, so we don’t sell it! But we have other options"
  ]
  const hello = "Welcome to our auto shop! How can we assist you today?";
  const goodbye = "Thank you for choosing our auto shop! We look forward to serving you.";

  $("#chatbot").click(function () {
    $(this).toggleClass("show");
  });
  $("#answers").append(`<div class="bot_answ">${hello}</div>`);
  $("#answers").click(function () {
    return false;
  });
  $("#ok").click(function () {
    let q = $("#question").val().trim();
    if (q != "") {
      $("#answers").append(`<div class="human_answ">${q}</div>`);
      setTimeout(function () {
        if (
          q.toLowerCase().includes("bye") ||
          q.toLowerCase().includes("goodbye")
        ) {
          $("#answers").append(`<div class="bot_answ">${goodbye}</div>`);
        } else if (
          q.toLowerCase().includes("hello")
        ) {
          $("#answers").append(`<div class="bot_answ">${hello}</div>`);
        }
        else if (
          q.toLowerCase().includes("bebra")
        ) {
          $("#answers").append(`<div class="bot_answ">${bebra}</div>`);
        } else if (
          q.toLowerCase().includes("auto") ||
          q.toLowerCase().includes("about")
        ) {
          $("#answers").append(
            `<div class="bot_answ">${
              autoPhrases[Math.floor(Math.random() * autoPhrases.length)]
            }</div>`
          );
        } else {
          $("#answers").append(
            `<div class="bot_answ">${
              phrases[Math.floor(Math.random() * phrases.length)]
            }</div>`
          );
        }

        let chatbot = document.getElementById("chatbot");
        $("#chatbot").animate(
          { scrollTop: chatbot.scrollHeight - chatbot.clientHeight },
          500
        );
      }, 1000);
    }

    $("#question").val("");
    return false;
  });
  function enterKey(event) {
    if (event.keyCode == 13) {
      $("#ok").click();
      return false;
    }
  }
  $("#question").keypress("keyup", enterKey);
  $("#question").click(function () {
    return false;
  });
});
