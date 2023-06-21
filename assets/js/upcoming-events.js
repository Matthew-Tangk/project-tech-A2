document.addEventListener("DOMContentLoaded", function () {
  // Function to format the date string
  function formatDate(dateString) {
    const options = { weekday: "long", day: "numeric", month: "long" };
    const date = new Date(dateString);
    return date.toLocaleDateString("nl-NL", options);
  }

  // Initialize Flatpickr datepicker
  const datePicker = flatpickr("#myDatePicker", {
    inline: true,
    dateFormat: "d/m/Y",
    onChange: function (selectedDates, dateString) {
      // Format the selected date
      const formattedDate = dateString.split("/").reverse().join("-");

      // Fetch events based on the selected date
      fetch(`/upcoming-events/${formattedDate}`)
        .then((response) => response.json())
        .then((events) => {
          const calendarResults = document.getElementById("calendar-results");
          calendarResults.innerHTML = "";

          // Show error if no events found for the selected date 
          if (events.length === 0) {
            const noDataMessage = document.createElement("p");
            noDataMessage.textContent = "Oops! There are no events for this date.";
            calendarResults.appendChild(noDataMessage);
          }
          // Display events for the selected date
          else {
            events.forEach((event) => {
              const eventCard = document.createElement("section");
              const eventDate = new Date(event.date);
              const formattedDate = `${eventDate.getDate()}-${eventDate.getMonth() + 1}-${eventDate.getFullYear()}`;
              eventCard.classList.add("event-card");
              eventCard.innerHTML = `
                  <h2>${event.title}</h2>
                  <h3>${event.city}</h3>
                  <h3>${formattedDate}</h3>
                  <h3>${event.location}</h3>
                  <button><a class="event-button" href="${event.link}">Meer informatie</a></button>
                `;
              calendarResults.appendChild(eventCard);
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    },
  });
});
