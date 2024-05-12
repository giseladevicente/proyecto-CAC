let btnmenu = document.getElementById("boton_menu");
let menu = document.getElementById("menu_items");

btnmenu.addEventListener("click", function() {
    "use strict";
    // console.log('Botón de menú clickeado');
    menu.classList.toggle('mostrar');
});