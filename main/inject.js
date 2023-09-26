

document.querySelector("html body div.container-fluid div.flexbar").insertAdjacentHTML("afterbegin", `<button type="button" data-bs-toggle="modal" data-bs-target="#rhsModal" style="background: #ffffff1c;top: -4px;position: relative;color: white;" class="btn menu-rhs">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
</svg>
</button>



<div class="modal fade" id="rhsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel" style="font-size:1.46rem;color:black">RHS Modloader</h1>
      </div>
      <div class="modal-body">

      <input type="file" id="fileInput" accept=".js, .css" multiple style="display: none;">
      <button type="button" class="btn btn-secondary" onclick="document.getElementById('fileInput').click()">Upload Files</button>

      <div class="container" id="themesContainer">
      <h2 style="color:black">Themes</h2>
  </div>
  <div class="container" id="pluginsContainer">
      <h2 style="color:black">Plugins</h2>
  </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<style>
        .container {
            margin: 20px;
            border: 1px solid #ccc;
            padding: 10px;
            max-width: 300px;
        }
        button.menu-rhs {
            margin-top: 10px;
        }
    </style>


`)