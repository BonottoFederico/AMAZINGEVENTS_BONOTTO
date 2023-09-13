bringData(inicio)
function inicio(data) {
    let eventosFuturos = filtrarEventosFuturos(data);
    crearCards('contenedorCards', eventosFuturos);
    crearCheck('contCheck', data.events);
    contenedorBarra.addEventListener("input", function () {
        filtrado(eventosFuturos);
    });
    contenedorCheck.addEventListener("change", function () {
        filtrado(eventosFuturos);
    });
}
