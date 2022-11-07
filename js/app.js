const paises = document.querySelector('#paises');

document.addEventListener("DOMContentLoaded", function(event) {
    fetchData()
});

//Funcion que llama al api y obtiene el json con los datos de los paises
const fetchData = async () => {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const data = await res.json();
        
        mostrarPaises(data);
        busquedaPaises(data); 
        filtrarDatos(data);

    } catch (error) {
        console.log(error)
    }
}
//Funcion que muestra los paises
const mostrarPaises = (data) => {

    let elementos = ''

    for (let [index, item] of data.entries()){
            
            elementos += `
            <div class="card">
            <img src="${item.flags.png}" alt="Bandera ${item.translations.spa.common}" class="img-fluid">
                <div class="card-content">
                    <h3>${item.translations.spa.common}</h3>
                    <p>
                        <b>Poblacion: </b>
                        ${Number(item.population).toLocaleString('en-US')}
                    </p>
                    <p>
                        <b>Continente: </b>
                        ${item.region}
                    </p>
                    <p>
                        <b>Capital: </b>
                        ${item.capital}
                    </p>
                    <p>
                    <a href="detallepais.html?name=${item.translations.spa.common}" class="card_enlace">Ver mas</a>
                </p>
                </div>
            </div>
            `
          
    }       

    paises.innerHTML = elementos;

}