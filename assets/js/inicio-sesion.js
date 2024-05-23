document.addEventListener('DOMContentLoaded', () => {

    const formInicio = document.querySelector('#formInicio');
    const formErrors = document.getElementById('form-errors');
    
    formInicio.addEventListener('submit', (event) => {
        event.preventDefault(); //  // Previene el envío del formulario
        console.log('Submit del formulario de inicio de sesión capturado');
     
        formErrors.innerText = ''; // // Limpia errores anteriores

        if (!validarFormularioInicio()) {
            console.log('El formulario de inicio de sesión no es válido');
            formErrors.innerText = 'El formulario de inicio de sesión no es válido. Por favor, corrige los errores.';
            // event.preventDefault(); 
        } else {
            console.log('El formulario de inicio de sesión es válido');
            formErrors.innerText = 'El formulario de inicio de sesión es válido. Enviando datos...';

            // const usuario = formInicio.usuario.value.trim();
            const datosFormulario = JSON.parse(localStorage.getItem('datosFormulario'));
            const nombreUsuario = datosFormulario.nombre;

            // Almacenamiento del nombre del usuario en sessionStorage
            sessionStorage.setItem('nombreUsuario', nombreUsuario);

            // Redirección a la página productos.html
            window.location.href = '/pages/productos.html';
        }
    });


    // Función para validar campos del formulario de inicio de sesión
    const validarFormularioInicio = () => {
        let isValid = true;

        isValid = validarCampoVacio('usuario', 'El usuario es obligatorio') && isValid;
        isValid = validarCampoVacio('password', 'La contraseña es obligatoria') && isValid;
        isValid = validarCredenciales('usuario', 'password', 'El usuario o la contraseña no son correctos') && isValid;

        return isValid;
    };


    // Función para comprobar campos vacíos
    const validarCampoVacio = (idElemento, mensajeError) => {
        const field = document.getElementById(idElemento);
        const value = field.value.trim();

        if (value === '') {
            errorCampo(field, mensajeError);
            return false;
        } else {
            // validacionCorrecta(field);
            limpiarError(field);
            return true;
        }
    };


    // Validar credenciales de inicio de sesión
    const validarCredenciales = (idUsuario, idPassword, mensajeError) => {
        const usuario = document.getElementById(idUsuario).value.trim();
        const password = document.getElementById(idPassword).value.trim();

        const registradoUsuario = localStorage.getItem('userEmail');
        const registradoPassword = localStorage.getItem('userPassword');

        if (usuario !== registradoUsuario || password !== registradoPassword) {
            mostrarError(document.getElementById(idPassword), mensajeError);
            return false;
        } else {
            limpiarError(document.getElementById(idPassword));
            return true;
        }
    };
    
    // Función para mostrar errores
    const mostrarError = (input, mensaje) => {
        const formControl = input.closest('div');
        if (formControl) {
            let textoError = formControl.querySelector('.texto-error');
            if (!textoError) {
                textoError = document.createElement('div');
                textoError.classList.add('texto-error');
                formControl.appendChild(textoError);
            }
            textoError.innerText = mensaje;
            formControl.classList.add('error');
            input.focus();
        }
    };

    // Función para eliminar errores
    const limpiarError = (input) => {
        const formControl = input.closest('div');
        if (formControl) {
            formControl.classList.remove('error');
            const textoError = formControl.querySelector('.texto-error');
            if (textoError) {
                textoError.innerText = '';
            }
        }
    };

    // Función que elimina errores al escribir
    formInicio.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                limpiarError(input);
            }
        });
    });
});