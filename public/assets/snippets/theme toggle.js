// Theme toggle functionality snippet
document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // to change default theme just replace 'light-theme' with 'dark-theme' and vice versa, and also change the checked value to false or true respectively
  body.classList.add("dark-theme");
  themeToggle.checked = true;

  themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
      // Enable dark theme
      body.classList.add("dark-theme");
      body.classList.remove("light-theme");
    } else {
      // Enable light theme
      body.classList.add("light-theme");
      body.classList.remove("dark-theme");
    }
  });
});
