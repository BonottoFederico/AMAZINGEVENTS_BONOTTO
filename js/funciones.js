/* Variables globales */
const contenedorBarra = document.getElementById('barraBusqueda')
const contenedorCheck = document.getElementById('contCheck')
let data = null
/* data */
function bringData(callback) {
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response => response.json())
        .then(dataapi => {
            data = dataapi;
            callback(data);
        })
}
/* funciones */
function crearCards(contenedor, eventos) {
    const contenedorElementCard = document.getElementById(contenedor);

    if (eventos.length === 0) {
        contenedorElementCard.innerHTML = '<h2>No se encontraron resultados</h2>';
    } else {
        const cards = eventos.map(evento => {
            return `
            <div class="col">
                <div class="card border-secondary">
                    <img src="${evento.image}" class="card-img-top" alt="${evento.name}">
                    <div class="card-body">
                        <h5 class="card-title">${evento.name}</h5>
                        <p class="card-text">${evento.description}.</p>
                        <div class="d-flex justify-content-between align-content-center flex-wrap">
                            <p class="m-0">$${evento.price}</p>
                            <a href="./details.html?id=${evento._id}" class="btn btn-primary text">Details</a>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });
        contenedorElementCard.innerHTML = cards.join('');
    }
}

function crearCheck(contenedor, eventos) {
    const contenedorElementCheck = document.getElementById(contenedor);
    const categoriasUnicas = [];

    const checks = eventos.map(evento => {
        if (!categoriasUnicas.includes(evento.category)) {
            categoriasUnicas.push(evento.category);
            return `
            <label class="p-3 bg-body-secondary text-black rounded-3 my-1">
                ${evento.category}
                <input type="checkbox" name="checks" value="${evento.category}" class="check" id="${evento.category}">
            </label>
            `;
        } else {
            return '';
        }
    });
    contenedorElementCheck.innerHTML = checks.join('');
}

function crearDetails(evento, contenedor) {
    const contenedorDetails = document.getElementById(contenedor);
    const { assistance, estimate, image, name, description, category, place, capacity, price } = evento;
    const asistoestim = assistance ? `Assistance: ${assistance}` : estimate ? `Estimate: ${estimate}` : '';
    contenedorDetails.innerHTML = `
    <div class="card text-center text-bg-light border-dark">
    <img src="${image}" class="card-img-top" alt="${name}>
    <div class="card-body">
        <h5 class="card-title card-header mb-2">${name}</h5>
        <h6 class="card-subtitle mb-2">${description}.</h6>
        <p class="card-text">Category: ${category}.</p>
        <p class="card-text">Place: ${place}.</p>
        <p class="card-text">Capacity: ${capacity} people.</p>
        <p class="card-text">${asistoestim} people.</p>
        <p class="card-text">Price: $${price}.</p>
    </div>
</div>
    `
}

function filtroTexto(arreglo, texto) {
    return arreglo.filter(elemento => elemento.name.toLowerCase().includes(texto.trim().toLowerCase()))
}

function filtroCheck(arreglo) {
    let checks = Array.from(document.getElementsByClassName("check"))
    let activeChecks = checks.filter(check => check.checked)
    if (activeChecks.length == 0) {
        return arreglo
    }
    let values = activeChecks.map(act => act.value)
    let checksfiltrados = arreglo.filter(elemento => values.every(value => elemento.category === value));
    return checksfiltrados
}

function filtrado(array) {
    let filtrado1 = filtroTexto(array, contenedorBarra.value)
    let filtrado2 = filtroCheck(filtrado1)
    crearCards('contenedorCards', filtrado2)
}
function filtrarEventosPasados(data) {
    const fechaActual = new Date(data.currentDate);
    let eventosPasados = data.events.filter(evento => new Date(evento.date) < fechaActual)
    return eventosPasados
}
function filtrarEventosFuturos(data) {
    const fechaActual = new Date(data.currentDate);
    let eventosFuturos = data.events.filter(evento => new Date(evento.date) >= fechaActual);
    return eventosFuturos
}
function extraerHighAssist(data) {
    let topasist = data.sort((objeto, objeto2) => {
        if (objeto.assistance > objeto2.assistance) {
            return -1
        } else if (objeto.assistance < objeto2.assistance) {
            return 1
        } else {
            return 0
        }
    })
    return topasist;
}
function extraerLargeCapac(data) {
    let topcap = data.events.sort((objeto, objeto2) => {
        if (objeto.capacity > objeto2.capacity) {
            return -1
        } else if (objeto.capacity < objeto2.capacity) {
            return 1
        } else {
            return 0
        }
    })
    return topcap
}
function agruparCategorias(data) {
    const eventGroups = [];
    const categories = {};
    data.forEach((event) => {
        const category = event.category;
        if (!categories[category]) {
            categories[category] = true;
            eventGroups.push({ category, events: [] });
        }
        eventGroups.find((group) => group.category === category).events.push(event);
    });
    return eventGroups;
}

function generarTabla1(contenedor, topasist, topcap) {
    let container = document.getElementById(contenedor)
    container.innerHTML = `
    <tr>
    <td>${topasist[0].name}</td>
    <td>${topasist[topasist.length - 1].name}</td>
    <td>${topcap[0].name}</td>
    </tr>
    <tr>
    <td>${topasist[1].name}</td>
    <td>${topasist[topasist.length - 2].name}</td>
    <td>${topcap[1].name}</td>
    </tr>
    <tr>
    <td>${topasist[2].name}</td>
    <td>${topasist[topasist.length - 3].name}</td>
    <td>${topcap[2].name}</td>
    </tr>
`
}

function generarTabla2(data, contenedor) {
    let container = document.getElementById(contenedor);
    let tbodyHTML = '';
    data.forEach(categorie => {
        let sumaTotal = sumarRevenue(categorie.events)
        tbodyHTML += `
        <tr>
        <td>${categorie.category}</td>
        <td>${sumaTotal}</td>
        <td>*</td>
        </tr>
        `
    })
    container.innerHTML = tbodyHTML
}

function sumarRevenue(arrayEventos) {
    let suma = 0;
    arrayEventos.forEach(evento => {
        if (evento.assistance) {
            suma += evento.assistance * evento.price
        } else{
        suma += evento.estimate * evento.price
        }
    })
    return suma;
}