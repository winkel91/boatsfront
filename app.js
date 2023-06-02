document.getElementById("createBoatForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const form = event.target;
    const boatData = {
      name: form.name.value,
      lengthClass: form.lengthClass.value,
    };
  
    fetch("http://localhost:8085/boats", {
      method: "POST",
      body: JSON.stringify(boatData),
      headers: {
        "Content-Type": "application/json"
      },
      
    })
    .then(response => response.json())
    .then(data => {

      console.log("Boat created successfully:", data);
    })
    .catch(error => {

      console.error("Error creating boat:", error);
    });
  });
fetch("http://localhost:8085/boats")
    .then(response => response.json())
    .then(data => {
      const boatList = document.getElementById("boatList");
      
      data.forEach(boat => {
        const listItem = document.createElement("li");
        listItem.textContent = `${boat.name} - ${boat.lengthClass} - Points: ${boat.points}`;
        boatList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error("Error fetching boats:", error);
    });
