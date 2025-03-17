document
  .getElementById("contactForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:3000/submit_contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
