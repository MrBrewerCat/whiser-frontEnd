//FUNCIONES//

// Función para verificar si los campos del formulario están completos
function verificarCampos(nombre, email, mensaje) {
    let camposIncompletos = false;

    // Verificar si todos los campos están completos
    if (nombre === '' || email === '' || mensaje === '') {
        console.log('Faltan campos por completar');
        
        // Mostrar qué campos están vacíos
        if (nombre === '') {
            console.log('Falta completar el nombre');
            camposIncompletos = true;
        }
        if (email === '') {
            console.log('Falta completar el correo electrónico');
            camposIncompletos = true;
        }
        if (mensaje === '') {
            console.log('Falta completar el mensaje');
            camposIncompletos = true;
        }
    } else {
        console.log('Todos los campos están completos');
    }

    return !camposIncompletos; // Devuelve true si todos los campos están completos, false si no
}

// Función para manejar el envío del formulario
function enviarFormulario(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    // Verificar si los campos están completos
    if (verificarCampos(nombre, email, mensaje)) {
        // Si los campos están completos, mostrar el mensaje de agradecimiento
        alert('¡Gracias por enviar su mensaje!');
    } else {
        // Si faltan campos, mostrar el mensaje de error
        alert('Por favor complete todos los campos antes de enviar.');
    }
}

// Llamado a las funciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario');
    if (formulario) { // Verifica que el formulario exista
        formulario.addEventListener('submit', enviarFormulario);
    } else {
        console.log('Formulario no encontrado');
    }
});
