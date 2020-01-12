const currentDay = moment().format("dddd, MMMM Do");
const timeBlocks = [
  { hour: "9AM", time: 9 },
  { hour: "10AM", time: 10 },
  { hour: "11AM", time: 11 },
  { hour: "12PM", time: 12 },
  { hour: "1PM", time: 13 },
  { hour: "2PM", time: 14 },
  { hour: "3PM", time: 15 },
  { hour: "4PM", time: 16 },
  { hour: "5PM", time: 17 }
];

let tasks = ["", "", "", "", "", "", "", "", ""];

function renderTimeBlocks() {
  $(".container").empty();

  for (let i = 0; i < timeBlocks.length; i++) {
    let taskContent = tasks[i];
    let hourName = timeBlocks[i].hour;
    let presentHour = parseInt(moment().format("HH"));
    let thisHour = timeBlocks[i].time;
    let inputElStyle = "";

    if (thisHour < presentHour) {
      inputElStyle = "past";
    } else {
      inputElStyle = "future";
    }

    if (thisHour === presentHour) {
      inputElStyle = "present";
    }

    let timeBlockEl = $("<form>").attr("class", "input-group row");
    let hourContainer = $("<div>").attr("class", "col-2");
    let hourEl = $("<div>")
      .attr("class", "hour")
      .text(hourName)
      .css("text-align", "right");
    let inputEl = $("<textarea>")
      .attr("class", `form-control textarea ${inputElStyle}`)
      .attr("type", "text")
      .attr("id", "input" + i)
      .val(taskContent);
    let buttonEl = $("<div>").attr("class", "input-group-append");
    let button = $("<button>")
      .attr("class", "saveBtn")
      .attr("data-index", i);
    let lockIcon = $("<i>").attr("class", "fas fa-lock");

    $(".container").append(timeBlockEl);

    button.append(lockIcon);
    buttonEl.append(button);

    hourContainer.append(hourEl);

    timeBlockEl
      .append(hourContainer)
      .append(inputEl)
      .append(buttonEl);
  }
}

function init() {
  let storedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (storedTasks !== null) {
    tasks = storedTasks;
  }

  renderTimeBlocks();
}

function storeTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

$(document).ready(function() {
  init();
  $("#currentDay").append(currentDay);

  $(".saveBtn").on("click", function(event) {
    event.preventDefault();
    let textInput = $(`#input${dataIndex}`).val();

    tasks.splice(dataIndex, 1, textInput);
    storeTasks();
  });

  setInterval(function() {
    presentHour = parseInt(moment().format("HH"));
    renderTimeBlocks();
  }, 300000);
});
