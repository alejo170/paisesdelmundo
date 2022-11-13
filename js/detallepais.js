const pais = document.getElementById('pais')
const query = new URLSearchParams(window.location.search)
const params = query.get('name');
let paises;

document.addEventListener("DOMContentLoaded", function(event) {
    fetchData()
});

//Funcion que llama al api y obtiene el json con los datos de los paises
const fetchData = async () => {
    
    try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const data = await res.json();
        console.log(data);        
        const filterData = data.filter(item => item.translations.spa.common === params)
        paises = data;
        mostrarPais(filterData);
        
    } catch (error) {
        console.log(error);
    }
    
}

//Funcion que convierte un objeto que no este vacio en un array
const mapProp = (propiedad) => {
    if (propiedad !== null && propiedad !== undefined) {
        if (typeof (propiedad) === 'object') {
            const asArray = Object.entries(propiedad);
            const filtered = asArray.filter(([key, value]) => {
                return value;
            });
            
            return filtered;
        } else {
            
            return [];
        }
    } else {
        return [];
    }
}

const renderFronteras = (object) => {

    if (object !== null && object !== undefined) {
    
        const countriesArray = Object.entries(paises);
        const filtrado = countriesArray.filter(([key, country]) => object.includes(country.cca3));
        const names = filtrado.map(([key, value]) => value?.translations?.spa?.common);
        
        const borders = names.map((name, key) => {
            return (
                `<a href="detallepais.html?name=${name}">
                    <button class="btn-fronteras">${name}</button>
                </a>`
            )
        });
        
        return borders;
    } 
    else {
        return 'No tiene'
    }
}

//Funcion que renderiza los idiomas de un pais
const renderIdiomas = (object) => {
    
    const idiomas = mapProp(object);
    const idiomasArray = idiomas.map(([key, value]) => value);
   
    let output = "";
    if(idiomasArray.length === 0) {
        output += "No hay datos";
    }
    for (let i = 0; i < idiomasArray.length; i++) {
        output+=idiomasArray[i];
        if (i < idiomasArray.length - 1){
            output+=", ";
        }
    }
    return output;
}

//Funcion que renderiza las monedas de un pais
const renderMonedas = (object) =>{
    
    const monedas = mapProp(object);
    const monedasArray = monedas.map(([key, value]) => value.name); 
    
    let output = "";
    if(monedasArray.length === 0) {
        output += "No hay datos";
    }
    for (let i = 0; i < monedasArray.length; i++) {
        output+=monedasArray[i];
        if (i < monedasArray.length - 1){
            output+=", ";
        }
    }
    return output;
}

//Funcion que renderiza el lado por el que transitan los carros de un pais
const renderTransito = (object) => {
    
    if(object == "left") {
        return "Izquierdo";
    }
    else if(object == "right"){
        return "Derecho";
    }
    else {
        return "No hay datos";
    }
}

//Funcion que renderiza el escudo de un pais
const renderEscudo = (object) => {
    
    if(object) {
        return object;
    }
    else{
        return "imagenes/sinEscudo.png";
    }
}

//Funcion que renderiza el codigo FIFA de un pais
const renderFifa = (object) => {
    
    if(object === undefined) {
        return "No definido";
    }
    else {
        return object;
    }
}

//Funcion que renderiza la region de un pais
const renderRegion = (object) => {
    
    if(object === undefined) {
        return "No definido";
    }
    else {
        return object;
    }
}

//Funcion que renderiza los codigo de marcacion de un pais
const renderMarcacion = (object) =>{

    let output = "";
    const codigoMarcacion = mapProp(object);
    if(codigoMarcacion.length === 0) {
        output += "No hay datos";
    }
    else {
        prefijoMarcacion = codigoMarcacion[0][1];
        sufijoMarcacion = codigoMarcacion[1][1][0];
        output += prefijoMarcacion + sufijoMarcacion;
    }
   
    return output;

}

//Funcion que renderiza el coeficiente gini de un pais
const renderGini = (object) =>{
    
    const coeficienteGini = mapProp(object);
    const keyGini = coeficienteGini.map(([key, value]) => key);
    const valueGini = coeficienteGini.map(([key, value]) => value);  
    
    let output = "";
    if(coeficienteGini.length === 0) {
        output += "No hay datos";
    }
    else {
        output += " (Año: " + keyGini + ") : " + valueGini;
    }
   
    return output;
}

//Funcion que muestra un pais
const mostrarPais = (data) => {
    dato =  data[0];
    let elementos = '';
    elementos += `
        <div class="container-double">
            
            <img src="${renderEscudo(dato.coatOfArms.svg)}" alt="Escudo ${dato.translations.spa.common}" >
             
            <div>
                <h1>${dato.translations.spa.common}</h1>
                <p><b>Nombre oficial: </b>${dato.name.official}</p>
                <p><b>Area (Km2): </b>${Number(dato.area).toLocaleString('en-US')}</p>
                <p><b>Subregion: </b>${renderRegion(dato.subregion)}</p>
                <p><b>Ver Mapa: </b><a href="${(dato.maps.googleMaps)}" class="btn-mapa" target="_blank">Aqui</a></p>
                <p><b>Moneda: </b>${renderMonedas(dato.currencies)}</p>
                <p><b>Idioma: </b>${renderIdiomas(dato.languages)}</p>
                <p><b>Inicio de semana: </b>${dato.startOfWeek}</p>
                <p><b>Independiente: </b>${(dato.independent) ? "Si": "No"}</p>
                <p><b>Salida al mar: </b>${dato.landlocked ? "No": "Si"}</p>
                <p><b>Dominio de internet: </b>${dato.tld}</p>
                <p><b>Gentilicio: </b>${dato.demonyms[Object.keys(dato.demonyms)[0]].f}</p>
                <p><b>Latitud: </b>${(dato.latlng[0])} <b>Longitud: </b>${(dato.latlng[1])}</p>
                <p><b>Miembro de la ONU: </b>${(dato.unMember)? "Si": "No"}</p>
                <p><b>Zona Horaria: </b>${(dato.timezones)}</p>
                <p><b>¿Por que lado se conduce?: </b>${renderTransito(dato.car.side)}</p>
                <p><b>Codigo FIFA: </b>${renderFifa(dato.fifa)}</p>
                <p><b>Codigo de Marcacion: </b>${renderMarcacion(dato.idd)}</p>
                <p><b>Coeficiente de Gini: </b>${renderGini(dato.gini)}</p>
                <p><b>Fronteras terrestres: </b>${renderFronteras(dato.borders)}</p>
            </div>
        </div>
        `
    pais.innerHTML = elementos;
}