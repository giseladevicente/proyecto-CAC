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

            const datos = {
                nombre: form.name.value,
                apellido: form.lastname.value, 
                correo: form.email.value,
                sexo: form.sexo.value,
                fecha: form.fecha.value,
                nacionalidad: form.nacionalidad.value,
                password: form.password.value,
                password2: form.reingresoPassword.value,
                terminos: form.condiciones.checked
            };

            localStorage.setItem('datosFormulario', JSON.stringify(datos));
            sessionStorage.setItem('datosFormulario', JSON.stringify(datos));
    
            const email = datos.correo;
            const password = datos.password;
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);

            console.log("Datos del formulario guardados en el almacenamiento local:", localStorage.getItem('datosFormulario'));
    
            console.log("formulario si es válido");

            const nuevaVentana = window.open('respuesta-registro.html', 'formularioRespuesta', 'width=600,height=400');

            setTimeout(() => {
                window.location.href = '/pages/inicio-sesion.html?registro=exitoso';
            }, 70); 
    
            history.pushState({}, '', 'respuesta-registro.html');
        }
    });
    

    // Función para validad campos válidos
    const validarFormulario = () => {
        let isValid = true;

        isValid = validarCampoVacio('name', 'El nombre es obligatorio') && isValid;        
        isValid = validarCampoVacio('lastname', 'El apellido es obligatorio') && isValid;
        isValid = validarCampoEmail('email', 'El correo electrónico no es válido') && isValid;
        isValid = validarSexo('sexo', 'Debe seleccionar su sexo') && isValid;
        isValid = validarCampoVacio('fecha', 'La fecha de nacimiento es obligatoria') && isValid;
        isValid = validarCampoVacio('nacionalidad', 'El país es obligatorio') && isValid;
        isValid = validarCampoVacio('password', 'La contraseña es obligatoria') && isValid;
        isValid = validarContrasenia('password', 'La contraseña no cumple con los requisitos') && isValid;
        isValid = validarCampoVacio('reingresoPassword', 'El reingreso de la contraseña es obligatorio') && isValid;
        isValid = validarReingresoContrasenia('password', 'reingresoPassword', 'Las contraseñas no coinciden') && isValid;

        const terminos = document.getElementById('condiciones').checked;
        if (!terminos) {
            isValid = false;
            errorCampo(document.getElementById('condiciones'), 'Debes aceptar los términos y condiciones');
        } else {
            validacionCorrecta(document.getElementById('condiciones'));
        }

        return isValid;
    };


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


    // Mensaje de Error
    const errorCampo = (input, mensaje) => {
        if (input) {
            const formControl = input.closest('.label'); 
            if (formControl) {
                const textoError = formControl.querySelector('.texto-error');
                formControl.classList.add('error');
                textoError.innerText = mensaje;
                input.focus(); //  dirige automáticamente la atención del usuario al campo que tiene el error.
            }
        }
    };

 
    // Función Validación correcta
    const validacionCorrecta = (input) => {
        const formControl = input.closest('.label');
        formControl.classList.remove('error');
        const textoError = formControl.querySelector('.texto-error');
        textoError.innerText = '';
    };


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
                validacionCorrecta(select);
            }
        });
    });


    // Función validación campo sexo
    const validarSexo = (nameElemento, mensajeError) => {
        const radios = document.querySelectorAll(`input[name="${nameElemento}"]`);
        let isChecked = false;
        radios.forEach(radio => {
            if (radio.checked) {
                isChecked = true;
            }
        });
        const formControl = radios[0].closest('.label');
        const errorText = formControl.querySelector('.texto-error');
        if (!isChecked) {
            formControl.classList.add('error');
            errorText.innerText = mensajeError;
            return false;
        } else {
            formControl.classList.remove('error');
            errorText.innerText = '';
            return true;
        }
    };


    // Función validación Password
    const validarContrasenia = (idElemento, mensajeError) => {
        const field = document.getElementById(idElemento);
        const password = field.value.trim();
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
        if (password === '') {
            errorCampo(field, 'La contraseña es obligatoria');
            return false;
        } else if (!re.test(password)) {
            errorCampo(field, mensajeError + '. Debe contener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula y un número.');
            return false;
        } else {
            validacionCorrecta(field);
            return true;
        }
    };


    // Función validación de Reingreso de Password
    const validarReingresoContrasenia = (idContrasenia, idReingresoContrasenia, mensajeError) => {
        const contrasenia = document.getElementById(idContrasenia).value.trim();
        const reingresoContrasenia = document.getElementById(idReingresoContrasenia).value.trim();

        if (reingresoContrasenia === '') {
            errorCampo(document.getElementById(idReingresoContrasenia), 'El reingreso de la contraseña es obligatorio');
            return false;
        } else if (contrasenia !== reingresoContrasenia) {
            errorCampo(document.getElementById(idReingresoContrasenia), mensajeError);
            return false;
        } else {
            validacionCorrecta(document.getElementById(idReingresoContrasenia));
            return true;
        }
    };
  
});