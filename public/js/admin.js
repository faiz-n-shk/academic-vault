document
  .getElementById("adminForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("http://localhost:3000/api/admin_upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        try {
          const errorData = await response.json();
          console.error("Error response from server:", errorData);
          document.getElementById("error-message").textContent =
            errorData.message;
        } catch (jsonError) {
          console.error("Error parsing JSON response:", jsonError);
          document.getElementById("error-message").textContent =
            "An error occurred while submitting the form.";
        }
      } else {
        document.getElementById("error-message").textContent =
          "Form submitted successfully!";
        form.reset();
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      document.getElementById("error-message").textContent =
        "An error occurred while submitting the form.";
    }
  });

document.getElementById("file").addEventListener("change", function (event) {
  const fileList = document.getElementById("file-list");
  fileList.innerHTML = "";
  for (const file of event.target.files) {
    const listItem = document.createElement("li");
    listItem.textContent = file.name;
    fileList.appendChild(listItem);
  }
});
