const busqueda = document.querySelector('#busqueda');
const inputTexto = document.querySelector('#inputTexto');

//Funcion que realiza la busqueda de paises
const busquedaPaises = (data) => {
    
    busqueda.addEventListener('keyup', async(e) => {
        e.preventDefault()

        const textoCliente = inputTexto.value.toLowerCase()
        
        const formularioFiltrado = data.filter(item => {
            const textoApi = item.translations.spa.common.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            if (textoApi.indexOf(textoCliente) !== -1) {
                return item
            }
        })
        mostrarPaises(formularioFiltrado)
        
    
    })
}