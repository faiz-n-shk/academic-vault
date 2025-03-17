document.addEventListener("DOMContentLoaded", () => {
  const usersTable = document.getElementById("users-table");

  // Fetch and display users
  async function fetchUsers() {
    try {
      console.log("Fetching users..."); // Log fetch start
      const response = await fetch("http://localhost:3000/api/users");
      console.log("Response status:", response.status); // Log response status
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }

      const users = await response.json();
      console.log("Fetched users:", users); // Log fetched users

      if (users.length === 0) {
        usersTable.innerHTML = `<tr><td colspan="3">No users found.</td></tr>`;
        return;
      }

      usersTable.innerHTML = ""; // Clear table
      users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.firstname} ${user.lastname}</td>
          <td>${user.email}</td>
          <td>
            <label class="switch-button" for="switch-${user._id}">
              <div class="switch-outer">
                <input id="switch-${user._id}" type="checkbox" ${
          user.isAdmin ? "checked" : ""
        }>
                <div class="button">
                  <span class="button-toggle"></span>
                  <span class="button-indicator"></span>
                </div>
              </div>
            </label>
          </td>
        `;
        usersTable.appendChild(row);
      });

      // Add event listeners to checkboxes in the user table
      document
        .querySelectorAll("#users-table input[type='checkbox']")
        .forEach((checkbox) => {
          checkbox.addEventListener("change", async (e) => {
            const userId = e.target.id.replace("switch-", "");
            const isAdmin = e.target.checked;

            try {
              console.log(`Updating user ${userId} isAdmin to ${isAdmin}`); // Log update
              const response = await fetch(
                `http://localhost:3000/api/users/${userId}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ isAdmin }),
                }
              );

              if (!response.ok) {
                throw new Error("Failed to update user.");
              }

              alert("User updated successfully!");
            } catch (err) {
              console.error(err);
              alert("Error updating user.");
            }
          });
        });
    } catch (err) {
      console.error("Error fetching users:", err);
      usersTable.innerHTML = `<tr><td colspan="3">Error loading users.</td></tr>`;
    }
  }

  fetchUsers();

  // Add user functionality
  document
    .getElementById("add-user-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const firstname = document.getElementById("firstname").value;
      const lastname = document.getElementById("lastname").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const isAdmin = document.getElementById("isAdmin").checked;

      try {
        const response = await fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            password,
            isAdmin,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add user.");
        }

        alert("User added successfully!");
        document.getElementById("add-user-form").reset();
        fetchUsers(); // Refresh the user list
      } catch (err) {
        console.error(err);
        alert("Error adding user.");
      }
    });
});
