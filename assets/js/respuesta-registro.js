document.addEventListener('DOMContentLoaded', function () {
    const respuestasDiv = document.getElementById('respuestas');
    const datos = JSON.parse(localStorage.getItem('datosFormulario'));

    if (datos) {
        respuestasDiv.innerHTML = `
            <p><strong>Nombre:</strong> ${datos.nombre}</p>
            <p><strong>Apellido:</strong> ${datos.apellido}</p>
            <p><strong>Correo:</strong> ${datos.correo}</p>
            <p><strong>Sexo:</strong> ${datos.sexo === 'f' ? 'Femenino' : 'Masculino'}</p>
            <p><strong>Fecha de Nacimiento:</strong> ${datos.fecha}</p>
            <p><strong>Nacionalidad:</strong> ${datos.nacionalidad}</p>
            <p><strong>Password:</strong> ${datos.password}</p>
            <p><strong>Reingreso de Password:</strong> ${datos.password2}</p>
            <p><strong>Términos y condiciones:</strong> ${datos.terminos ? 'Sí' : 'No'}</p>
        `;
    } else {
        respuestasDiv.innerHTML = '<p>No se encontraron datos en el registro.</p>';
    }
});