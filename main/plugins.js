document.getElementById('fileInput').addEventListener('change', handleFileUpload);

// Load objects from local storage and render them on page load

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
'<button onclick="deleteObject(\'' + object.modName + '\', \'' + containerId + '\')">Delete</button>' +
'<button onclick="downloadFile(\'' + object.modName + '\')">Download</button>';

    container.appendChild(div);

    // If the object is a JS file, add a code container
}

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
            const styleTag = document.querySelector('const styleSelector = \'style[data-mod-name="\' + modName + \'"]\'\;');
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

// Call the loadCSSFiles function on page load
window.addEventListener('load', loadCSSFiles);

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