let materiales = [
  {
    id: 1,
    nombre: "Ramas de palmera",
    techo: true,
    pared: false
  },
  {
    id: 2,
    nombre: "Cañas de bambú",
    techo: true,
    pared: false
  },
  {
    id: 3,
    nombre: "Ramas de pino cortadas",
    techo: true,
    pared: false
  },
  {
    id: 4,
    nombre: "Chapa de metal",
    techo: false,
    pared: true,
    motivo: "La chapa de metal no es vegetal."
  },
  {
    id: 5,
    nombre: "Lona de plástico",
    techo: false,
    pared: true,
    motivo: "El plástico no sirve como sjaj."
  },
  {
    id: 6,
    nombre: "Vidrio",
    techo: false,
    pared: true,
    motivo: "El vidrio no es vegetal."
  },
  {
    id: 7,
    nombre: "Paraguas",
    techo: false,
    pared: false,
    motivo: "El paraguas no sirve como sjaj."
  },
  {
    id: 8,
    nombre: "Rama unida al árbol",
    techo: false,
    pared: false,
    motivo: "La rama todavía está unida al árbol: hay que cortarla."
  },
  {
    id: 9,
    nombre: "Panel de madera",
    techo: false,
    pared: true,
    motivo: "Este panel es para las paredes. En el techo de esta maqueta usá ramas o cañas cortadas."
  },
  {
    id: 10,
    nombre: "Tela bien sujeta",
    techo: false,
    pared: true,
    motivo: "La tela procesada no sirve como sjaj."
  },
  {
    id: 11,
    nombre: "Lona bien tensada",
    techo: false,
    pared: true,
    motivo: "La lona no sirve como sjaj."
  },
  {
    id: 12,
    nombre: "Cartón firme",
    techo: false,
    pared: true,
    motivo: "El cartón no sirve como sjaj."
  }
];

let piezas = {
  roof: [0, 0, 0, 0],
  walls: [0, 0, 0]
};

let marcas = {
  roof: [],
  walls: []
};

let seleccionado = 0;

let pal = document.getElementById("pal");
let escena = document.getElementById("scene");
let resultado = document.getElementById("res");
let premio = document.getElementById("premio");

function buscarMaterial(id) {
  for (let i = 0; i < materiales.length; i++) {
    if (materiales[i].id === id) {
      return materiales[i];
    }
  }
}

function imagen(id) {
  let dibujo = "";

  if (id === 1) {
    dibujo =
      '<path d="M10 78 Q60 40 112 8" ' +
      'stroke="#6d6b37" stroke-width="4" fill="none"/>';

    for (let i = 0; i < 11; i++) {
      let x = 18 + i * 8;
      let y = 72 - i * 5;

      dibujo +=
        '<path d="M' + x + ' ' + y +
        ' Q' + (x - 18) + ' ' + (y - 22) +
        ' ' + (x - 7) + ' ' + (y - 40) +
        ' Q' + (x + 5) + ' ' + (y - 15) +
        ' ' + x + ' ' + y + '" fill="#697d42"/>';

      dibujo +=
        '<path d="M' + x + ' ' + y +
        ' Q' + (x + 18) + ' ' + (y + 9) +
        ' ' + (x + 28) + ' ' + (y - 2) +
        ' Q' + (x + 12) + ' ' + (y - 9) +
        ' ' + x + ' ' + y + '" fill="#8c9b51"/>';
    }
  } else if (id === 2) {
    for (let i = 0; i < 8; i++) {
      let x = i * 16 - 3;

      dibujo +=
        '<rect x="' + x + '" y="0" width="13" height="90" ' +
        'rx="5" fill="#b6a56a" stroke="#7d7950"/>';

      dibujo +=
        '<path d="M' + (x + 3) + ' 0v90" ' +
        'stroke="#dfd39a" stroke-width="3"/>';

      dibujo +=
        '<path d="M' + x + ' 23h13 M' + x + ' 59h13" ' +
        'stroke="#777145" stroke-width="3"/>';
    }
  } else if (id === 3) {
    for (let j = 0; j < 3; j++) {
      let y = 20 + j * 27;

      dibujo +=
        '<path d="M0 ' + (y + 13) +
        ' L120 ' + (y - 12) +
        '" stroke="#705236" stroke-width="3"/>';

      for (let i = 0; i < 15; i++) {
        let x = i * 9;
        let yy = y + 13 - i * 1.9;

        dibujo +=
          '<path d="M' + x + ' ' + yy +
          ' l8 -17 M' + x + ' ' + yy +
          ' l13 10 M' + x + ' ' + yy +
          ' l-3 -17" stroke="#526f44" stroke-width="2"/>';
      }
    }
  } else if (id === 7) {
    dibujo =
      '<path d="M9 49 Q60 -12 111 49 ' +
      'Q98 41 86 49 Q73 41 60 49 ' +
      'Q46 41 34 49 Q21 41 9 49" fill="#a66549"/>';

    dibujo +=
      '<path d="M60 7 Q38 25 34 49 M60 7v42 ' +
      'M60 7 Q83 25 86 49" stroke="#744c38" ' +
      'stroke-width="1.5" fill="none"/>';

    dibujo +=
      '<path d="M60 47v27q0 13-13 7" ' +
      'stroke="#4b4e43" stroke-width="4" fill="none"/>';
  } else if (id === 8) {
    dibujo =
      '<path d="M10 90 L14 0 L29 0 L31 90Z" fill="#896442"/>';

    dibujo +=
      '<path d="M23 47 Q70 32 120 22" ' +
      'stroke="#80603f" stroke-width="7" fill="none"/>';

    for (let i = 0; i < 7; i++) {
      let x = 40 + i * 12;
      let y = 40 - i * 2;

      dibujo +=
        '<path d="M' + x + ' ' + y +
        ' q-10 -22 5 -26 q13 15-5 26 M' +
        x + ' ' + y +
        ' q18 -1 19 16 q-18 5-19-16" fill="#607b49"/>';
    }
  }

  if (dibujo !== "") {
    return (
      '<span class="muestra material-' + id + '">' +
        '<svg viewBox="0 0 120 90" ' +
          'preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
          dibujo +
        '</svg>' +
      '</span>'
    );
  }

  return (
    '<span class="muestra material-' + id + '">' +
      '<span class="textura textura-' + id + '"></span>' +
    '</span>'
  );
}

function dibujar() {
  pal.innerHTML = "";

  for (let i = 0; i < materiales.length; i++) {
    let material = materiales[i];
    let clase = "tile";
    let presionado = "false";

    if (seleccionado === material.id) {
      clase += " sel";
      presionado = "true";
    }

    pal.innerHTML +=
      '<button id="material-' + material.id + '" ' +
        'class="' + clase + '" type="button" draggable="true" ' +
        'data-id="' + material.id + '" ' +
        'aria-pressed="' + presionado + '">' +
        imagen(material.id) +
        '<span class="tile-nombre">' +
          material.nombre +
        '</span>' +
      '</button>';
  }

  let zonas = ["roof", "walls"];
  let cantidades = [0, 0];

  for (let z = 0; z < zonas.length; z++) {
    let zona = zonas[z];
    let contenedor = document.getElementById(zona);

    contenedor.innerHTML = "";

    for (let i = 0; i < piezas[zona].length; i++) {
      let id = piezas[zona][i];
      let clase = "slot";
      let etiqueta = "Techo";

      if (zona === "walls") {
        etiqueta = "Pared";
      }

      let contenido = etiqueta;
      let descripcion = etiqueta + " " + (i + 1) + ": vacío";

      if (id !== 0) {
        clase += " f";
        contenido = imagen(id);

        descripcion =
          etiqueta + " " + (i + 1) + ": " +
          buscarMaterial(id).nombre;

        cantidades[z]++;
      }

      if (marcas[zona][i] === true) {
        clase += " ok";
      }

      if (marcas[zona][i] === false) {
        clase += " bad";
      }

      contenedor.innerHTML +=
        '<button id="' + zona + '-' + i + '" ' +
          'class="' + clase + '" type="button" ' +
          'data-zona="' + zona + '" ' +
          'data-posicion="' + i + '" ' +
          'aria-label="' + descripcion + '">' +
          contenido +
        '</button>';
    }
  }

  document.getElementById("cuenta-techo").textContent =
    cantidades[0] + "/4";

  document.getElementById("cuenta-paredes").textContent =
    cantidades[1] + "/3";

  let texto = "Ningún material seleccionado.";

  if (seleccionado !== 0) {
    texto =
      "Seleccionado: " + buscarMaterial(seleccionado).nombre + ".";
  }

  document.getElementById("seleccion").textContent = texto;
}

function poner(zona, posicion, id) {
  if (zona !== "roof" && zona !== "walls") {
    return;
  }

  if (posicion < 0 || posicion >= piezas[zona].length) {
    return;
  }

  if (id !== 0 && !buscarMaterial(id)) {
    return;
  }

  piezas[zona][posicion] = id;

  marcas = {
    roof: [],
    walls: []
  };

  resultado.hidden = true;

  dibujar();

  document.getElementById(zona + "-" + posicion).focus({
    preventScroll: true
  });
}

pal.onclick = function (evento) {
  let tarjeta = evento.target.closest(".tile");

  if (!tarjeta) {
    return;
  }

  let id = Number(tarjeta.dataset.id);

  if (seleccionado === id) {
    seleccionado = 0;
  } else {
    seleccionado = id;
  }

  dibujar();

  document.getElementById("material-" + id).focus({
    preventScroll: true
  });
};

pal.ondragstart = function (evento) {
  let tarjeta = evento.target.closest(".tile");

  if (!tarjeta) {
    return;
  }

  let id = Number(tarjeta.dataset.id);

  evento.dataTransfer.setData("text/plain", String(id));
  evento.dataTransfer.effectAllowed = "copy";
};

pal.ondragend = function () {
  limpiarDestino();
};

escena.onclick = function (evento) {
  let sector = evento.target.closest(".slot");

  if (!sector) {
    return;
  }

  let zona = sector.dataset.zona;
  let posicion = Number(sector.dataset.posicion);
  let actual = piezas[zona][posicion];

  if (
    actual !== 0 &&
    (seleccionado === 0 || seleccionado === actual)
  ) {
    poner(zona, posicion, 0);
  } else if (seleccionado !== 0) {
    poner(zona, posicion, seleccionado);
  }
};

function limpiarDestino() {
  let sectores = escena.getElementsByClassName("slot");

  for (let i = 0; i < sectores.length; i++) {
    sectores[i].classList.remove("destino");
  }
}

escena.ondragover = function (evento) {
  let sector = evento.target.closest(".slot");

  if (!sector) {
    return;
  }

  evento.preventDefault();

  limpiarDestino();
  sector.classList.add("destino");
};

escena.ondragleave = function (evento) {
  if (!escena.contains(evento.relatedTarget)) {
    limpiarDestino();
  }
};

escena.ondrop = function (evento) {
  evento.preventDefault();

  limpiarDestino();

  let sector = evento.target.closest(".slot");
  let id = Number(evento.dataTransfer.getData("text/plain"));

  if (sector && buscarMaterial(id)) {
    poner(
      sector.dataset.zona,
      Number(sector.dataset.posicion),
      id
    );
  }
};

document.getElementById("rst").onclick = function () {
  piezas = {
    roof: [0, 0, 0, 0],
    walls: [0, 0, 0]
  };

  marcas = {
    roof: [],
    walls: []
  };

  seleccionado = 0;
  resultado.hidden = true;

  dibujar();
};

document.getElementById("chk").onclick = function () {
  let errores = [];
  let techos = 0;
  let paredes = 0;

  marcas = {
    roof: [],
    walls: []
  };

  for (let i = 0; i < piezas.roof.length; i++) {
    let material = buscarMaterial(piezas.roof[i]);

    if (!material) {
      continue;
    }

    marcas.roof[i] = material.techo;

    if (material.techo) {
      techos++;
    } else if (errores.indexOf(material.motivo) === -1) {
      errores.push(material.motivo);
    }
  }

  for (let i = 0; i < piezas.walls.length; i++) {
    let material = buscarMaterial(piezas.walls[i]);

    if (!material) {
      continue;
    }

    marcas.walls[i] = material.pared;

    if (material.pared) {
      paredes++;
    } else {
      let texto =
        material.nombre +
        ": para esta pared elegí un panel firme o una tela bien sujeta.";

      if (errores.indexOf(texto) === -1) {
        errores.push(texto);
      }
    }
  }

  if (techos < 4) {
    errores.push(
      "Completá los cuatro sectores del techo con ramas o cañas cortadas."
    );
  }

  if (paredes < 3) {
    errores.push(
      "Completá las tres paredes con materiales firmes."
    );
  }

  resultado.className = "resultado";
  resultado.hidden = false;

  if (errores.length === 0) {
    resultado.classList.add("win");

    resultado.innerHTML =
      "<strong>La sucá está terminada.</strong>";

    dibujar();
    mostrarPremio();
  } else {
    let lista = "<strong>Revisá esto:</strong><ul>";

    for (let i = 0; i < errores.length; i++) {
      lista += "<li>" + errores[i] + "</li>";
    }

    resultado.innerHTML = lista + "</ul>";

    dibujar();
  }
};

function mostrarPremio() {
  let confeti = document.getElementById("confeti");
  let colores = [
    "#b99055",
    "#83956c",
    "#e0c891",
    "#d2a090"
  ];

  confeti.innerHTML = "";

  for (let i = 0; i < 42; i++) {
    let papel = document.createElement("i");

    papel.style.left = Math.random() * 100 + "%";
    papel.style.background = colores[i % colores.length];
    papel.style.animationDelay = Math.random() + "s";

    papel.style.setProperty(
      "--desvio",
      Math.random() * 160 - 80 + "px"
    );

    confeti.appendChild(papel);
  }

  if (!premio.open) {
    premio.showModal();
  }
}

document.getElementById("cerrar").onclick = function () {
  premio.close();
};

premio.onclick = function (evento) {
  if (evento.target === premio) {
    premio.close();
  }
};

dibujar();