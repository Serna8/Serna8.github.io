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
  document.getElementById("saveMsg").textContent = "¡Guardado!";
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
