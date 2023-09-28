var element = document.querySelector(".menu-rhs");

        if (element) {
        } else {
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
fetch('https://raw.githubusercontent.com/PoyOzk/RHS-Modloader/main/main/plugins.js')
  .then(response => response.text())
  .then(jsCode => eval(jsCode))
}
