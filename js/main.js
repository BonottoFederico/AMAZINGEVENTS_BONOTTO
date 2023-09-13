bringData(inicio);
function inicio(data) {
    crearCards('contenedorCards', data.events);
    crearCheck('contCheck', data.events);
    contenedorBarra.addEventListener("input", function () {
        filtrado(data.events);
    });
    contenedorCheck.addEventListener("change", function () {
        filtrado(data.events);
    });
}
