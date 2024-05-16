document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    if(email && message) {
        alert('Mensaje enviado con éxito.\nEmail: ' + email + '\nMensaje: ' + message);
        // Aca agregar el código para enviar el formulario a nuestro servidor
    } else {
        alert('Por favor, completa todos los campos.');
    }
});