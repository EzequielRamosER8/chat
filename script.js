// Contenido de script.js

// Función para leer el archivo JSON
function leerArchivoJSON(archivo) {
  return fetch(archivo)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`No se pudo cargar el archivo JSON (${response.status} ${response.statusText})`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error al cargar el archivo JSON:', error);
    });
}

// Función para seleccionar la respuesta adecuada
function seleccionarRespuesta(pregunta) {
  return leerArchivoJSON('respuestas.json')
    .then((respuestas) => {
      const respuestaSeleccionada = respuestas.find((respuesta) => respuesta.pregunta === pregunta);

      if (!respuestaSeleccionada) {
        return "No se ha encontrado una respuesta para tu pregunta. Por favor, intenta preguntar de otra manera o contacta con nosotros para obtener más información.";
      }

      return respuestaSeleccionada.respuesta;
    });
}

// Función para agregar mensajes al chat con animación de entrada
function agregarMensaje(mensaje, tipo) {
  const listaMensajes = document.getElementById('messages');
  const nuevoMensaje = document.createElement('li');
  nuevoMensaje.classList.add('message', tipo, 'message-enter'); // Agregamos la clase 'message-enter'
  nuevoMensaje.textContent = mensaje;
  listaMensajes.appendChild(nuevoMensaje);

  // Scroll hasta el nuevo mensaje
  listaMensajes.scrollTop = listaMensajes.scrollHeight;

  // Eliminamos la clase de animación después de un pequeño tiempo
  setTimeout(() => {
    nuevoMensaje.classList.remove('message-enter');
  }, 10);
}

// Función para manejar el clic en el botón de enviar
document.getElementById('send').addEventListener('click', function () {
  const inputUsuario = document.getElementById('input');
  const preguntaUsuario = inputUsuario.value.trim();

  if (preguntaUsuario !== '') {
    // Limpiar el campo de entrada
    inputUsuario.value = '';

    // Mostrar la pregunta del usuario en el chat
    agregarMensaje(preguntaUsuario, 'user-message');

    // Obtener la respuesta y mostrarla en el chat
    seleccionarRespuesta(preguntaUsuario)
      .then((respuesta) => {
        agregarMensaje(respuesta, 'bot-message');
      });
  }
});




  


  
  