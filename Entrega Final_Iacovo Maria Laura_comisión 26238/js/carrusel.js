const carrusel = document.getElementById("carrusel");

if (carrusel) {
  const pista = carrusel.querySelector(".diapositivas");
  const puntos = carrusel.querySelector(".puntos");
  const prefiereQuieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let actual = 0;
  let temporizador;

  pista.innerHTML = portada.map((f, i) => `
    <img class="diapositiva${i === 0 ? " activa" : ""}" src="${base}img/${f.imagen}" alt="${f.alt}">`).join("");
  puntos.innerHTML = portada.map((_, i) => `
    <button class="punto" type="button" data-i="${i}" aria-label="Ir a la imagen ${i + 1}" aria-current="${i === 0}"></button>`).join("");

  const diapositivas = pista.querySelectorAll(".diapositiva");
  const botonesPunto = puntos.querySelectorAll(".punto");

  function mostrar(i) {
    actual = (i + portada.length) % portada.length;
    diapositivas.forEach((d, n) => d.classList.toggle("activa", n === actual));
    botonesPunto.forEach((b, n) => b.setAttribute("aria-current", n === actual));
  }

  function iniciar() {
    if (!prefiereQuieto) temporizador = setInterval(() => mostrar(actual + 1), 5000);
  }
  function detener() { clearInterval(temporizador); }

  carrusel.querySelector(".anterior").addEventListener("click", () => mostrar(actual - 1));
  carrusel.querySelector(".siguiente").addEventListener("click", () => mostrar(actual + 1));
  puntos.addEventListener("click", (e) => {
    const boton = e.target.closest(".punto");
    if (boton) mostrar(Number(boton.dataset.i));
  });

  carrusel.addEventListener("mouseenter", detener);
  carrusel.addEventListener("mouseleave", iniciar);
  carrusel.addEventListener("focusin", detener);
  carrusel.addEventListener("focusout", iniciar);

  iniciar();
}