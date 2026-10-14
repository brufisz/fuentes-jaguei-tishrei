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
  
  
  // Mezcla una lista al azar.
  
  function mezclar(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
      let posicion = Math.floor(Math.random() * (i + 1));
  
      let auxiliar = lista[i];
      lista[i] = lista[posicion];
      lista[posicion] = auxiliar;
    }
  }
  
  
  // Detiene el audio y vuelve al principio.
  
  function detenerAudio() {
    audioActual.pause();
    audioActual.currentTime = 0;
    sonidoActual = -1;
  
    for (let i = 0; i < 4; i++) {
      let boton = document.getElementById("sonido" + i);
  
      boton.classList.remove("reproduciendo");
      boton.textContent = "▶ Sonido " + (i + 1);
      boton.setAttribute("aria-pressed", "false");
    }
  }
  
  
  // Reproduce, pausa o continúa el sonido.
  
  function reproducir(posicion) {
    let boton = document.getElementById("sonido" + posicion);
  
    // Si tocás el mismo botón mientras suena, pausa.
    if (sonidoActual === posicion && !audioActual.paused) {
      audioActual.pause();
  
      boton.classList.remove("reproduciendo");
      boton.textContent = "▶ Sonido " + (posicion + 1);
      boton.setAttribute("aria-pressed", "false");
  
      return;
    }
  
    // Si elegís otro botón, cambia de audio.
    if (sonidoActual !== posicion) {
      detenerAudio();
  
      audioActual.src = archivos[ordenSonidos[posicion]];
      sonidoActual = posicion;
    }
  
    // Si el audio terminó, vuelve al principio.
    if (audioActual.ended) {
      audioActual.currentTime = 0;
    }
  
    boton.classList.add("reproduciendo");
    boton.textContent = "⏸ Sonido " + (posicion + 1);
    boton.setAttribute("aria-pressed", "true");
  
    audioActual.onended = function () {
      boton.classList.remove("reproduciendo");
      boton.textContent = "▶ Sonido " + (posicion + 1);
      boton.setAttribute("aria-pressed", "false");
    };
  
    audioActual.play().catch(function (error) {
      if (error.name !== "AbortError") {
        boton.classList.remove("reproduciendo");
        boton.textContent = "▶ Sonido " + (posicion + 1);
        boton.setAttribute("aria-pressed", "false");
  
        mensaje.textContent =
          "No se pudo reproducir el audio. Revisá tu conexión a internet.";
      }
    });
  }
  
  
  // Quita la selección de las tarjetas.
  
  function quitarSeleccion() {
    tarjetaSeleccionada = "";
  
    for (let i = 0; i < 4; i++) {
      let tarjeta = document.getElementById("tarjeta" + i);
  
      tarjeta.classList.remove("seleccionada");
      tarjeta.setAttribute("aria-pressed", "false");
    }
  }
  
  
  // Selecciona una tarjeta con un clic o toque.
  
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
  
  
  // Guarda cuál tarjeta se está arrastrando.
  
  function arrastrar(evento) {
    quitarSeleccion();
  
    evento.dataTransfer.setData(
      "text/plain",
      evento.currentTarget.id
    );
  
    evento.dataTransfer.effectAllowed = "move";
  }
  
  
  // Permite soltar una tarjeta.
  
  function permitirSoltar(evento) {
    evento.preventDefault();
  }
  
  
  // Coloca la tarjeta que se soltó.
  
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
  
  
  // Coloca una tarjeta seleccionada con un clic.
  
  function colocar(destino) {
    if (tarjetaSeleccionada !== "") {
      let tarjeta = document.getElementById(tarjetaSeleccionada);
  
      moverTarjeta(tarjeta, destino);
    }
  }
  
  
  // Permite colocar tarjetas usando el teclado.
  
  function usarTeclado(evento, destino) {
    if (
      evento.target === destino &&
      (evento.key === "Enter" || evento.key === " ")
    ) {
      evento.preventDefault();
      colocar(destino);
    }
  }
  
  
  // Mueve una tarjeta.
  // Si el espacio está ocupado, intercambia las tarjetas.
  
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
  
  
  // Quita los colores de la corrección anterior.
  
  function limpiarCorreccion() {
    for (let i = 0; i < 4; i++) {
      let slot = document.getElementById("slot" + i);
  
      slot.classList.remove("correcto", "incorrecto");
    }
  }
  
  
  // Comprueba las cuatro respuestas.
  
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
  
    mensaje.textContent =
      "Respuestas correctas: " + aciertos + " de 4.";
  }
  
  
  // Devuelve las tarjetas y mezcla todo nuevamente.
  
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