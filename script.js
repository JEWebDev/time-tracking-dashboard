const $ = (element) => document.querySelector(element);
const timeOptions = document.querySelectorAll('input[type="radio"]');
const $dashboard = $("#dashboard");

function clearDashboard(dashboard) {
  dashboard.textContent = "";
}

function getTimeframeWord(timeframe) {
  if (timeframe === "daily") {
    return "day";
  } else if (timeframe === "weekly") {
    return "week";
  } else {
    return "month";
  }
}

function updateHours() {}

function renderUI(data) {
  const timeFrame = $('input[type="radio"]:checked').value;
  let time = getTimeframeWord(timeFrame);

  const { title, timeframes } = data;
  const hours = timeframes[timeFrame];
  const currentHours = hours["current"];
  const previousHours = hours["previous"];

  /* clone template */
  const $template = $("#task-template");

  const $clonedTemplate = $template.content.cloneNode(true);
  const $newTask = $clonedTemplate.querySelector("#task");
  const $newTitle = $clonedTemplate.querySelector("#title");
  const $newCurrHours = $clonedTemplate.querySelector("#current-hours");
  const $newTimeframe = $clonedTemplate.querySelector("#timeframe");

  /* fill the template with the data from json file */
  $newTask.classList.add(title.toLowerCase().replace(/\s/g, ""));
  $newTitle.textContent = title;
  $newCurrHours.textContent = `${currentHours}hrs`;
  $newTimeframe.textContent = `Last ${time} - ${previousHours}hrs`;
  $dashboard.appendChild($newTask);
}

const getData = async function () {
  const response = await fetch("./data.json");
  const data = await response.json();
  data.forEach((data) => {
    renderUI(data);
  });
};

getData();

timeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    clearDashboard($dashboard);
    getData();
  });
});
