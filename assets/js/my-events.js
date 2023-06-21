document.addEventListener("DOMContentLoaded", function () {
  var toggles = document.querySelectorAll(".ticket .toggle");

  toggles.forEach(function (toggle) {
    toggle.addEventListener("change", function () {
      var statusElement = toggle
        .closest(".eventDetails")
        .querySelector(".status");
      if (toggle.checked) {
        statusElement.textContent = "Status: attending";
        updateStatus(toggle.closest(".ticket").id, "attending");
        console.log("attending");
      } else {
        statusElement.textContent = "Status: rejected";
        updateStatus(toggle.closest(".ticket").id, "rejected");
        console.log("rejected");
      }
    });

    // Initial status check
    var statusElement = toggle
      .closest(".eventDetails")
      .querySelector(".status");
    if (!toggle.checked) {
      statusElement.textContent = "Status: rejected";
    }
  });

  function updateStatus(ticketId, status) {
    var route;
    if (ticketId === "ticketKENDRICK") {
      route = "/updateKendrickStatus";
    } else if (ticketId === "ticketSZA") {
      route = "/updateSzaStatus";
    } else if (ticketId === "ticketDOJA") {
      route = "/updateDojaStatus";
    } else if (ticketId === "ticketDRAKE") {
      route = "/updateDrakeStatus";
    }

    fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: status }), // Send the status in the request body
    })
      .then(function (response) {
        if (response.ok) {
          console.log("Status updated successfully");
        } else {
          console.log("Failed to update status.");
        }
      })
      .catch(function (error) {
        console.log("An error occurred:", error);
      });
  }
});
