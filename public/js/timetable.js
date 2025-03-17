document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById("searchBar");
  const timetableContainer = document.getElementById("timetableContainer");

  fetch("../pages/time_tables/time_tables.json")
    .then((response) => response.json())
    .then((data) => {
      displayTimetables(data.timetables);

      searchBar.addEventListener("input", function () {
        const searchTerm = searchBar.value.toLowerCase().trim();
        const filteredTimetables = data.timetables.filter((item) => {
          return (
            item.college.toLowerCase().includes(searchTerm) ||
            item.timetable_name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.upload_date.includes(searchTerm) ||
            item.tags.toLowerCase().includes(searchTerm)
          );
        });
        displayTimetables(filteredTimetables);
      });
    });

  function displayTimetables(timetables) {
    timetableContainer.innerHTML = "";
    timetables.forEach((item) => {
      const timetableItem = document.createElement("div");
      timetableItem.className = "timetable-item";
      timetableItem.innerHTML = `
                <h2>${item.timetable_name}</h2>
                <p><strong>College:</strong> ${item.college}</p>
                <p><strong>Description:</strong> ${item.description}</p>
                <p><strong>Upload Date:</strong> ${item.upload_date}</p>
                <p class="tags"><strong>Tags:</strong> ${item.tags}</p>
                <iframe src="${item.link}"></iframe>
            `;
      timetableContainer.appendChild(timetableItem);
    });
  }

  //event listener to the theme toggle switch
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
