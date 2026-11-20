const base = document.body.dataset.base || "";


const botonTema = document.getElementById("boton-tema");

function aplicarTema(oscuro) {
  document.body.classList.toggle("oscuro", oscuro);
  botonTema.textContent = oscuro ? "☀️ Claro" : "🌙 Oscuro";
  botonTema.setAttribute("aria-pressed", oscuro);
}

aplicarTema(localStorage.getItem("tema") === "oscuro");

botonTema.addEventListener("click", () => {
  const oscuro = !document.body.classList.contains("oscuro");
  localStorage.setItem("tema", oscuro ? "oscuro" : "claro");
  aplicarTema(oscuro);
});


function tarjetaProyecto(p) {
  return `
    <article class="tarjeta">
      <img src="${base}img/${p.imagen}" alt="${p.alt}">
      <span class="etiqueta">${p.categoria}</span>
      <h3>${p.titulo}</h3>
      <p>${p.descripcion}</p>
    </article>`;
}

function mostrarProyectos(contenedor, lista) {
  contenedor.innerHTML = lista.map(tarjetaProyecto).join("");
}


let guardadas = JSON.parse(localStorage.getItem("guardadas")) || [];
const noticiasOrdenadas = [...noticias].sort((a, b) => b.fecha.localeCompare(a.fecha));

function tarjetaNoticia(n) {
  const fecha = new Date(n.fecha + "T00:00:00").toLocaleDateString("es-AR", {
    day: "numeric", month: "long", year: "numeric"
  });
  const activa = guardadas.includes(n.id);
  return `
    <article class="tarjeta">
      <img src="${base}img/${n.imagen}" alt="${n.alt}">
      <h3>${n.titulo}</h3>
      <p><time datetime="${n.fecha}">${fecha}</time></p>
      <p>${n.resumen}</p>
      <button class="boton-guardar" data-id="${n.id}" aria-pressed="${activa}">
        ${activa ? "★ Guardada" : "☆ Guardar"}
      </button>
    </article>`;
}

function mostrarNoticias(contenedor, lista) {
  contenedor.innerHTML = lista.length
    ? lista.map(tarjetaNoticia).join("")
    : "<p>Todavía no guardaste ninguna noticia.</p>";
}

function alternarGuardada(id) {
  guardadas = guardadas.includes(id)
    ? guardadas.filter(g => g !== id)
    : [...guardadas, id];
  localStorage.setItem("guardadas", JSON.stringify(guardadas));
}


const destacadosProy = document.getElementById("proyectos-destacados");
if (destacadosProy) mostrarProyectos(destacadosProy, proyectos.slice(0, 3));

const listaProy = document.getElementById("lista-proyectos");
const filtros = document.getElementById("filtros");
if (listaProy && filtros) {
  const categorias = ["Todos", ...new Set(proyectos.map(p => p.categoria))];
  filtros.innerHTML = categorias
    .map((c, i) => `<button class="filtro" data-cat="${c}" aria-pressed="${i === 0}">${c}</button>`)
    .join("");
  mostrarProyectos(listaProy, proyectos);

  filtros.addEventListener("click", (e) => {
    const boton = e.target.closest(".filtro");
    if (!boton) return;
    filtros.querySelectorAll(".filtro").forEach(b => b.setAttribute("aria-pressed", b === boton));
    const cat = boton.dataset.cat;
    mostrarProyectos(listaProy, cat === "Todos" ? proyectos : proyectos.filter(p => p.categoria === cat));
  });
}

const listaNot = document.getElementById("lista-noticias");
const soloGuardadas = document.getElementById("solo-guardadas");

function refrescarNoticias() {
  const lista = soloGuardadas && soloGuardadas.checked
    ? noticiasOrdenadas.filter(n => guardadas.includes(n.id))
    : noticiasOrdenadas;
  mostrarNoticias(listaNot, lista);
}

const destacadosNot = document.getElementById("noticias-destacadas");
const contenedorNoticias = listaNot || destacadosNot;
if (contenedorNoticias) {
  if (listaNot) refrescarNoticias();
  else mostrarNoticias(destacadosNot, noticiasOrdenadas.slice(0, 3));

  contenedorNoticias.addEventListener("click", (e) => {
    const boton = e.target.closest(".boton-guardar");
    if (!boton) return;
    alternarGuardada(Number(boton.dataset.id));
    if (listaNot) refrescarNoticias();
    else mostrarNoticias(destacadosNot, noticiasOrdenadas.slice(0, 3));
  });
}
if (soloGuardadas) soloGuardadas.addEventListener("change", refrescarNoticias);