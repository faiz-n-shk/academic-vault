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
