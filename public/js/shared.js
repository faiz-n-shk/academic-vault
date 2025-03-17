function logOut() {
  localStorage.setItem("isLoggedin", "false");
  localStorage.removeItem("isAdmin"); // Clear admin status
  window.location.href = "../index.html";
}

// can use on all web papers
function enforceLogin() {
  if (localStorage.getItem("isLoggedin") !== "true") {
    window.location.href = "../index.html";
  }
  // Ensure isAdmin is set to a valid value
  if (!localStorage.getItem("isAdmin")) {
    localStorage.setItem("isAdmin", "false");
  }
}

// On page load, check login status
if (localStorage.getItem("isLoggedin") === "false") {
  console.log("User is not logged in");
}
