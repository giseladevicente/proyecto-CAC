const formulario = document.querySelector('#formulario-registro');

let validarDatos = (event) => {
    event.preventDefault();
}

let nombre = document.querySelector('#name');

let valido = true;

if (nombre.value === "" ) {
    let errorNombre = document.querySelector("#errorName");
    errorNombre.textContent = "El campo Nombre es obligatorio";
    nombre.classList.add("error");
    valido = false;
}

if (valido) {
    formulario.submit();
} 

formulario.addEventListener('submit', validarDatos);