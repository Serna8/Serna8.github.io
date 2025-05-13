// Crear instancia de Supabase
const supabase = supabase.createClient('https://scszlluerojbaasvakxd.supabase.co', 'tu_clave_api');

// Función para verificar el password (aquí puedes manejar la autenticación)
function checkPassword() {
  const password = document.getElementById('password').value;
  if (password === 'tu_fecha') {  // La fecha especial
    document.getElementById('login').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
  } else {
    document.getElementById('error').innerText = 'Fecha incorrecta';
  }
}

// Función para guardar datos en la tabla de frases
async function saveData() {
  const phrase = document.getElementById('textArea').value;
  const color = document.getElementById('colorPicker').value;

  const { data, error } = await supabase
    .from('frases')
    .insert([{ text: phrase, color: color }]);

  if (error) {
    console.error('Error al guardar:', error);
  } else {
    document.getElementById('saveMsg').innerText = 'Frase guardada con éxito!';
  }
}

// Función para subir fotos
async function uploadPhoto() {
  const photoInput = document.getElementById('photoInput');
  const file = photoInput.files[0];

  if (file) {
    const { data, error } = await supabase
      .storage
      .from('fotos')
      .upload('foto_' + Date.now(), file);

    if (error) {
      console.error('Error al subir foto:', error);
    } else {
      loadPhotos(); // Actualizar la galería de fotos
    }
  }
}

// Función para cargar fotos de la base de datos
async function loadPhotos() {
  const { data, error } = await supabase
    .from('fotos')
    .select('*');

  if (data) {
    const gallery = document.getElementById('photoGallery');
    gallery.innerHTML = '';
    data.forEach(photo => {
      const img = document.createElement('img');
      img.src = `https://scszlluerojbaasvakxd.supabase.co/storage/v1/object/public/fotos/${photo.name}`;
      gallery.appendChild(img);
    });
  }
}

// Función para guardar comentarios
async function saveComment() {
  const comment = document.getElementById('commentInput').value;

  const { data, error } = await supabase
    .from('comentarios')
    .insert([{ text: comment }]);

  if (error) {
    console.error('Error al guardar comentario:', error);
  } else {
    document.getElementById('commentMessage').innerText = 'Comentario guardado con éxito!';
  }
}

// Función para cambiar el color de fondo
function changeBackgroundColor() {
  const color = document.getElementById('backgroundColor').value;
  document.body.style.backgroundColor = color;
}
