const correctPassword = "12/12/2023";

function checkPassword() {
  const input = document.getElementById("password").value;
  const login = document.getElementById("login");
  const app = document.getElementById("app");
  const error = document.getElementById("error");

  if (input === correctPassword) {
    login.classList.add("hidden");
    app.classList.remove("hidden");
    loadData();
  } else {
    error.textContent = "Clave incorrecta. Intenta de nuevo.";
  }
}

function saveData() {
  const text = document.getElementById("textArea").value;
  const color = document.getElementById("colorPicker").value;
  localStorage.setItem("recuerdoTexto", text);
  localStorage.setItem("colorFondo", color);
  document.body.style.backgroundColor = color;
  document.getElementById("saveMsg").textContent = "¡Frase Guardada!";
}

function loadData() {
  const savedText = localStorage.getItem("recuerdoTexto");
  const savedColor = localStorage.getItem("colorFondo");
  if (savedText) document.getElementById("textArea").value = savedText;
  if (savedColor) {
    document.body.style.backgroundColor = savedColor;
    document.getElementById("colorPicker").value = savedColor;
  }
}

// Función para subir fotos
function uploadPhoto() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const photoUrl = event.target.result;
      savePhoto(photoUrl);
      displayPhotos();
    };
    reader.readAsDataURL(file);
  }
}

function savePhoto(photoUrl) {
  const photos = JSON.parse(localStorage.getItem("photos")) || [];
  photos.push(photoUrl);
  localStorage.setItem("photos", JSON.stringify(photos));
}

function displayPhotos() {
  const photoGallery = document.getElementById("photoGallery");
  const photos = JSON.parse(localStorage.getItem("photos")) || [];
  photoGallery.innerHTML = "";

  photos.forEach((photo, index) => {
    const imgElement = document.createElement("img");
    imgElement.src = photo;
    imgElement.alt = "Foto de recuerdo";
    imgElement.style.width = "100px";
    imgElement.style.height = "100px";
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.onclick = function() {
      deletePhoto(index);
    };

    const photoContainer = document.createElement("div");
    photoContainer.appendChild(imgElement);
    photoContainer.appendChild(deleteButton);
    photoGallery.appendChild(photoContainer);
  });
}

function deletePhoto(index) {
  const photos = JSON.parse(localStorage.getItem("photos")) || [];
  photos.splice(index, 1);
  localStorage.setItem("photos", JSON.stringify(photos));
  displayPhotos();
}

// Función para guardar comentarios
function saveComment() {
  const commentText = document.getElementById("comentariosTextArea").value;
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.push(commentText);
  localStorage.setItem("comments", JSON.stringify(comments));
  document.getElementById("comentariosTextArea").value = "";
  document.getElementById("commentMsg").textContent = "¡Comentario Guardado!";
}

// Función para mostrar comentarios
function displayComments() {
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.forEach(comment => {
    const commentElement = document.createElement("p");
    commentElement.textContent = comment;
    document.getElementById("comentariosSection").appendChild(commentElement);
  });
}

// Función para guardar configuración
function saveConfiguration() {
  const color = document.getElementById("colorPicker").value;
  localStorage.setItem("colorFondo", color);
  document.body.style.backgroundColor = color;
  document.getElementById("configMsg").textContent = "¡Configuración Guardada!";
}

window.onload = function() {
  displayPhotos();
  displayComments();
};
