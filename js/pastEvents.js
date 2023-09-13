bringData(inicio)
function inicio(data) {
    let eventosPasados = filtrarEventosPasados(data);
    crearCards('contenedorCards', eventosPasados);
    crearCheck('contCheck', data.events);
    contenedorBarra.addEventListener("input", function () {
        filtrado(eventosPasados);
    });
    contenedorCheck.addEventListener("change", function () {
        filtrado(eventosPasados);
    });
}


