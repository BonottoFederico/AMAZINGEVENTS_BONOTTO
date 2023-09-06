const fechaActual = new Date(data.currentDate);
let eventosFuturos = data.events.filter(evento => new Date (evento.date) >= fechaActual);
crearCards('contenedorCards', eventosFuturos);
crearCheck('contCheck', data.events)