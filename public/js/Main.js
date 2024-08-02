// Obtén el botón y el campo de entrada de DNI
let boton = document.getElementById('boton');
let inputDni = document.getElementById('dni');
let token;

// Obtén el token desde el servidor
fetch('/config')
  .then(response => response.json())
  .then(config => {
    token = config.token;
  })
  .catch(error => {
    console.error('Error obteniendo el token:', error);
  });

// Añade un evento click al botón para ejecutar la función cuando se haga clic
boton.addEventListener('click', traerDatos);

function traerDatos() {
    // Obtén el valor del DNI ingresado
    let dni = inputDni.value;

    // Realiza la solicitud fetch a la API
    fetch("https://apiperu.dev/api/dni/" + dni, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json()) // Convierte la respuesta a JSON
        .then(datos => {
            // Asegúrate de que los datos están en el formato esperado
            if (datos && datos.data) {
                // Llena los campos con la información obtenida
                document.getElementById('doc').value = datos.data.numero || 'No encontrado';
                document.getElementById('nombre').value = datos.data.nombres || 'No encontrado';
                document.getElementById('apellido').value = `${datos.data.apellido_paterno || ''} ${datos.data.apellido_materno || ''}`.trim() || 'No encontrado';
                document.getElementById('cui').value = datos.data.codigo_verificacion || 'No encontrado';
            } else {
                // Mensaje si no se encuentran datos
                alert('No se encontraron datos para el DNI ingresado.');
            }
        })
        .catch(error => {
            // Manejo de errores
            console.error('Error:', error);
            alert('Ocurrió un error al buscar la información.');
        });
}

// Obtener elementos del modal
let modal = document.getElementById('myModal');
let btn = document.getElementById('donateButton');
let span = document.getElementsByClassName('close')[0];

// Cuando el usuario haga clic en el botón, se abre el modal
btn.onclick = function() {
    modal.style.display = 'block';
}

// Cuando el usuario haga clic en el span (x), se cierra el modal
span.onclick = function() {
    modal.style.display = 'none';
}

// Cuando el usuario haga clic fuera del modal, se cierra
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
