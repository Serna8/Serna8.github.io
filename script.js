// Supabase Initialization
const supabaseUrl = 'https://scszlluerojbaasvakxd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjc3psbHVlcm9qYmFhc3Zha3hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNzE4NzgsImV4cCI6MjA2Mjc0Nzg3OH0.8LScuEyHllzwvqj98bbxgdusjxZnoKn4_Gt0KJX4HVc';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Variables Globales
const correctPassword = "12/12/2023";

// Función para verificar la clave
function checkPassword() {
  const input = document.getElementById("password").value;
  const login = document.getElementById("login");
  const app = document.getElementById("app");
  const error = document.getElementById("error");

  if (input === correctPassword) {
    login.classList.add("hidden");
    app.classList.remove("hidden");
    loadData();
    loadFotos();
    loadComentarios();
  } else {
    error.textContent = "Clave incorrecta. Intenta de nuevo.";
  }
}

// Función para cargar datos de configuración
async function loadData() {
  const { data, error } = await supabase
    .from('configuracion')
    .select('*')
    .limit(1)
    .single();

  if (data && !error) {
    document.body.style.backgroundColor = data.fondo_color;
    document.getElementById("colorPicker").value = data.fondo_color;
  }
}

// Función para guardar color de fondo
async function saveColor() {
  const color = document.getElementById("colorPicker").value;
  await supabase
    .from('configuracion')
    .upsert([{ id: '1', fondo_color: color }], { onConflict: ['id'] });

  document.body.style.backgroundColor = color;
  alert("Fondo guardado con éxito!");
}

// Función para cargar fotos
async function loadFotos() {
  const { data, error } = await supabase
    .from('fotos')
    .select('*');

  if (data && !error) {
    const fotosContainer = document.getElementById("fotosContainer");
    fotosContainer.innerHTML = '';
    data.forEach(foto => {
      const img = document.createElement('img');
      img.src = foto.url;
      img.alt = "Foto de recuerdo";
      img.style.width = '200px';
      img.style.margin = '10px';
      fotosContainer.appendChild(img);
    });
  }
}

// Función para subir fotos
async function uploadFoto() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  const { data, error } = await supabase.storage
    .from('fotos')
    .upload('public/' + file.name, file);

  if (data && !error) {
    const { publicURL, error } = supabase.storage
      .from('fotos')
      .getPublicUrl('public/' + file.name);

    if (publicURL) {
      await supabase
        .from('fotos')
        .insert([{ url: publicURL }]);
      loadFotos();
    }
  }
}

// Función para guardar comentario
async function saveComentario() {
  const comentario = document.getElementById("comentariosText").value;
  await supabase
    .from('comentarios')
    .insert([{ comentario }]);

  loadComentarios();
}

// Función para cargar comentarios
async function loadComentarios() {
  const { data, error } = await supabase
    .from('comentarios')
    .select('*');

  if (data && !error) {
    const comentariosContainer = document.getElementById("comentariosContainer");
    comentariosContainer.innerHTML = '';
    data.forEach(comentario => {
      const p = document.createElement('p');
      p.textContent = comentario.comentario;
      comentariosContainer.appendChild(p);
    });
  }
}

// Función para cerrar sesión
function logout() {
  const login = document.getElementById("login");
  const app = document.getElementById("app");

  login.classList.remove("hidden");
  app.classList.add("hidden");
}
