const materias = [
  // Primer Año
  { id: 1, name: "Plástica y Visión I", year: 1, correlativas: [] },
  { id: 2, name: "Tecnología digital I", year: 1, correlativas: [] },
  { id: 3, name: "Historia del arte y el diseño I", year: 1, correlativas: [] },
  { id: 4, name: "Lenguaje y comunicación visual I", year: 1, correlativas: [] },
  { id: 5, name: "Filosofía", year: 1, correlativas: [] },
  { id: 6, name: "Inglés técnico", year: 1, correlativas: [] },
  { id: 7, name: "Taller de arte y diseño digital I", year: 1, correlativas: [] },
  { id: 8, name: "Audiovisión I", year: 1, correlativas: [] },
  { id: 9, name: "Tipografía I", year: 1, correlativas: [] },

  // Segundo Año
  { id: 10, name: "Plástica y Visión II", year: 2, correlativas: [1] },
  { id: 11, name: "Tecnología digital II", year: 2, correlativas: [2] },
  { id: 12, name: "Historia del arte y el diseño II", year: 2, correlativas: [3] },
  { id: 13, name: "Introducción al marketing", year: 2, correlativas: [] },
  { id: 14, name: "Teología", year: 2, correlativas: [] },
  { id: 15, name: "Metodología de la investigación en arte y diseño", year: 2, correlativas: [] },
  { id: 16, name: "Taller de arte y diseño digital II", year: 2, correlativas: [7] },
  { id: 17, name: "Audiovisión II", year: 2, correlativas: [8] },
  { id: 18, name: "Imagen y composición digital I", year: 2, correlativas: [] },
  { id: 19, name: "Diseño multimedial I", year: 2, correlativas: [] },

  // Tercer Año 
  { id: 20, name: "Programación audiovisual I", year: 3, correlativas: [] },
  { id: 21, name: "Diseño 3D I", year: 3, correlativas: [] },
  { id: 22, name: "Animación y edición multimedial I", year: 3, correlativas: [] },
  { id: 23, name: "Seminario I", year: 3, correlativas: [] },
  { id: 24, name: "Diseño y desarrollo de videojuegos I", year: 3, correlativas: [] },
  { id: 25, name: "Arte interactivo I", year: 3, correlativas: [] },
  { id: 26, name: "Taller de arte y diseño digital III", year: 3, correlativas: [16] },
  { id: 27, name: "Imagen y composición digital II", year: 3, correlativas: [18] },
  { id: 28, name: "Ética", year: 3, correlativas: [] },

  // Cuarto Año
  { id: 29, name: "Programación audiovisual II", year: 4, correlativas: [20] },
  { id: 30, name: "Diseño 3D II", year: 4, correlativas: [21] },
  { id: 31, name: "Animación y edición multimedial II", year: 4, correlativas: [22] },
  { id: 32, name: "Seminario II (arte)", year: 4, correlativas: [23] },
  { id: 33, name: "Diseño y desarrollo de videojuegos II", year: 4, correlativas: [24] },
  { id: 34, name: "Arte interactivo II", year: 4, correlativas: [25] },
  { id: 35, name: "Taller de arte y diseño digital IV", year: 4, correlativas: [26] },
  { id: 36, name: "Seminario III (técnica)", year: 4, correlativas: [23] },
  { id: 37, name: "Seminario de integración-trabajo final", year: 4, correlativas: [23, 32, 36] }
];

let progreso = JSON.parse(localStorage.getItem("progresoMaterias")) || {};

const contenedor = document.getElementById("materias");

function estaDesbloqueada(materia) {
  if (materia.correlativas.length === 0) return true;
  return materia.correlativas.every((id) => progreso[id]);
}

function renderizarMaterias() {
  contenedor.innerHTML = "";

  // Agrupar materias por año
  const materiasPorAño = {};
  materias.forEach((m) => {
    if (!materiasPorAño[m.year]) materiasPorAño[m.year] = [];
    materiasPorAño[m.year].push(m);
  });

  for (let año in materiasPorAño) {
    const añoDiv = document.createElement("div");
    añoDiv.className = "año";
    añoDiv.innerHTML = `<h2>Año ${año}</h2>`;

    materiasPorAño[año].forEach((materia) => {
      const div = document.createElement("div");
      div.className = "materia";

      // Marcar si ya está hecha
      if (progreso[materia.id]) div.classList.add("hecho");

      // Ver si está desbloqueada
      const desbloqueada = estaDesbloqueada(materia);
      if (!desbloqueada) div.classList.add("bloqueada");

      div.innerHTML = `
        <span>${materia.name}</span>
        <button class="toggle-btn" ${!desbloqueada ? "disabled" : ""}>
          ${progreso[materia.id] ? "✓ Hecho" : "Marcar"}
        </button>
      `;

      const btn = div.querySelector(".toggle-btn");
      btn.addEventListener("click", () => {
        if (progreso[materia.id]) {
          delete progreso[materia.id];
        } else {
          progreso[materia.id] = true;
        }
        localStorage.setItem("progresoMaterias", JSON.stringify(progreso));
        renderizarMaterias();
      });

      añoDiv.appendChild(div);
    });

    contenedor.appendChild(añoDiv);
  }
}

renderizarMaterias();
