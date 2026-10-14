let filas = 2;
let columnas = 4;

// Cada símbolo genera una pareja.
// Acá podés cambiar sus imágenes y explicaciones.
let simbolos = [
  {
    nombre: "Shofar",
    imagen: "imagenes/shofar.svg",
    fiesta: "Rosh Hashaná",
    info: "El shofar es un instrumento hecho con un cuerno de animal, generalmente de carnero. Se escucha en Rosh Hashaná y su sonido invita a reflexionar y mejorar nuestras acciones. También se toca al finalizar Iom Kipur.",
    fuente: "https://es.chabad.org/library/article_cdo/aid/2092501/jewish/El-Shofar.htm"
  },
  {
    nombre: "Talit",
    imagen: "imagenes/talit.svg",
    fiesta: "Iom Kipur",
    info: "El talit es un manto de oración con flecos llamados tzitzit. Se utiliza durante las plegarias de Iom Kipur, una fecha dedicada a la reflexión y al perdón. También se usa en otras ocasiones: no es exclusivo de esta festividad.",
    fuente: "https://es.chabad.org/library/article_cdo/aid/562938/jewish/El-Orden-del-Da.htm"
  },
  {
    nombre: "Sucá",
    imagen: "imagenes/suca.svg",
    fiesta: "Sucot",
    info: "La sucá es una cabaña temporal con un techo de ramas u otros materiales vegetales. En Sucot se realizan comidas en ella para recordar la protección que recibió el pueblo de Israel durante su travesía por el desierto.",
    fuente: "https://es.chabad.org/library/article_cdo/aid/6813463/jewish/Qu-es-Sucot.htm"
  },
  {
    nombre: "Rollos de Torá",
    imagen: "imagenes/tora.svg",
    fiesta: "Simjat Torá",
    info: "En Simjat Torá se celebra que termina y vuelve a comenzar el ciclo anual de lectura de la Torá. Los rollos se llevan en las hakafot, recorridos acompañados de cantos y bailes que expresan alegría por la Torá.",
    fuente: "https://es.chabad.org/library/article_cdo/aid/6482/jewish/En-Simjat-Tor.htm"
  }
];

let totalCartas = filas * columnas;
let totalParejas = totalCartas / 2;

let tablero = document.getElementById("tablero");
let mensaje = document.getElementById("mensaje");
let encontrados = document.getElementById("encontrados");

let primeraCarta;
let bloqueado = false;
let parejas = 0;

function crearTablero() {
  if (
    !Number.isInteger(filas) ||
    !Number.isInteger(columnas) ||
    filas < 1 ||
    columnas < 1 ||
    totalCartas % 2 !== 0
  ) {
    mensaje.textContent =
      "Usá filas y columnas enteras positivas y una cantidad par de cartas.";
    return;
  }

  if (totalParejas > simbolos.length) {
    mensaje.textContent =
      "Agregá más símbolos: necesitás uno por pareja.";
    return;
  }

  tablero.style.gridTemplateColumns =
    "repeat(" + columnas + ", 1fr)";

  tablero.style.maxWidth = columnas * 100 + "px";

  document.getElementsByClassName("zona-tablero")[0].style.maxWidth =
    columnas * 100 + "px";

  mensaje.textContent =
    "Encontrá las " + totalParejas + " parejas.";

  let cartas = [];

  // Dos cartas de cada símbolo.
  for (let i = 0; i < totalParejas; i++) {
    cartas.push(i);
    cartas.push(i);
  }

  // Mezclar el orden.
  for (let i = cartas.length - 1; i > 0; i--) {
    let azar = Math.floor(Math.random() * (i + 1));

    let auxiliar = cartas[i];
    cartas[i] = cartas[azar];
    cartas[azar] = auxiliar;
  }

  // Mostrar las cartas en el tablero.
  for (let i = 0; i < cartas.length; i++) {
    let pareja = cartas[i];

    tablero.innerHTML +=
      '<button class="carta" data-pareja="' + pareja +
      '" onclick="darVuelta(this)" aria-label="Carta tapada">' +
      '<span>' + imagenSimbolo(pareja) + '</span>' +
      '</button>';
  }
}

function imagenSimbolo(indice) {
  // Si falta la imagen, muestra el nombre del símbolo.
  return '<img src="' + simbolos[indice].imagen +
    '" alt="' + simbolos[indice].nombre +
    '" onerror="this.parentElement.textContent = this.alt">';
}

function darVuelta(carta) {
  if (bloqueado || carta.classList.contains("abierta")) {
    return;
  }

  carta.classList.add("abierta");

  carta.setAttribute(
    "aria-label",
    simbolos[Number(carta.dataset.pareja)].nombre
  );

  if (!primeraCarta) {
    primeraCarta = carta;
    return;
  }

  bloqueado = true;

  if (primeraCarta.dataset.pareja === carta.dataset.pareja) {
    primeraCarta.classList.add("encontrada");
    carta.classList.add("encontrada");

    // Esperar un instante antes de pasar la pareja al costado.
    setTimeout(function () {
      primeraCarta.classList.add("retirada");
      carta.classList.add("retirada");

      primeraCarta.disabled = true;
      carta.disabled = true;

      guardarPareja(Number(carta.dataset.pareja));

      parejas++;
      primeraCarta = undefined;
      bloqueado = false;

      mensaje.textContent =
        "Encontraste " + parejas + " de " + totalParejas + " parejas.";

      if (parejas === totalParejas) {
        mensaje.textContent =
          "¡Ganaste! Explorá los símbolos y elegí tu festividad preferida.";

        document.getElementById("preferencia").hidden = false;
      }
    }, 600);
  } else {
    // Si son distintas, volver a taparlas.
    setTimeout(function () {
      primeraCarta.classList.remove("abierta");
      carta.classList.remove("abierta");

      primeraCarta.setAttribute("aria-label", "Carta tapada");
      carta.setAttribute("aria-label", "Carta tapada");

      primeraCarta = undefined;
      bloqueado = false;
    }, 1000);
  }
}

function guardarPareja(indice) {
  document.getElementById("sinEncontrados").hidden = true;

  encontrados.innerHTML +=
    '<button class="simbolo-encontrado" onclick="mostrarInformacion(' +
    indice + ')">' +
    '<span class="miniaturas">' +
      '<span>' + imagenSimbolo(indice) + '</span>' +
      '<span>' + imagenSimbolo(indice) + '</span>' +
    '</span>' +
    '<span class="nombre">' + simbolos[indice].nombre + '</span>' +
    '<span class="festividad">' + simbolos[indice].fiesta + '</span>' +
    '</button>';

  mostrarInformacion(indice);
}

function mostrarInformacion(indice) {
  document.getElementById("detalle").hidden = false;

  document.getElementById("nombreSimbolo").textContent =
    simbolos[indice].nombre;

  document.getElementById("fiestaSimbolo").textContent =
    simbolos[indice].fiesta;

  document.getElementById("infoSimbolo").textContent =
    simbolos[indice].info;

  document.getElementById("fuenteSimbolo").href =
    simbolos[indice].fuente;
}

function elegirFiesta(boton) {
  let opciones = document.getElementsByClassName("opcion-fiesta");

  for (let i = 0; i < opciones.length; i++) {
    opciones[i].classList.remove("seleccionada");
    opciones[i].setAttribute("aria-pressed", "false");
  }

  boton.classList.add("seleccionada");
  boton.setAttribute("aria-pressed", "true");

  document.getElementById("eleccion").textContent =
    "Elegiste " + boton.textContent.trim() + ".";
}

crearTablero();