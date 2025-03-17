const colors = [
  { r: 255, g: 0, b: 0 },
  { r: 255, g: 255, b: 0 },
  { r: 0, g: 255, b: 0 },
  { r: 0, g: 0, b: 255 },
];
let colorIndex = 0;
let step = 0;
const steps = 100;

function interpolateColor(color1, color2, factor) {
  const result = {
    r: Math.round(color1.r + factor * (color2.r - color1.r)),
    g: Math.round(color1.g + factor * (color2.g - color1.g)),
    b: Math.round(color1.b + factor * (color2.b - color1.b)),
  };
  return `rgb(${result.r}, ${result.g}, ${result.b})`;
}

function changeColor() {
  const titles = document.querySelectorAll(".contact-info-title");
  const googleMapsLink = document.querySelector(".google-maps-link");
  const nextColorIndex = (colorIndex + 1) % colors.length;
  const factor = step / steps;
  const color = interpolateColor(
    colors[colorIndex],
    colors[nextColorIndex],
    factor
  );
  titles.forEach((title) => {
    title.style.color = color;
    title.style.textShadow = `0 0 10px ${color}`;
  });
  googleMapsLink.style.color = color;
  googleMapsLink.style.textShadow = `0 0 10px ${color}`;
  step++;
  if (step > steps) {
    step = 0;
    colorIndex = nextColorIndex;
  }
}

setInterval(changeColor, 50);
