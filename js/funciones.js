function crearCards(contenedor, eventos) {
    const contenedorElementCard = document.getElementById(contenedor);
    const cards = eventos.map(evento => {
        return `
        <div class="col">
            <div class="card">
                <img src="${evento.image}" class="card-img-top" alt="${evento.name}">
                <div class="card-body">
                    <h5 class="card-title">${evento.name}</h5>
                    <p class="card-text">${evento.description}.</p>
                    <div class="d-flex justify-content-between align-content-center flex-wrap">
                        <p class="m-0">$${evento.price}</p>
                        <a href="./details.html" class="btn btn-primary text">Details</a>
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
            <label class="p-3 bg-body-secondary text-black rounded-3">
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


