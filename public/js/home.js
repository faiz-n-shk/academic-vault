function logOut() {
  localStorage.setItem("isLoggedin", "false");
  window.location.href = "../index.html";
}

// Show admin button if user is admin
if (localStorage.getItem("isAdmin") === "true") {
  document.getElementById("adminButton").style.display = "inline-block";
}

document.querySelectorAll(".tile").forEach((tile) => {
  tile.addEventListener("mousemove", (e) => {
    const rect = tile.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    tile.style.transition = "transform 0.2s ease-out";
    tile.style.transform = `perspective(1000px) rotateX(${
      -(y - rect.height / 2) / 10
    }deg) rotateY(${(x - rect.width / 2) / 10}deg) scale(1.1)`;
  });

  tile.addEventListener("mouseleave", () => {
    tile.style.transition = "transform 0.5s ease-in";
    tile.style.transform = "perspective(1000px) scale(1)";
  });

  tile.addEventListener("click", () => {
    window.location.href = tile.getAttribute("data-url");
  });
});

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  document.body.style.backgroundPosition = `${x}% ${y}%`;
});
