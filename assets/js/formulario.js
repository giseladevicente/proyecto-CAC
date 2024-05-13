document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formulario-registro');
    
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        const datos = {
            nombre: formulario.name.value,
            apellido: formulario.lastname.value, 
            correo: formulario.email.value,
            sexo: formulario.sexo.value,
            fecha: formulario.fecha.value,
            nacionalidad: formulario.nacionalidad.value,
            password: formulario.password.value,
            password2: formulario.reingresoPassword.value,
            terminos: formulario.condiciones.checked
        };

        localStorage.setItem('datosFormulario', JSON.stringify(datos));
        sessionStorage.setItem('datosFormulario', JSON.stringify(datos));
        window.location.href = 'respuesta-registro.html';
    });
});