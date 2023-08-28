let contenedordecards = document.getElementById("contenedorCards");
let card = [];
for (let evento of data.events) {
    const fechaEvento = new Date(evento.date);
    const fechaActual = new Date(data.currentDate);
    if (fechaEvento < fechaActual) {
    let card = `<div class="col">
    <div class="card">
        <img src="${evento.image}" class="card-img-top" alt="${evento.name}">
        <div class="card-body">
            <h5 class="card-title">${evento.name}</h5>
            <p class="card-text">${evento.description}.</p>
            <div class="d-flex justify-content-between align-content-center flex-wrap">
                <p class="m-0">$${evento.price}</p>
                <a href="#" class="btn btn-primary text">Details</a>
            </div>
        </div>
    </div>
</div>`;
    contenedordecards.innerHTML += card;
    }
}
