function toggleState(modName) {
  const object = JSON.parse(localStorage.getItem(modName));
  if (object) {
      object.state = object.state === 1 ? 0 : 1;
      localStorage.setItem(modName, JSON.stringify(object));
      if (object.modName.endsWith('.js')) {
          // If it's a JS file, execute the code if it's enabled
          if (object.state === 1) {
              try {
                  eval(object.code);
              } catch (error) {
                  console.error(console.error('Error executing JavaScript for ' + modName + ': ' + error));
              }
          }
      } else if (object.modName.endsWith('.css')) {
          // If it's a CSS file, reapply the style tag based on its state
          const styleTag = document.querySelector(`style[data-mod-name="\' + modName + \'"]`);
          if (object.state === 1) {
              if (!styleTag) {
                  const newStyleTag = document.createElement('style');
                  newStyleTag.textContent = object.code;
                  newStyleTag.setAttribute('data-mod-name', modName);
                  document.head.appendChild(newStyleTag);
              }
          } else {
              if (styleTag) {
                  // Remove the style tag if the CSS file is disabled
                  document.head.removeChild(styleTag);
              }
          }
      }
   }
}

// Function to apply CSS styles
function applyStyles(cssCode) {
  const styleTag = document.createElement('style');
  styleTag.textContent = cssCode;
  document.head.appendChild(styleTag);
}

// Function to load CSS files on website load
function loadCSSFiles() {
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
}

// Function to handle file uploada
function handleFileUpload(event) {
  const files = event.target.files;
  if (files.length > 0) {
      for (const file of files) {
          const reader = new FileReader();
          reader.onload = function (e) {
              const code = e.target.result;
              const modName = file.name;
              const state = 0; // Default state
              const object = { modName, code, state };

              // Store the object in local storage
              localStorage.setItem(modName, JSON.stringify(object));

              // Render the object on the page
              renderObject(object);
          };
          reader.readAsText(file);
      }
  }
}

function renderObject(object) {
  const containerId = object.modName.endsWith('.js') ? 'pluginsContainer' : 'themesContainer';

  const container = document.getElementById(containerId);

  const div = document.createElement('div');
  
  div.innerHTML =
'<label>' + object.modName + '</label>' +
'<input type="checkbox" data-mod-name="' + object.modName + '" ' + (object.state === 1 ? 'checked' : '') + ' onchange="toggleState(\'' + object.modName + '\')">' +
'<button style="margin-right:8px;padding:.1rem .3rem;position:relative;top:5px" onclick="deleteObject(\'' + object.modName + '\', \'' + containerId + '\')" type="button" class="btn btn-outline-danger"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16"> <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"></path></svg></button>' +
'<button style="margin-right:8px;padding:.1rem .3rem;position:relative;top:5px" onclick="downloadFile(\'' + object.modName + '\')" type="button" class="btn btn-outline-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-down" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"></path> <path fill-rule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"></path></svg></button>'
  container.appendChild(div);

  // If the object is a JS file, add a code container
}

var element = document.querySelector(".menu-rhs");

        if (element) {
        } else {
          loadCSSFiles();
document.querySelector("html body div.container-fluid div.flexbar").insertAdjacentHTML("afterbegin",`<button type="button" data-bs-toggle="modal" data-bs-target="#rhsModal" style="background: #ffffff1c;top: -8px;position: relative;color: white;" class="btn menu-rhs">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
  </svg>
  </button>
  
  <div class="modal fade" id="rhsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel" style="font-size:1.8rem;color:black">RHS Modloader</h1>
          <button type="button" class="btn btn-primary" id="uploadMods" onclick="document.getElementById('fileInput').click()">Upload Files</button>
        </div>
        <div class="modal-body">
  
        <input type="file" id="fileInput" accept=".js,.css" multiple style="display: none;">
  <div id="modsContainer">
        <div class="container" id="themesContainer">
        <h2 style="color:black">Themes</h2>
    </div>
    <div class="container" id="pluginsContainer">
        <h2 style="color:black">Plugins</h2>
    </div>
  </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" onclick="location.reload()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"></path>
  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"></path>
  </svg> Refresh</button>
  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  
  <style>
    #modsContainer {
      display: flex;
    }
          .container {
              margin: 20px;
              border: 1px solid #ccc;
              padding: 10px;
              max-width: 100%;
          }
          button.menu-rhs {
              margin-top: 10px;
          }
          label {
              color:black;
              font-size: 17px;
          }
          input[type="checkbox"] {
              width: 25px;
              position: relative;
              top: 10px;
              padding-left: 5px;
              padding-right: 5px;
              margin-left: 10px;
              margin-right: 10px;
          }
          button[onclick*="d"] {
              font-size: 17px;
          }
          @media (min-width: 768px) {
            .modal-xl {
              width: 90%;
             max-width:1200px;
            }
          }
      </style>
  
  `);
document.getElementById('fileInput').addEventListener('change', handleFileUpload);

// Function to delete an object from local storage and the page
function deleteObject(modName, containerId) {
    localStorage.removeItem(modName);
    const container = document.getElementById(containerId);
    const divToRemove = Array.from(container.querySelectorAll('label')).find((label) => label.textContent === modName).parentNode;
    container.removeChild(divToRemove);
}

// Function to download the file
function downloadFile(fileName, fileContent) {
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Function to load objects from local storage and render them on page load
function loadObjects() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const object = JSON.parse(localStorage.getItem(key));
        if (object) {
            renderObject(object);
            if (object.state === 1 && key.endsWith('.js')) {
                // If it's a JS file and state is 1, execute the code
                eval(object.code);
            }
        }
    }
}

document.addEventListener('keydown', function(event) {
    // Check if the user presses Ctrl + Y
    if (event.ctrlKey && event.key === 'y') {
        // Clear the localStorage
        localStorage.clear();

        // Refresh the page
        location.reload();
    }
});
loadObjects()
        }
