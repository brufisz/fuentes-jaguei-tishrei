let archivos = [
  "https://pjlibrary.org/getmedia/96e34a5d-6a9f-4674-a088-c254d43cd9b0/HH1",
  "https://pjlibrary.org/getmedia/0228cf63-b5db-4aed-8a13-48961634ce74/HH2",
  "https://pjlibrary.org/getmedia/b1834cb6-8bea-4097-a5a3-e1971faa5a56/HH3",
  "https://pjlibrary.org/getmedia/ae41ef1b-2980-4470-926a-6549d958c2c1/HH4"
];

let ordenSonidos = [0, 1, 2, 3];
let tarjetaSeleccionada = "";

let audioActual = new Audio();
let sonidoActual = -1;

let tarjetas = document.getElementById("tarjetas");
let mensaje = document.getElementById("mensaje");

function mezclar(lista) {
  for (let i = lista.length - 1; i > 0; i--) {
    let posicion = Math.floor(Math.random() * (i + 1));
    let auxiliar = lista[i];

    lista[i] = lista[posicion];
    lista[posicion] = auxiliar;
  }
}

function actualizarBoton(posicion, reproduciendo, cargando) {
  let boton = document.getElementById("sonido" + posicion);
  let icono = boton.getElementsByClassName("icono-sonido")[0];
  let texto = boton.getElementsByClassName("texto-sonido")[0];

  boton.classList.remove("reproduciendo", "cargando");
  boton.setAttribute("aria-pressed", "false");
  boton.setAttribute("aria-busy", "false");
  boton.setAttribute("aria-label", "Escuchar sonido " + (posicion + 1));

  icono.textContent = "▶";
  texto.textContent = "Escuchar";

  if (reproduciendo) {
    boton.classList.add("reproduciendo");
    boton.setAttribute("aria-pressed", "true");
    boton.setAttribute("aria-label", "Pausar sonido " + (posicion + 1));

    icono.textContent = "⏸";
    texto.textContent = "Pausar";
  }

  if (cargando) {
    boton.classList.add("cargando");
    boton.setAttribute("aria-busy", "true");
    boton.setAttribute("aria-label", "Cancelar sonido " + (posicion + 1));

    icono.textContent = "·";
    texto.textContent = "Cargando…";
  }
}

function detenerAudio() {
  sonidoActual = -1;

  audioActual.pause();
  audioActual.currentTime = 0;

  for (let i = 0; i < 4; i++) {
    actualizarBoton(i, false, false);
  }
}

function reproducir(posicion) {
  let boton = document.getElementById("sonido" + posicion);

  if (sonidoActual === posicion) {
    if (
      !audioActual.paused ||
      boton.classList.contains("cargando")
    ) {
      audioActual.pause();
      actualizarBoton(posicion, false, false);
      return;
    }
  }

  if (sonidoActual !== posicion) {
    detenerAudio();

    audioActual.src = archivos[ordenSonidos[posicion]];
    sonidoActual = posicion;
  }

  if (audioActual.ended) {
    audioActual.currentTime = 0;
  }

  mensaje.textContent = "";
  mensaje.classList.remove("exito");

  actualizarBoton(posicion, false, true);

  audioActual.play().catch(function (error) {
    if (
      error.name !== "AbortError" &&
      sonidoActual === posicion
    ) {
      actualizarBoton(posicion, false, false);

      mensaje.textContent =
        "No se pudo reproducir el audio. Revisá tu conexión a internet.";
    }
  });
}

audioActual.onplaying = function () {
  if (sonidoActual !== -1 && !audioActual.paused) {
    actualizarBoton(sonidoActual, true, false);
  }
};

audioActual.onpause = function () {
  if (sonidoActual !== -1 && audioActual.paused) {
    actualizarBoton(sonidoActual, false, false);
  }
};

audioActual.onended = function () {
  if (sonidoActual !== -1 && audioActual.ended) {
    actualizarBoton(sonidoActual, false, false);
  }
};

audioActual.onwaiting = function () {
  if (sonidoActual !== -1 && !audioActual.paused) {
    actualizarBoton(sonidoActual, false, true);
  }
};

audioActual.onerror = function () {
  if (sonidoActual !== -1) {
    actualizarBoton(sonidoActual, false, false);
    mensaje.classList.remove("exito");

    mensaje.textContent =
      "No se pudo cargar el audio. Revisá tu conexión a internet.";
  }
};

function quitarSeleccion() {
  tarjetaSeleccionada = "";

  for (let i = 0; i < 4; i++) {
    let tarjeta = document.getElementById("tarjeta" + i);

    tarjeta.classList.remove("seleccionada");
    tarjeta.setAttribute("aria-pressed", "false");
  }
}

function seleccionar(evento, tarjeta) {
  evento.stopPropagation();

  let yaSeleccionada = tarjetaSeleccionada === tarjeta.id;

  quitarSeleccion();

  if (!yaSeleccionada) {
    tarjetaSeleccionada = tarjeta.id;

    tarjeta.classList.add("seleccionada");
    tarjeta.setAttribute("aria-pressed", "true");
  }
}

function arrastrar(evento) {
  quitarSeleccion();

  evento.dataTransfer.setData(
    "text/plain",
    evento.currentTarget.id
  );

  evento.dataTransfer.effectAllowed = "move";
}

function permitirSoltar(evento) {
  evento.preventDefault();
}

function soltar(evento, destino) {
  evento.preventDefault();
  evento.stopPropagation();

  let id = evento.dataTransfer.getData("text/plain");

  for (let i = 0; i < 4; i++) {
    if (id === "tarjeta" + i) {
      let tarjeta = document.getElementById(id);

      moverTarjeta(tarjeta, destino);
      break;
    }
  }
}

function colocar(destino) {
  if (tarjetaSeleccionada !== "") {
    let tarjeta = document.getElementById(tarjetaSeleccionada);

    moverTarjeta(tarjeta, destino);
  }
}

function usarTeclado(evento, destino) {
  if (
    evento.target === destino &&
    (evento.key === "Enter" || evento.key === " ")
  ) {
    evento.preventDefault();
    colocar(destino);
  }
}

function moverTarjeta(tarjeta, destino) {
  let origen = tarjeta.parentElement;

  if (origen === destino) {
    quitarSeleccion();
    return;
  }

  if (destino !== tarjetas && destino.children.length > 0) {
    origen.appendChild(destino.firstElementChild);
  }

  destino.appendChild(tarjeta);

  quitarSeleccion();
  limpiarCorreccion();

  mensaje.textContent = "";
}

function limpiarCorreccion() {
  document.getElementById("premio-shofar").hidden = true;
  mensaje.classList.remove("exito");

  for (let i = 0; i < 4; i++) {
    let slot = document.getElementById("slot" + i);

    slot.classList.remove("correcto", "incorrecto");
  }
}

function comprobar() {
  limpiarCorreccion();

  for (let i = 0; i < 4; i++) {
    let slot = document.getElementById("slot" + i);

    if (slot.children.length === 0) {
      mensaje.textContent =
        "Completá los cuatro espacios antes de comprobar.";
      return;
    }
  }

  let aciertos = 0;

  for (let i = 0; i < 4; i++) {
    let slot = document.getElementById("slot" + i);
    let respuesta = Number(slot.firstElementChild.dataset.tipo);

    if (respuesta === ordenSonidos[i]) {
      slot.classList.add("correcto");
      aciertos++;
    } else {
      slot.classList.add("incorrecto");
    }
  }

  if (aciertos === 4) {
    mensaje.classList.add("exito");
    mensaje.textContent = "4 de 4 respuestas correctas.";

    document.getElementById("premio-shofar").hidden = false;
  } else {
    mensaje.textContent =
      "Respuestas correctas: " + aciertos + " de 4.";
  }
}

function reiniciar() {
  detenerAudio();
  quitarSeleccion();
  limpiarCorreccion();

  let ordenTarjetas = [0, 1, 2, 3];

  mezclar(ordenSonidos);
  mezclar(ordenTarjetas);

  for (let i = 0; i < 4; i++) {
    let tarjeta = document.getElementById(
      "tarjeta" + ordenTarjetas[i]
    );

    tarjetas.appendChild(tarjeta);
  }

  mensaje.textContent = "";
}

reiniciar();