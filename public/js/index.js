let isLoggedin = localStorage.getItem("isLoggedin") === "true" || false;
// Toggle menu responsiveness
function myMenuFunction() {
  var i = document.getElementById("navMenu");

  if (i.className === "nav-menu") {
    i.className += " responsive";
  } else {
    i.className = "nav-menu";
  }
}

// Variables for form switching
const a = document.getElementById("loginBtn");
const b = document.getElementById("registerBtn");
const x = document.getElementById("login");
const y = document.getElementById("register");

//redirect to home
function redirect() {
  if (isLoggedin) {
    window.location.href = "./pages/home.html";
  } else {
    alert("Please login to access the homepage.");
  }
}

// Switch to login form
function login() {
  x.style.left = "4px";
  y.style.right = "-520px";
  a.className += " white-btn";
  b.className = "btn";
  x.style.opacity = 1;
  y.style.opacity = 0;
}

// Switch to registration form
function register() {
  x.style.left = "-510px";
  y.style.right = "5px";
  a.className = "btn";
  b.className += " white-btn";
  x.style.opacity = 0;
  y.style.opacity = 1;
}

// Handle login form submission
async function handleLogin() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  if (!username || !password) {
    alert("Please fill in all login fields.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (response.ok) {
      const isAdmin = result.isAdmin ? "true" : "false";
      localStorage.setItem("isLoggedin", "true");
      localStorage.setItem("isAdmin", isAdmin);

      if (result.isAdmin) {
        const choice = confirm(
          "Admin login detected! Do you want to go to the Admin page? Click 'Cancel' to go to the Home page."
        );
        window.location.href = choice
          ? "./pages/admin_panel.html"
          : "./pages/home.html";
      } else {
        alert("Login successful!");
        window.location.href = "./pages/home.html";
      }
    } else {
      alert("Login failed: " + result.message);
    }
  } catch (error) {
    alert("An error occurred during login: " + error.message);
  }
}

// Handle registration form submission
async function handleRegister() {
  const firstname = document.getElementById("registerFirstname").value;
  const lastname = document.getElementById("registerLastname").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  if (!firstname || !lastname || !email || !password) {
    alert("Please fill in all registration fields.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstname, lastname, email, password }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Registration successful!");
      login(); // Switch to login form after successful registration
    } else {
      alert("Registration failed: " + result.message);
    }
  } catch (error) {
    alert("An error occurred during registration: " + error.message);
  }
}

// Toggle password visibility
const passwordField = document.getElementById("loginPassword");
const toggleImage = document.getElementById("toggleImage");

const passwordField2 = document.getElementById("registerPassword");
const toggleImage2 = document.getElementById("toggleImage2");

let isPasswordVisible = false;
if (passwordField && toggleImage) {
  toggleImage.addEventListener("click", function () {
    if (isPasswordVisible) {
      passwordField.type = "password";
      toggleImage.src = "./assets/images/close.svg";
      isPasswordVisible = false;
    } else {
      passwordField.type = "text";
      toggleImage.src = "./assets/images/open.svg";
      isPasswordVisible = true;
    }
  });
}
let isPasswordVisible2 = false;
if (passwordField2 && toggleImage2) {
  toggleImage2.addEventListener("click", function () {
    if (isPasswordVisible2) {
      passwordField2.type = "password";
      toggleImage2.src = "./assets/images/close.svg";
      isPasswordVisible2 = false;
    } else {
      passwordField2.type = "text";
      toggleImage2.src = "./assets/images/open.svg";
      isPasswordVisible2 = true;
    }
  });
}

// Homepage redirection logic
const homepage = document.getElementById("homepage");
if (homepage) {
  homepage.addEventListener("click", function () {
    if (isLoggedin) {
      window.location.href = "../pages/home.html";
    } else {
      alert("Please login to access the homepage.");
    }
  });
}

// Enable Enter key onkeyboard for login and register forms
document
  .getElementById("loginForm")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLogin();
    }
  });

document
  .getElementById("registerForm")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleRegister();
    }
  });
