const fechaActual = new Date(data.currentDate);
let eventosPasados = data.events.filter(evento => new Date (evento.date) < fechaActual);
crearCards('contenedorCards', eventosPasados);
crearCheck('contCheck', data.events)

