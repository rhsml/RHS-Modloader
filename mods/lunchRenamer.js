/**
 * @name Lunch Renaming
 * @author Poy Ozkusaksiz
 * @version 0.1
 * @description Allows you to rename the lunch period to whatever you want.
*/


// Stealing functions

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

if (window.location.href.includes("admin")) {


const p4Row = document.querySelector("div.row:nth-child(5)");

if (p4Row) {
    const newHtml = `
        <div class="row g-3 align-items-center">
            <div class="col-auto">
                <label for="InputLunch" class="form-label" style="margin-right: 16px;">Lunch:</label>
            </div>
            <div class="col-auto">
                <input type="text" class="form-control" id="InputLunch" name="Lunch">
                <label for="InputLunchEmj" class="form-label emj">Emoji:</label>
                <input type="text" class="form-control" id="InputLunchEmj" name="PeriodLunchEmj" style="width:45px">
            </div>
        </div>
    `;

    p4Row.insertAdjacentHTML('afterend', newHtml);
    if (getCookieEmjPlugin("Lunch")) {InputLunch.value = getCookieEmjPlugin("Lunch")}
    if (document.querySelector("#InputLunchEmj") && getCookieEmjPlugin("LunchEmj")) {
        document.querySelector("#InputLunchEmj").value = getCookieEmjPlugin("LunchEmj");
      }
    
}
document.submitClassNames = submitClassNames;
if (!submitClassNames.toString().includes("Added by Emoji Plugin")) {
    console.info(
        "%c[Lunch Renaming] %cEmoji Plugin is detected.",
        "color: #db6134; font-weight: bold;",
        "color: unset;"
      ); 
    }
function submitClassNames() {
    for (let i = 1; i <= 8; i++) {
      if (document.querySelector("#InputPeriod" + i).value) {
        setCookieEmjPlugin("Period" + i, document.querySelector("#InputPeriod" + i).value + longCode);
      } else {
        setCookieEmjPlugin("Period" + i, '<span class="original">Period ' + i + "</span>" + longCode);
      }
  
      // Added by Emoji Plugin
      if (document.querySelector("#Input" + i + "Emj")) {
      if (document.querySelector("#Input" + i + "Emj").value) {
        setCookieEmjPlugin("Period" + i + "Emj", document.querySelector("#Input" + i + "Emj").value);
      } else {
      }
    }
    }
    if (InputLunch) {
    document.cookie = "Lunch=" + InputLunch.value + "; expires=Sun, 31 Dec 2030 12:00:00 UTC; path=/" + "; samesite=strict";
    document.cookie = "LunchEmj=" + InputLunchEmj.value + "; expires=Sun, 31 Dec 2030 12:00:00 UTC; path=/" + "; samesite=strict";
    }
    location.replace("https://app.ridgewood.k12.nj.us");
  }

  setTimeout(() => {
    if (!document.querySelector("#Input1Emj")) {
        document.querySelector(".emj").style.display = "none";
        document.querySelector("#InputLunchEmj").style.display = "none";
    }
}, 20);

} else {
        if (getCookieEmjPlugin("Lunch")) {

    const rows = document.querySelectorAll('.table-success td:nth-child(2)');
    let lunchTime = -1;
    
    rows.forEach((td, index) => {
      if (td.textContent.includes('Lunch')) {
        lunchTime = index;
        td.textContent = getCookieEmjPlugin("Lunch");
      }
    });
    
    if (lunchTime === -1) {
        console.info(
            "%c[Lunch Renaming] %cLunch period not found.",
            "color: #db6134; font-weight: bold;",
            "color: unset;"
          ); 
    }
    }
}