let data = {};

fetch('data.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    console.log("✅ Data loaded successfully");
  })
  .catch(error => {
    console.error("❌ Error loading data.json:", error);
  });

const btnSearch = document.getElementById('btnSearch');
const areaSelect = document.getElementById('area');
const searchIdInput = document.getElementById('searchId');
const searchRobotInput = document.getElementById('searchRobot');
const resultDiv = document.getElementById('result');

btnSearch.addEventListener('click', () => {
  const area = areaSelect.value;
  const id = searchIdInput.value.trim().toLowerCase();
  const rawRobotInput = searchRobotInput.value.trim().toUpperCase().replace(/\s+/g, '');
  const robot = rawRobotInput ? 'robot' + rawRobotInput : '';

  if (!area) {
    resultDiv.textContent = '⚠️ Please select an area.';
    return;
  }

  if (!id && !robot) {
    resultDiv.textContent = '⚠️ Please enter a weld ID or robot name.';
    return;
  }

  if (id && robotInput.value.trim()) {
    resultDiv.textContent = '⚠️ Please search by either weld ID or robot name, not both.';
    return;
  }

  const robots = data[area];
  if (!robots) {
    resultDiv.textContent = '❌ Area not found.';
    return;
  }

  if (id) {
    let robotFound = null;
    for (const [robotName, ids] of Object.entries(robots)) {
      if (ids.map(i => i.toLowerCase()).includes(id)) {
        robotFound = robotName;
        break;
      }
    }
    if (robotFound) {
      const welds = robots[robotFound];
      resultDiv.textContent = `✅ Weld ID "${id}" was applied by robot "${robotFound}".\n\n🔧 Other welds by this robot:\n- ${welds.join('\n- ')}`;
    } else {
      resultDiv.textContent = `❌ Weld ID "${id}" not found in selected area.`;
    }
  } else if (robot) {
    const welds = robots[robot];
    if (welds && welds.length > 0) {
      resultDiv.textContent = `🔧 Robot "${robot}" performs the following welds:\n- ${welds.join('\n- ')}`;
    } else {
      resultDiv.textContent = `❌ Robot "${robot}" not found or has no welds in this area.`;
    }
  }
});
