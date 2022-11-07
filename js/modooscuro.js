const boton = document.querySelector('#boton');
let temaActual = localStorage.getItem('tema');

if (temaActual == "dark") {
    document.body.classList.add("dark-theme");
}

boton.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    let theme = "light";
    if (document.body.classList.contains("dark-theme")) {
        theme = "dark";
    }   
    localStorage.setItem("tema", theme);
})
