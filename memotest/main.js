let filas = 4;
let columnas = 5;

// Los datos de autor y licencia se conservan en el código.
// No se muestran en la interfaz.

let simbolos = [
  {
    nombre: "Manzana y miel",
    imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Honey-and-Apples-IZE-005a.jpg/960px-Honey-and-Apples-IZE-005a.jpg",
    idea: "Manzana con miel",
    info: "Se come manzana mojada en miel para pedir un año bueno y dulce. Es una de las costumbres de la cena de Rosh Hashaná.",
    fuente: "https://es.chabad.org/library/article_cdo/aid/5054/jewish/La-Primera-Noche.htm",
    sitio: "Jabad en Español",
    autor: "MathKnight / Zachi Evenor",
    foto: "https://commons.wikimedia.org/wiki/File:Honey-and-Apples-IZE-005a.jpg",
    licencia: "CC BY 4.0",
    licenciaURL: "https://creativecommons.org/licenses/by/4.0/"
  },
  {
    nombre: "Shofar",
    imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Shofar-16-Zachi-Evenor.jpg/960px-Shofar-16-Zachi-Evenor.jpg",
    idea: "Cuerno de carnero",
    info: "Es un instrumento de viento hecho con un cuerno, generalmente de carnero. Escuchar sus toques es uno de los preceptos de Rosh Hashaná y un llamado a revisar nuestras acciones.",
    fuente: "https://es.chabad.org/library/article_cdo/aid/5199/jewish/El-Shofar.htm",
    sitio: "Jabad en Español",
    autor: "Zachi Evenor",
    foto: "https://commons.wikimedia.org/wiki/File:Shofar-16-Zachi-Evenor.jpg",
    licencia: "CC BY 2.0",
    licenciaURL: "https://creativecommons.org/licenses/by/2.0/"
  },
  {
    nombre: "Granada",
    imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Pomegranate_fruit_-_whole_and_piece_with_arils.jpg/960px-Pomegranate_fruit_-_whole_and_piece_with_arils.jpg",
    idea: "Semillas y méritos",
    info: "Se acostumbra comer granada y pedir que nuestros méritos sean tan numerosos como sus semillas.",
    fuente: "https://es.chabad.org/library/article_cdo/aid/5054/jewish/La-Primera-Noche.htm",
    sitio: "Jabad en Español",
    autor: "Ivar Leidus",
    foto: "https://commons.wikimedia.org/wiki/File:Pomegranate_fruit_-_whole_and_piece_with_arils.jpg",
    licencia: "CC BY-SA 4.0",
    licenciaURL: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    nombre: "Jalá redonda",
    imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Round_challah.jpg/960px-Round_challah.jpg",
    idea: "Pan de la festividad",
    info: "En Rosh Hashaná se prepara jalá redonda. Su forma se asocia con el ciclo del año y también con una corona. Se suele mojar en miel.",
    fuente: "https://reformjudaism.org/jewish-holidays/rosh-hashanah/rosh-hashanah-theres-more-eat-apples-and-honey",
    sitio: "Reform Judaism",
    autor: "Przemysław Wierzbowski",
    foto: "https://commons.wikimedia.org/wiki/File:Round_challah.jpg",
    licencia: "CC BY-SA 4.0",
    licenciaURL: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    nombre: "Velas y candelabros",
    imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/ShabbatcandlesC.jpg/500px-ShabbatcandlesC.jpg",
    idea: "Encendido de velas",
    info: "Las dos noches de Rosh Hashaná se encienden velas y se recitan las bendiciones de la festividad. Se colocan en candelabros, que también se usan en Shabat y en otras fiestas.",
    fuente: "https://es.chabad.org/library/article_cdo/aid/7247631/jewish/Encendido-de-las-velas-de-Rosh-Hashan.htm",
    sitio: "Jabad en Español",
    autor: "Gilabrand",
    foto: "https://commons.wikimedia.org/wiki/File:ShabbatcandlesC.jpg",
    licencia: "CC BY-SA 3.0",
    licenciaURL: "https://creativecommons.org/licenses/by-sa/3.0/"
  },
  {
    nombre: "Tarjetas de Shaná tová",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/4/43/Rosh_Hashana_Montevideo_1932.jpg",
    idea: "Saludos de año nuevo",
    info: "Son tarjetas que se envían a familiares y amigos para desearles un buen año. Suelen llevar el saludo «Shaná tová». También se las llama kartisim. Hoy es común mandar estos saludos por mensaje.",
    fuente: "https://blog.nli.org.il/en/hoi_rosh-hashanah-greeting-cards/",
    sitio: "Biblioteca Nacional de Israel",
    autor: "Calimeronte",
    foto: "https://commons.wikimedia.org/wiki/File:Rosh_Hashana_Montevideo_1932.jpg",
    licencia: "CC BY-SA 3.0",
    licenciaURL: "https://creativecommons.org/licenses/by-sa/3.0/"
  },
  {
    nombre: "Majzor",
    imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Machzor_1911.JPG/500px-Machzor_1911.JPG",
    idea: "Libro de plegarias",
    info: "Es el libro de plegarias que se usa en las grandes festividades. El de Rosh Hashaná reúne los rezos y las lecturas de esos días. Hay distintas versiones según la tradición de cada comunidad.",
    fuente: "https://www.chabad.org/library/article_cdo/aid/3750740/jewish/What-to-Expect-at-Rosh-Hashanah-Services.htm",
    sitio: "Chabad.org",
    autor: "Autor desconocido",
    foto: "https://commons.wikimedia.org/wiki/File:Machzor_1911.JPG",
    licencia: "Dominio público",
    licenciaURL: "https://commons.wikimedia.org/wiki/Commons:Public_domain"
  },
  {
    nombre: "Rollos de Torá",
    imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/26/Open_Torah_scroll.jpg/500px-Open_Torah_scroll.jpg",
    idea: "Lectura en la sinagoga",
    info: "En la sinagoga se leen pasajes de la Torá. El primer día de Rosh Hashaná se lee sobre el nacimiento de Itzjak; el segundo, sobre la prueba de Abraham y la atadura de Itzjak.",
    fuente: "https://es.chabad.org/library/article_cdo/aid/5058/jewish/La-lectura-de-la-Tor.htm",
    sitio: "Jabad en Español",
    autor: "Lawrie Cate",
    foto: "https://commons.wikimedia.org/wiki/File:Open_Torah_scroll.jpg",
    licencia: "CC BY 2.0",
    licenciaURL: "https://creativecommons.org/licenses/by/2.0/"
  },
  {
    nombre: "Copa de kidush",
    imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Kiddush_cup_jerusalem.jpg/500px-Kiddush_cup_jerusalem.jpg",
    idea: "Bendición sobre el vino",
    info: "El kidush es una bendición que se recita sobre una copa de vino o jugo de uva al comenzar la comida festiva. También se hace en Shabat y en otras festividades.",
    fuente: "https://es.chabad.org/library/article_cdo/aid/1955751/jewish/Qu-es-Rosh-Hashan.htm",
    sitio: "Jabad en Español",
    autor: "Dimitri",
    foto: "https://commons.wikimedia.org/wiki/File:Kiddush_cup_jerusalem.jpg",
    licencia: "CC BY-SA 3.0",
    licenciaURL: "https://creativecommons.org/licenses/by-sa/3.0/"
  },
  {
    nombre: "Tashlij",
    imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Aleksander_Gierymski%2C_%C5%9Awi%C4%99to_Tr%C4%85bek_I.jpg/500px-Aleksander_Gierymski%2C_%C5%9Awi%C4%99to_Tr%C4%85bek_I.jpg",
    idea: "Plegaria junto al agua",
    info: "Es una plegaria que se recita junto a un río, un lago o el mar. Se pide que las faltas sean arrojadas simbólicamente al agua y se expresa la intención de corregirlas.",
    fuente: "https://es.chabad.org/library/article_cdo/aid/5057/jewish/Minj-y-Tashlij.htm",
    sitio: "Jabad en Español",
    autor: "Aleksander Gierymski",
    foto: "https://commons.wikimedia.org/wiki/File:Aleksander_Gierymski,_%C5%9Awi%C4%99to_Tr%C4%85bek_I.jpg",
    licencia: "Dominio público",
    licenciaURL: "https://commons.wikimedia.org/wiki/Commons:Public_domain"
  }
];

let tablero = document.getElementById("tablero");
let mensaje = document.getElementById("mensaje");
let encontrados = document.getElementById("encontrados");

let primeraCarta;
let tiempoEspera;
let bloqueado = false;
let parejas = 0;
let intentos = 0;
let totalParejas = 0;

function crearTablero() {
  let totalCartas = filas * columnas;
  totalParejas = totalCartas / 2;

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

  tablero.style.setProperty("--columnas", columnas);
  tablero.innerHTML = "";
  mensaje.textContent = "Elegí dos cartas.";

  actualizarMarcadores();

  let cartas = [];

  for (let i = 0; i < totalParejas; i++) {
    cartas.push(i);
    cartas.push(i);
  }

  for (let i = cartas.length - 1; i > 0; i--) {
    let azar = Math.floor(Math.random() * (i + 1));
    let auxiliar = cartas[i];

    cartas[i] = cartas[azar];
    cartas[azar] = auxiliar;
  }

  for (let i = 0; i < cartas.length; i++) {
    let pareja = cartas[i];

    tablero.innerHTML +=
      '<button class="carta" type="button" ' +
        'data-pareja="' + pareja + '" ' +
        'onclick="darVuelta(this)" ' +
        'aria-label="Carta tapada ' + (i + 1) + '" ' +
        'aria-pressed="false">' +
        '<span class="frente">' +
          imagenSimbolo(pareja) +
          '<span class="nombre-carta">' +
            simbolos[pareja].nombre +
          '</span>' +
        '</span>' +
      '</button>';
  }
}

function imagenSimbolo(indice) {
  return (
    '<img src="' + simbolos[indice].imagen + '" ' +
    'alt="' + simbolos[indice].nombre + '" ' +
    'draggable="false" ' +
    'referrerpolicy="no-referrer" ' +
    'onerror="imagenNoDisponible(this)">'
  );
}

function imagenNoDisponible(imagen) {
  let reemplazo = document.createElement("span");

  reemplazo.className = "imagen-faltante";
  reemplazo.textContent = imagen.alt;

  imagen.parentElement.replaceChild(reemplazo, imagen);
}

function actualizarMarcadores() {
  document.getElementById("contadorParejas").textContent =
    parejas + " / " + totalParejas;

  document.getElementById("contadorIntentos").textContent =
    intentos;
}

function darVuelta(carta) {
  if (
    bloqueado ||
    carta.classList.contains("abierta") ||
    carta.disabled
  ) {
    return;
  }

  let indice = Number(carta.dataset.pareja);

  carta.classList.add("abierta");
  carta.setAttribute("aria-pressed", "true");
  carta.setAttribute("aria-label", simbolos[indice].nombre);

  if (!primeraCarta) {
    primeraCarta = carta;
    mensaje.textContent = "Elegí otra carta.";
    return;
  }

  bloqueado = true;
  intentos++;

  actualizarMarcadores();

  let anterior = primeraCarta;

  if (anterior.dataset.pareja === carta.dataset.pareja) {
    anterior.classList.add("encontrada");
    carta.classList.add("encontrada");

    mensaje.textContent =
      "Pareja: " + simbolos[indice].nombre + ".";

    tiempoEspera = setTimeout(function () {
      anterior.classList.add("retirada");
      carta.classList.add("retirada");

      anterior.disabled = true;
      carta.disabled = true;

      guardarPareja(indice);

      parejas++;
      primeraCarta = undefined;
      bloqueado = false;

      actualizarMarcadores();

      mensaje.textContent =
        "Encontraste " + parejas + " de " + totalParejas + " parejas.";

      if (parejas === totalParejas) {
        mensaje.textContent =
          "Encontraste las " + totalParejas +
          " parejas en " + intentos + " intentos.";

        document.getElementById("victoria").hidden = false;
        document.getElementById("reiniciar").focus();
      } else {
        enfocarCartaDisponible();
      }
    }, 650);
  } else {
    mensaje.textContent = "No coinciden.";

    tiempoEspera = setTimeout(function () {
      anterior.classList.remove("abierta");
      carta.classList.remove("abierta");

      anterior.setAttribute("aria-label", "Carta tapada");
      carta.setAttribute("aria-label", "Carta tapada");

      anterior.setAttribute("aria-pressed", "false");
      carta.setAttribute("aria-pressed", "false");

      primeraCarta = undefined;
      bloqueado = false;

      mensaje.textContent = "Elegí dos cartas.";
    }, 1100);
  }
}

function enfocarCartaDisponible() {
  let cartas = tablero.getElementsByClassName("carta");

  for (let i = 0; i < cartas.length; i++) {
    if (!cartas[i].disabled) {
      cartas[i].focus({ preventScroll: true });
      return;
    }
  }
}

function guardarPareja(indice) {
  document.getElementById("sinEncontrados").hidden = true;

  encontrados.innerHTML +=
    '<button class="simbolo-encontrado" type="button" ' +
      'data-simbolo="' + indice + '" ' +
      'aria-pressed="false" ' +
      'onclick="mostrarInformacion(' + indice + ')">' +
      '<span class="miniaturas" aria-hidden="true">' +
        imagenSimbolo(indice) +
        imagenSimbolo(indice) +
      '</span>' +
      '<span>' +
        '<span class="nombre">' +
          simbolos[indice].nombre +
        '</span>' +
        '<span class="idea">' +
          simbolos[indice].idea +
        '</span>' +
      '</span>' +
    '</button>';

  mostrarInformacion(indice);
}

function mostrarInformacion(indice) {
  let simbolo = simbolos[indice];

  document.getElementById("detalle").hidden = false;

  document.getElementById("nombreSimbolo").textContent =
    simbolo.nombre;

  document.getElementById("infoSimbolo").textContent =
    simbolo.info;

  let fuente = document.getElementById("fuenteSimbolo");

  fuente.href = simbolo.fuente;
  fuente.textContent = "Leer más";

  let botones = encontrados.getElementsByClassName(
    "simbolo-encontrado"
  );

  for (let i = 0; i < botones.length; i++) {
    botones[i].classList.remove("activo");
    botones[i].setAttribute("aria-pressed", "false");

    if (Number(botones[i].dataset.simbolo) === indice) {
      botones[i].classList.add("activo");
      botones[i].setAttribute("aria-pressed", "true");
    }
  }
}

function reiniciarJuego() {
  clearTimeout(tiempoEspera);

  primeraCarta = undefined;
  bloqueado = false;
  parejas = 0;
  intentos = 0;

  encontrados.innerHTML = "";

  document.getElementById("sinEncontrados").hidden = false;
  document.getElementById("detalle").hidden = true;
  document.getElementById("victoria").hidden = true;

  crearTablero();
}

crearTablero();