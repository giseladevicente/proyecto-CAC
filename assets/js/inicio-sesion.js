document.addEventListener('DOMContentLoaded', () => {

    const formInicio = document.querySelector('#formInicio');
    const formErrors = document.getElementById('form-errors');
    
    formInicio.addEventListener('submit', (event) => {
        console.log('Submit del formulario de inicio de sesión capturado');
        formErrors.innerText = '';
        if (!validarFormularioInicio()) {
            console.log('El formulario de inicio de sesión no es válido');
            formErrors.innerText = 'El formulario de inicio de sesión no es válido. Por favor, corrige los errores.';
            event.preventDefault(); 
        } else {
            console.log('El formulario de inicio de sesión es válido');
            formErrors.innerText = 'El formulario de inicio de sesión es válido. Enviando datos...';
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
            validacionCorrecta(field);
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
            errorCampo(document.getElementById(idPassword), mensajeError);
            return false;
        } else {
            validacionCorrecta(document.getElementById(idPassword));
            return true;
        }
    };
    

    // Mensaje de error
    const errorCampo = (input, mensaje) => {
        if (input) {
            const formControl = input.closest('div'); 
            if (formControl) {
                const textoError = formControl.querySelector('.texto-error');
                if (!textoError) {
                    const nuevoTextoError = document.createElement('div');
                    nuevoTextoError.classList.add('texto-error');
                    nuevoTextoError.innerText = mensaje;
                    formControl.appendChild(nuevoTextoError);
                } else {
                    textoError.innerText = mensaje;
                }
                formControl.classList.add('error');
                input.focus(); 
            }
        }
    };


    // Función para validación correcta
    const validacionCorrecta = (input) => {
        const formControl = input.closest('div'); 
        if (formControl) {
            formControl.classList.remove('error');
            const textoError = formControl.querySelector('.texto-error');
            if (textoError) {
                textoError.innerText = '';
            }
        }
    };


    // Función que elimina el error al escribir en el campo del input
    formInicio.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            const value = input.value.trim();
            if (value !== '') {
                validacionCorrecta(input);
            }
        });
    });

});