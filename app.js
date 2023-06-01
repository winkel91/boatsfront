document.getElementById("createBoatForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const form = event.target;
    const boatData = {
      name: form.name.value,
      lengthClass: form.lengthClass.value,
    };
  
    fetch("/boats", {
      method: "POST",
      body: JSON.stringify(boatData),
      headers: {
        "Content-Type": "application/json"
      },
      
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server (e.g., display a success message)
      console.log("Boat created successfully:", data);
    })
    .catch(error => {
      // Handle any error that occurred during the request
      console.error("Error creating boat:", error);
    });
  });
fetch("/boats")
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
