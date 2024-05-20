document.addEventListener('DOMContentLoaded', () => {
 
    const form = document.querySelector('#formulario-registro');
    const formErrors = document.getElementById('form-errors');

    form.addEventListener('submit', (event) => {
        console.log('Submit del formulario capturado'); 
        formErrors.innerText = ''; // Limpia los mensajes previos
        if (!validarFormulario()) {
            console.log('El formulario no es válido');
            formErrors.innerText = 'El formulario no es válido. Por favor, corrige los errores.';
            event.preventDefault(); 
        } else {
            console.log('El formulario es válido');
            formErrors.innerText = 'El formulario es válido. Enviando datos...';
            console.log("formulario si es válido")
        }
    });

 //--------------------OK-----------------------
    // Función para validad campos válidos
    const validarFormulario = () => {
        let isValid = true;

        isValid = validarCampoVacio('name', 'El nombre es obligatorio') && isValid;        
        isValid = validarCampoVacio('lastname', 'El apellido es obligatorio') && isValid;
        isValid = validarCampoEmail('email', 'El correo electrónico no es válido') && isValid;
        isValid = validarCampoVacio('fecha', 'La fecha de nacimiento es obligatoria') && isValid;
        isValid = validarCampoVacio('nacionalidad', 'El país es obligatorio') && isValid;
        isValid = validarCampoVacio('password', 'La contraseña es obligatoria') && isValid;
        isValid = validarCampoVacio('reingresoPassword', 'El reingreso de la contraseña es obligatorio') && isValid;

        const sexoValido = validarSexo('sexo', 'Debe seleccionar su sexo');
        if (!sexoValido) {
            isValid = false;
        }

        const terminos = document.getElementById('condiciones').checked;
        if (!terminos) {
            isValid = false;
            errorCampo(document.getElementById('condiciones'), 'Debes aceptar los términos y condiciones');
        } else {
            validacionCorrecta(document.getElementById('condiciones'));
        }

        return isValid;
    };

 //--------------------OK-----------------------
    // Función para Comprobar campos vacíos
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


 //--------------------OK-----------------------
    // Mensaje de Error
    const errorCampo = (input, mensaje) => {
        if (input) {
            const formControl = input.closest('div'); // Hace referencia al contenedor div del input.
            if (formControl) {
                const textoError = formControl.querySelector('.texto-error');
                formControl.classList.add('error');
                textoError.innerText = mensaje;
                input.focus(); //  dirige automáticamente la atención del usuario al campo que tiene el error.
            }
        }
    };

 //--------------------OK-----------------------
    // Función de eliminación del mensaje de error al validar correctamente
    const validacionCorrecta = (input) => {
        const formControl = input.closest('div');
        formControl.classList.remove('error');
        const textoError = formControl.querySelector('.texto-error');
        textoError.innerText = '';
    };

 //--------------------OK-----------------------
    // Función Validación de Email
    const validarCampoEmail = (idElemento, mensajeError) => {
        const field = document.getElementById(idElemento);
        const email = field.value.trim();
        if (email === '') {
            errorCampo(field, 'El correo electrónico es obligatorio');
            return false;
        } else if (!isEmail(email)) {
            errorCampo(field, mensajeError);
            return false;
        } else {
            validacionCorrecta(field);
            return true;
        }
    };

    const isEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Función que elimina el error al escribir en el campo del input
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            const value = input.value.trim();
            if (value !== '') {
                validacionCorrecta(input);
            }
        });
    });

    // Función Validación campo Nacionalidad
    form.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', () => {
            const value = select.value;
            if (value !== '') {
                setSuccessFor(select);
            }
        });
    });


    // Función validación campo sexo
    const validarSexo = (idElemento, mensajeError) => {
        const radios = document.querySelectorAll(`#${idElemento} input[type="radio"]`);
        let isChecked = false;
        radios.forEach(radio => {
            if (radio.checked) {
                isChecked = true;
            }
        });
        if (!isChecked) {
            errorCampo(document.getElementById(idElemento), mensajeError);
            return false;
        } else {
            validacionCorrecta(document.getElementById(idElemento));
            return true;
        }
    };
});