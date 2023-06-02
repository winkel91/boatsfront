
fetch("http://localhost:8085/boats")
  .then(response => response.json())
  .then(data => {
    const boatDropdown = document.getElementById("boatDropdown");
    
    data.forEach(boat => {
      const option = document.createElement("option");
      option.value = boat.id;
      option.textContent = boat.name;
      boatDropdown.appendChild(option);
    });
  })
  .catch(error => {
    console.error("Error fetching boats:", error);
  });

function displayRaceList(races) {
  const raceList = document.getElementById("raceList");
  raceList.innerHTML = ""; 
  
  races.forEach(race => {
    const li = document.createElement("li");
    li.textContent = `Date: ${race.date}, Boat: ${race.boat}, Placement: ${race.placement}`;
    raceList.appendChild(li);
  });
}


document.getElementById("createRaceForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const form = event.target;
  const boatId = form.boatDropdown.value; 
  
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

      console.log("Race created successfully:", data);
    })
    .catch(error => {

      console.error("Error creating race:", error);
    });

  const url = `http://localhost:8085/boats/${boatId}/giftPoints?placement=${raceData.placement}`;
  fetch(url, {
    method: "POST",
  })
    .then(response => response.json())
    .then(data => {

      console.log("Points gifted successfully:", data);
    })
    .catch(error => {

      console.error("Error gifting points:", error);
    });
});

document.getElementById("addBoatToAllDatesButton").addEventListener("click", function() {
  const boatId = 'boat_id'; 
  
  fetch("http://localhost:8085/available-dates")
    .then(response => response.json())
    .then(dates => {
      const requests = dates.map(date => {
        const raceData = {
          date: date,
          boatId: boatId,
        };
        return fetch("http://localhost:8085/races", {
          method: "POST",
          body: JSON.stringify(raceData),
          headers: {
            "Content-Type": "application/json"
          },
        });
      });
      return Promise.all(requests);
    })
    .then(responses => {

      console.log("Boat added to all dates:", responses);
    })
    .catch(error => {
      console.error("Error adding boat to all dates:", error);
    });
});


fetch("http://localhost:8085/races")
  .then(response => response.json())
  .then(data => {
    displayRaceList(data);
  })
  .catch(error => {
    console.error("Error fetching races:", error);
  });
  app.post("/boats/:id/giftPoints", (req, res) => {
    const boatId = req.params.id;
    const placement = req.query.placement;
  
    Boat.findById(boatId)
      .then(boat => {
        if (!boat) {
          return res.status(404).json({ error: "Boat not found" });
        }
  

        const newPoints = boat.points + Number(placement);
  

        boat.points = newPoints;
  

        return boat.save();
      })
      .then(boat => {
        res.json({ message: "Points gifted successfully", boat });
      })
      .catch(error => {
        res.status(500).json({ error: "Error gifting points" });
      });
  });
