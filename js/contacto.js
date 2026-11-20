const form = document.getElementById("form-inscripcion");
const selectProyecto = document.getElementById("proyecto");
const confirmacion = document.getElementById("confirmacion");

selectProyecto.innerHTML = proyectos
  .map(p => `<option value="${p.titulo}">${p.titulo}</option>`)
  .join("");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const datos = Object.fromEntries(new FormData(form));
  const inscripciones = JSON.parse(localStorage.getItem("inscripciones")) || [];
  inscripciones.push(datos);
  localStorage.setItem("inscripciones", JSON.stringify(inscripciones));
  confirmacion.textContent = `¡Gracias, ${datos.nombre}! Recibimos tu inscripción a "${datos.proyecto}".`;
  form.reset();
});