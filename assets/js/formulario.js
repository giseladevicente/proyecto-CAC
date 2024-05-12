document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formulario-registro');
    
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        const datos = {
            nombre: formulario.name.value,
            apellido: formulario.lastname.value, 
            correo: formulario.email.value,
            color: formulario.sexo.value,
            fecha: formulario.nacimiento.value,
            archivo: formulario.nacionalidad.value,
            archivo: formulario.password.value,
            archivo: formulario.reingreso-password.value,
            suscripcion: formulario.suscripcion.checked
        };

        localStorage.setItem('datosFormulario', JSON.stringify(datos));
        sessionStorage.setItem('datosFormulario', JSON.stringify(datos));
        window.location.href = 'respuesta.html';
    });
});