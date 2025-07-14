<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<title>Plan de Estudio Interactivo</title>
<style>
  .materia {
    margin: 8px 0;
    padding: 10px;
    background: #fff;
    border-left: 5px solid #6c63ff;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .materia.hecho span {
    text-decoration: line-through;
    color: gray;
    opacity: 0.7;
  }
  .toggle-btn {
    cursor: pointer;
    border: none;
    background: #6c63ff;
    color: white;
    padding: 6px 12px;
    border-radius: 4px;
    font-weight: bold;
  }
</style>
</head>
<body>

<h1>📚 Mi Plan de Estudio</h1>
<div id="materias"></div>

<script>
const materias = [
  { id: 1, name: "Plástica y Visión I", year: 1, correlativas: [] },
  { id: 2, name: "Tecnología digital I", year: 1, correlativas: [] },
  { id: 10, name: "Plástica y Visión II", year: 2, correlativas: [1] }
];

let progreso = JSON.parse(localStorage.getItem("progresoMaterias")) || {};

const contenedor = document.getElementById("materias");
contenedor.innerHTML = "";

materias.forEach(materia => {
  const div = document.createElement("div");
  div.className = "materia";
  if(progreso[materia.id]) div.classList.add("hecho");

  div.innerHTML = `
    <span>${materia.name}</span>
    <button class="toggle-btn">${progreso[materia.id] ? "✓ Hecho" : "Marcar"}</button>
  `;

  const btn = div.querySelector(".toggle-btn");
  btn.addEventListener("click", () => {
    if(progreso[materia.id]) {
      delete progreso[materia.id];
    } else {
      progreso[materia.id] = true;
    }
    localStorage.setItem("progresoMaterias", JSON.stringify(progreso));
    location.reload();
  });

  contenedor.appendChild(div);
});
</script>

</body>
</html>
