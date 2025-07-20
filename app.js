let data = {};

// Load data from JSON file
fetch('data.json')
  .then(response => response.json())
  .then(json => data = json)
  .catch(error => console.error('Error loading data.json:', error));

function searchByRobot() {
  const area = document.getElementById("areaSelect").value;
  const model = document.getElementById("modelSelect").value;
  const robot = document.getElementById("robotInput").value.trim().toUpperCase();
  const resultDiv = document.getElementById("result");

  if (!area || !model || !robot) {
    alert("Please select area, model and enter robot name.");
    return;
  }

  if (
    data[area] &&
    data[area][model] &&
    data[area][model][robot]
  ) {
    const welds = data[area][model][robot];
    resultDiv.innerText = `Welds made by robot ${robot} in ${area} (${model}):\n\n${welds.join(", ")}`;
  } else {
    resultDiv.innerText = `No data found for robot ${robot} in ${area} (${model}).`;
  }
}

function searchByWeld() {
  const weldID = document.getElementById("weldInput").value.trim().toUpperCase();
  const resultDiv = document.getElementById("result");
  let found = false;

  if (!weldID) {
    alert("Please enter a weld ID.");
    return;
  }

  for (const area in data) {
    for (const model in data[area]) {
      for (const robot in data[area][model]) {
        const welds = data[area][model][robot];
        if (welds.includes(weldID)) {
          resultDiv.innerText = `Weld ID ${weldID} was made by robot ${robot} in ${area} (${model}).\nOther welds by this robot:\n\n${welds.join(", ")}`;
          found = true;
          return;
        }
      }
    }
  }

  if (!found) {
    resultDiv.innerText = `Weld ID ${weldID} not found.`;
  }
}

