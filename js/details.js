bringData(inicio);
function inicio(data) {
    const querySearch = location.search;
    console.log(querySearch);
    const id = new URLSearchParams(querySearch).get("id");
    const evento = data.events.find(evento => evento._id == id)
    crearDetails(evento, "contenedorCards")
}
