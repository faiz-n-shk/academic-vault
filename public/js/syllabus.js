document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById("searchBar");
  const syllabusContainer = document.getElementById("syllabusContainer");

  fetch("../pages/syllabus/syllabus.json")
    .then((response) => response.json())
    .then((data) => {
      displaySyllabus(data.syllabus);

      searchBar.addEventListener("input", function () {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredSyllabus = data.syllabus.filter(
          (item) =>
            item.course.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
            item.year.includes(searchTerm)
        );
        displaySyllabus(filteredSyllabus);
      });
    });

  function displaySyllabus(syllabus) {
    syllabusContainer.innerHTML = "";
    syllabus.forEach((item) => {
      const syllabusItem = document.createElement("div");
      syllabusItem.className = "syllabus-item";
      syllabusItem.innerHTML = `
                <h2>${item.course}</h2>
                <p>${item.description}</p>
                <p><strong>Year:</strong> ${item.year}</p>
                <p class="tags"><strong>Tags:</strong> ${item.tags.join(
                  ", "
                )}</p>
                <iframe src="${item.link}"></iframe>
            `;
      syllabusContainer.appendChild(syllabusItem);
    });
  }
});
