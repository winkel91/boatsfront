document.getElementById("createRaceForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const form = event.target;
  const raceData = {
    date: form.date.value,
    placement: form.placement.value,
  };

  fetch("http://localhost:8085/races", {
    method: "POST",
    body: JSON.stringify(raceData),
    headers: {
      "Content-Type": "application/json"
    },
    
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response from the server (e.g., display a success message)
    console.log("Race created successfully:", data);
  })
  .catch(error => {
    // Handle any error that occurred during the request
    console.error("Error creating race:", error);
  });
});
fetch("http://localhost:8085/races")
  .then(response => response.json())
  .then(data => {
    const raceList = document.getElementById("raceList");
    
    data.forEach(race => {
      const listItem = document.createElement("li");
      listItem.textContent = `${race.date} - ${race.placement}`;
      raceList.appendChild(listItem);
    });
  })
  .catch(error => {
    console.error("Error fetching races:", error);
  });
