const longitudes = [3, 3, 4, 4, 5, 5, 5];
const nombres = ["Izquierda", "Derecha", "Adelante", "Giro"];
const botones = [];
const luces = [];

const accion = document.getElementById("accion");
const reiniciar = document.getElementById("reiniciar");
const estado = document.getElementById("estado");
const etapa = document.getElementById("etapa");
const pasoActual = document.getElementById("paso-actual");
const ronda = document.getElementById("ronda");
const contador = document.getElementById("contador");
const progreso = document.getElementById("progreso");
const lectura = document.getElementById("lectura");
const procesion = document.getElementById("procesion");
const atras = document.getElementById("atras");
const delante = document.getElementById("delante");
const premio = document.getElementById("premio");
const resumen = document.getElementById("resumen-premio");
const confeti = document.getElementById("confeti");

const movimientoReducido = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

let vueltas = 0;
let posicion = 0;
let secuencia = [];
let fase = "inicio";
let pendientes = [];
let animacion = 0;
let partida = 0;

for (let i = 0; i < 4; i++) {
  botones.push(document.getElementById("paso-" + i));
  luces.push(0);

  botones[i].addEventListener("click", function () {
    elegir(i);
  });
}

function programar(funcion, tiempo) {
  const id = setTimeout(funcion, tiempo);
  pendientes.push(id);
  return id;
}

function limpiarPendientes() {
  for (let i = 0; i < pendientes.length; i++) {
    clearTimeout(pendientes[i]);
  }

  pendientes = [];
  cancelAnimationFrame(animacion);
  animacion = 0;

  for (let i = 0; i < botones.length; i++) {
    botones[i].classList.remove("encendido", "fallo");
  }
}

function bloquearPasos(bloquear) {
  for (let i = 0; i < botones.length; i++) {
    botones[i].disabled = bloquear;
  }
}

function iluminar(numero, tiempo) {
  clearTimeout(luces[numero]);
  botones[numero].classList.add("encendido");

  luces[numero] = programar(function () {
    botones[numero].classList.remove("encendido");
  }, tiempo);
}

function actualizarProgreso() {
  progreso.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    const tramo = document.createElement("li");
    let descripcion = "pendiente";

    if (i < vueltas) {
      tramo.className = "hecha";
      descripcion = "completa";
    } else if (i === vueltas) {
      tramo.className = "actual";
      descripcion = "actual";
    }

    tramo.setAttribute(
      "aria-label",
      "Vuelta " + (i + 1) + ": " + descripcion
    );

    progreso.appendChild(tramo);
  }

  if (vueltas === 7) {
    ronda.textContent = "¡Siete vueltas completas!";
  } else {
    ronda.textContent = "Vuelta " + (vueltas + 1) + " de 7";
  }

  contador.textContent = vueltas + " vueltas completas";

  if (vueltas === 1) {
    contador.textContent = "1 vuelta completa";
  }
}

function mostrarSecuencia() {
  limpiarPendientes();
  posicion = 0;
  fase = "mirar";
  bloquearPasos(true);

  accion.disabled = true;
  accion.textContent = "Mirá la secuencia…";
  estado.className = "estado";
  estado.textContent = "Primero mirá. Después te toca repetir los pasos.";
  etapa.textContent = "MIRÁ";
  pasoActual.textContent = "Preparados…";

  let descripcion = "Secuencia: ";

  for (let i = 0; i < secuencia.length; i++) {
    if (i > 0) descripcion += ", ";
    descripcion += nombres[secuencia[i]];

    programar(function () {
      iluminar(secuencia[i], 520);
      pasoActual.textContent = nombres[secuencia[i]];
    }, 450 + i * 800);
  }

  lectura.textContent = descripcion;

  programar(function () {
    fase = "jugar";
    bloquearPasos(false);

    etapa.textContent = "TU TURNO";
    pasoActual.textContent = "0 de " + secuencia.length;
    estado.textContent =
      "Repetí los " + secuencia.length + " pasos en el mismo orden.";

    accion.disabled = false;
    accion.textContent = "Volver a ver la secuencia";
    botones[0].focus();
  }, 450 + secuencia.length * 800);
}

accion.addEventListener("click", function () {
  if (fase === "ganado") {
    premio.showModal();
    return;
  }

  if (fase === "mirar" || fase === "animacion") return;

  reiniciar.disabled = false;

  if (fase === "inicio" || fase === "espera") {
    secuencia = [];

    for (let i = 0; i < longitudes[vueltas]; i++) {
      secuencia.push(Math.floor(Math.random() * 4));
    }
  }

  mostrarSecuencia();
});

function elegir(numero) {
  if (fase !== "jugar") return;

  iluminar(numero, 220);

  if (numero !== secuencia[posicion]) {
    fase = "error";
    bloquearPasos(true);
    botones[numero].classList.add("fallo");

    estado.className = "estado error";
    estado.textContent =
      "Ese paso era «" + nombres[secuencia[posicion]] +
      "». Probá la misma secuencia otra vez.";

    etapa.textContent = "OTRA VEZ";
    pasoActual.textContent = "Conservás tus vueltas";
    accion.textContent = "Repetir secuencia";
    accion.focus();
    return;
  }

  posicion++;
  pasoActual.textContent = posicion + " de " + secuencia.length;

  if (posicion === secuencia.length) {
    animarVuelta();
  }
}

function moverProcesion(angulo) {
  const x = 300 + Math.cos(angulo) * 190;
  const y = 218 + Math.sin(angulo) * 60;

  let capa = delante;

  if (y < 218) {
    capa = atras;
  }

  if (procesion.parentNode !== capa) {
    capa.appendChild(procesion);
  }

  procesion.setAttribute(
    "transform",
    "translate(" + x + " " + y + ")"
  );
}

function animarVuelta() {
  fase = "animacion";
  bloquearPasos(true);

  accion.disabled = true;
  accion.textContent = "¡Bien!";
  etapa.textContent = "ACIERTO";
  pasoActual.textContent = "¡Una vuelta más!";
  estado.textContent = "¡Secuencia completa!";

  if (movimientoReducido.matches) {
    programar(terminarVuelta, 250);
    return;
  }

  let inicio = null;
  const partidaActual = partida;

  function cuadro(tiempo) {
    if (partidaActual !== partida) return;
    if (inicio === null) inicio = tiempo;

    let avance = (tiempo - inicio) / 1800;
    if (avance > 1) avance = 1;

    moverProcesion(avance * Math.PI * 2);

    if (avance < 1) {
      animacion = requestAnimationFrame(cuadro);
    } else {
      animacion = 0;
      terminarVuelta();
    }
  }

  animacion = requestAnimationFrame(cuadro);
}

function terminarVuelta() {
  moverProcesion(0);
  vueltas++;
  actualizarProgreso();
  accion.disabled = false;

  if (vueltas === 7) {
    fase = "ganado";
    etapa.textContent = "COMPLETADO";
    pasoActual.textContent = "¡Siete vueltas!";
    estado.textContent = "Ya tenés el número para el candado.";
    accion.textContent = "Ver mi premio";

    resumen.hidden = false;
    premio.showModal();
    lanzarConfeti();
    return;
  }

  fase = "espera";
  etapa.textContent = "VUELTA COMPLETA";
  pasoActual.textContent = "¡Vamos con la siguiente!";
  estado.textContent = "Completaste la vuelta " + vueltas + ".";
  accion.textContent = "Siguiente vuelta";
  accion.focus();
}

function empezarDeNuevo() {
  partida++;
  limpiarPendientes();

  vueltas = 0;
  posicion = 0;
  secuencia = [];
  fase = "inicio";

  bloquearPasos(true);
  moverProcesion(0);
  actualizarProgreso();

  accion.disabled = false;
  accion.textContent = "Empezar";
  reiniciar.disabled = true;
  estado.className = "estado";
  estado.textContent = "Tocá «Empezar» para ver los pasos.";
  etapa.textContent = "PREPARADOS";
  pasoActual.textContent = "¿Empezamos?";
  lectura.textContent = "";
  resumen.hidden = true;
  confeti.innerHTML = "";

  if (premio.open) {
    premio.close();
  }

  accion.focus();
}

reiniciar.addEventListener("click", empezarDeNuevo);

document.getElementById("cerrar-premio").addEventListener(
  "click",
  function () {
    premio.close();
  }
);

premio.addEventListener("close", function () {
  accion.focus();
});

document.addEventListener("keydown", function (evento) {
  if (fase !== "jugar" || premio.open || evento.repeat) return;

  let numero = -1;

  if (evento.key === "1" || evento.key === "ArrowLeft") numero = 0;
  if (evento.key === "2" || evento.key === "ArrowRight") numero = 1;
  if (evento.key === "3" || evento.key === "ArrowUp") numero = 2;
  if (evento.key === "4" || evento.key === "ArrowDown") numero = 3;

  if (numero === -1) return;

  evento.preventDefault();
  elegir(numero);
});

document.addEventListener("visibilitychange", function () {
  if (!document.hidden || fase !== "mirar") return;

  limpiarPendientes();
  fase = "error";

  etapa.textContent = "PAUSA";
  pasoActual.textContent = "Secuencia pausada";
  estado.textContent = "Volvé a ver la secuencia cuando estés listo.";
  accion.disabled = false;
  accion.textContent = "Volver a ver la secuencia";
});

function lanzarConfeti() {
  if (movimientoReducido.matches) return;

  const colores = [
    "#b48b43",
    "#426b87",
    "#72938c",
    "#d9c1e7",
    "#fff3d1"
  ];

  confeti.innerHTML = "";

  for (let i = 0; i < 45; i++) {
    const papel = document.createElement("i");

    papel.className = "papelito";
    papel.style.left = Math.random() * 100 + "%";
    papel.style.background = colores[i % colores.length];
    papel.style.animationDelay = Math.random() * 1.1 + "s";

    confeti.appendChild(papel);
  }

  programar(function () {
    confeti.innerHTML = "";
  }, 5000);
}

actualizarProgreso();
moverProcesion(0);