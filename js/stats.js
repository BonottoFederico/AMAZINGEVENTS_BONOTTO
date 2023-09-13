bringData(inicio)
function inicio(data) {
    let eventosPasados = filtrarEventosPasados(data);
    let eventosFuturos = filtrarEventosFuturos(data);
    let topasist = extraerHighAssist(eventosPasados);
    let topcap = extraerLargeCapac(data);
    generarTabla1 ('tabla1', topasist, topcap);
    let grupoFuturo = agruparCategorias(eventosFuturos);
    let grupoPasado = agruparCategorias(eventosPasados)
    generarTabla2(grupoFuturo, 'tabla2')
    generarTabla2(grupoPasado, 'tabla3')
    }
