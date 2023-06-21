document.addEventListener("DOMContentLoaded", function () {
  var toggles = document.querySelectorAll(".ticket .toggle");

  toggles.forEach(function (toggle) {
    toggle.addEventListener("change", function () {
      var statusElement = toggle
        .closest(".eventDetails")
        .querySelector(".status");
      var ticketName = toggle
        .closest(".ticket")
        .querySelector("h3").textContent;
      if (toggle.checked) {
        statusElement.textContent = +ticketName + "Status: attending";
        updateStatus(toggle.closest(".ticket").id, "attending");
        console.log("attending");
      } else {
        statusElement.textContent = ticketName + "Status: rejected";
        updateStatus(toggle.closest(".ticket").id, "rejected");
        console.log("rejected");
      }
    });

    // Initial status check
    var statusElement = toggle
      .closest(".eventDetails")
      .querySelector(".status");
    var ticketName = toggle.closest(".ticket").querySelector("h3").textContent;
    if (!toggle.checked) {
      statusElement.textContent = "Status: rejected" + ticketName;
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
      body: JSON.stringify({ status }), // Send the status in the request body
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
