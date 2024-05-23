document.addEventListener('DOMContentLoaded', () => {
    const respuestasDiv = document.getElementById('respuestas');

    // Recuperación de los datos del almacenamiento local
    const datosFormulario = JSON.parse(localStorage.getItem('datosFormulario'));
    const userEmail = localStorage.getItem('userEmail');
    const userPassword = localStorage.getItem('userPassword');

    console.log("Datos del formulario recuperados del almacenamiento local:", datosFormulario);

    // Visualización de datos en el HTML
    respuestasDiv.innerHTML = `
        <p>Nombre: ${datosFormulario.nombre}</p>
        <p>Apellido: ${datosFormulario.apellido}</p>
        <p>Correo electrónico: ${datosFormulario.correo}</p>
        <p>Sexo: ${datosFormulario.sexo}</p>
        <p>Fecha de nacimiento: ${datosFormulario.fecha}</p>
        <p>Nacionalidad: ${datosFormulario.nacionalidad}</p>
        <p>Correo electrónico guardado en localStorage: ${userEmail}</p>
        <p>Contraseña guardada en localStorage: ${userPassword}</p>
    `;
});