function crearCards(contenedor, eventos) {
    const contenedorElementCard = document.getElementById(contenedor);
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

function crearCheck(contenedor, eventos) {
    const contenedorElementCheck = document.getElementById(contenedor);
    const categoriasUnicas = [];

    const checks = eventos.map(evento => {
        if (!categoriasUnicas.includes(evento.category)) {
            categoriasUnicas.push(evento.category);
            return `
            <label class="p-3 bg-body-secondary text-black rounded-3 my-1">
                ${evento.category}
                <input type="checkbox" name="checks">
            </label>
            `;
        } else {
            return '';
        }
    });
    contenedorElementCheck.innerHTML = checks.join('');
}

function crearDetails (evento, contenedor) {
    const contenedorDetails = document.getElementById(contenedor);
    let asistoestim = ""
    if (evento.assistance) {
        asistoestim = 'Assitance: '+evento.assistance
    }
    else if (evento.estimate){
        asistoestim = 'Estimate: ' +evento.estimate
    }
    contenedorDetails.innerHTML =`
    <div class="card text-center text-bg-light border-dark">
    <img src="${evento.image}" class="card-img-top" alt="${evento.name}>
    <div class="card-body">
        <h5 class="card-title card-header mb-2">${evento.name}</h5>
        <h6 class="card-subtitle mb-2">${evento.description}.</h6>
        <p class="card-text">Category: ${evento.category}.</p>
        <p class="card-text">Place: ${evento.place}.</p>
        <p class="card-text">Capacity: ${evento.capacity} people.</p>
        <p class="card-text">${asistoestim} people.</p>
        <p class="card-text">Price: $${evento.price}.</p>
    </div>
</div>
    `
}

