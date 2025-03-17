//event listener to the search bar for filtering notes
document.getElementById("search-bar").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const groups = document.querySelectorAll(".group");

  groups.forEach((group) => {
    const groupTitle = group
      .querySelector(".group-title")
      .textContent.toLowerCase();
    const notes = group.querySelectorAll(".note");
    let groupMatch = false;

    notes.forEach((note) => {
      const title = note.querySelector("a").textContent.toLowerCase();
      const description = note
        .querySelector(".description")
        .textContent.toLowerCase();
      const uploader = note
        .querySelector(".uploader")
        .textContent.toLowerCase();
      const tags = note.querySelector(".tags").textContent.toLowerCase();

      // Check if any of the note properties match the search query
      if (
        groupTitle.includes(query) ||
        title.includes(query) ||
        description.includes(query) ||
        uploader.includes(query) ||
        tags.includes(query) ||
        tags.includes(query.replace("sem ", "semester "))
      ) {
        note.style.display = "block";
        groupMatch = true;
      } else {
        note.style.display = "none";
      }
    });

    // Show or hide the group based on whether any notes match the search query
    if (groupMatch || groupTitle.includes(query)) {
      group.style.display = "block";
    } else {
      group.style.display = "none";
    }
  });
});

//event listener to load notes data when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  fetch("../pages/notes/note_id.json")
    .then((response) => response.json())
    .then((data) => {
      const notesContainer = document.getElementById("notes-container");
      data.groups.forEach((group) => {
        const groupDiv = document.createElement("div");
        groupDiv.classList.add("group");

        const groupTitle = document.createElement("div");
        groupTitle.classList.add("group-title");
        groupTitle.textContent = group.title;
        groupDiv.appendChild(groupTitle);

        const groupNotes = document.createElement("div");
        groupNotes.classList.add("group-notes");

        group.notes.forEach((note) => {
          const noteDiv = document.createElement("div");
          noteDiv.classList.add("note");
          noteDiv.setAttribute("data-group", group.title);

          const noteLink = document.createElement("a");
          noteLink.href = note.link;
          noteLink.textContent = note.title;
          noteDiv.appendChild(noteLink);

          const noteDescription = document.createElement("div");
          noteDescription.classList.add("description");
          noteDescription.textContent = note.description;
          noteDiv.appendChild(noteDescription);

          const noteUploader = document.createElement("div");
          noteUploader.classList.add("uploader");
          noteUploader.textContent = `Uploaded by: ${note.uploader}`;
          noteDiv.appendChild(noteUploader);

          const noteUploadDate = document.createElement("div");
          noteUploadDate.classList.add("upload-date");
          noteUploadDate.textContent = `Upload date: ${note.uploadDate}`;
          noteDiv.appendChild(noteUploadDate);

          const noteTags = document.createElement("div");
          noteTags.classList.add("tags");
          noteTags.textContent = `Tags: ${note.tags}`;
          noteDiv.appendChild(noteTags);

          const notePreview = document.createElement("div");
          notePreview.classList.add("preview");
          const iframe = document.createElement("iframe");
          iframe.classList.add("i-frame");
          iframe.src = note.link;
          notePreview.appendChild(iframe);

          //download icon
          const downloadLink = document.createElement("a");
          downloadLink.href = note.link;
          downloadLink.download = "";
          const downloadIcon = document.createElement("img");
          downloadIcon.src = "../assets/images/download.svg";
          downloadIcon.classList.add("download-icon");
          downloadLink.appendChild(downloadIcon);
          downloadLink.addEventListener("click", function (event) {
            event.preventDefault();
            const a = document.createElement("a");
            a.href = this.href;
            a.download = "";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          });
          notePreview.appendChild(downloadLink);

          noteDiv.appendChild(notePreview);

          groupNotes.appendChild(noteDiv);
        });

        groupDiv.appendChild(groupNotes);
        notesContainer.appendChild(groupDiv);
      });

      //event listener to toggle the visibility of group notes
      document.querySelectorAll(".group-title").forEach((title) => {
        title.addEventListener("click", function () {
          const groupNotes = this.nextElementSibling;
          if (
            groupNotes.style.display === "none" ||
            groupNotes.style.display === ""
          ) {
            groupNotes.style.display = "block";
          } else {
            groupNotes.style.display = "none";
          }
        });
      });

      //event listener to open note links in a new tab
      document.querySelectorAll(".note a").forEach((link) => {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          window.open(this.href, "_blank");
        });
      });
    });
});

//event listener to the theme toggle switch
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// to change default theme just replace 'light-theme' with 'dark-theme' and vice versa, and also change the checked value to false or true respectively
body.classList.add("dark-theme");
themeToggle.checked = true;

themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    body.classList.add("dark-theme");
    body.classList.remove("light-theme");
  } else {
    body.classList.add("light-theme");
    body.classList.remove("dark-theme");
  }
});
