document.getElementById("createBoatForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const form = event.target;
    const boatData = {
      name: form.name.value,
      lengthClass: form.lengthClass.value,
      points: form.points.value,
    };
  
    async function getData(url, settings, callbackOk, callbackError) {
      try {
      let response = await fetch(url, settings);
      if (response.ok) {
      let data = await response.json();
      callbackOk(data);
      } else {
      callbackError('Could not load data. ${response.statusText} (${response.status})')
      }
      catch(err) {
      callbackError(err)
      }
      }