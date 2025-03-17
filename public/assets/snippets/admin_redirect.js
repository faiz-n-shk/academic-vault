// Show admin button if user is admin
if (localStorage.getItem("isAdmin") === "true") {
    document.getElementById("adminButton").style.display = "inline-block";
}