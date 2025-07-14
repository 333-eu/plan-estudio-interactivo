const materias = [
  // Año 1
  { id: 1, name: "Plástica y Visión I", year: 1, correlativas: [] },
  { id: 2, name: "Tecnología digital I", year: 1, correlativas: [] },
  { id: 3, name: "Historia del arte y el diseño I", year: 1, correlativas: [] },
  { id: 4, name: "Lenguaje y comunicación visual I", year: 1, correlativas: [] },
  { id: 5, name: "Filosofía", year: 1, correlativas: [] },
  { id: 6, name: "Inglés técnico", year: 1, correlativas: [] },
  { id: 7, name: "Taller de arte y diseño digital I", year: 1, correlativas: [] },
  { id: 8, name: "Audiovisión I", year: 1, correlativas: [] },
  { id: 9, name: "Tipografía I", year: 1, correlativas: [] },

  // Año 2
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

  // Año 3
  { id: 20, name: "Programación audiovisual I", year: 3, correlativas: [] },
  { id: 21, name: "Diseño 3D I", year: 3, correlativas: [] },
  { id: 22, name: "Animación y edición multimedial I", year: 3, correlativas: [] },
  { id: 23, name: "Seminario I", year: 3, correlativas: [] },
  { id: 24, name: "Diseño y desarrollo de videojuegos I", year: 3, correlativas: [] },
  { id: 25, name: "Arte interactivo I", year: 3, correlativas: [] },
  { id: 26, name: "Taller de arte y diseño digital III", year: 3, correlativas: [16] },
  { id: 27, name: "Imagen y composición digital II", year: 3, correlativas: [18] },
  { id: 28, name: "Ética", year: 3, correlativas: [] },

  // Año 4
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

let progress = JSON.parse(localStorage.getItem("studyProgress")) || {};

const container = document.getElementById("study-plan");

topics.forEach(topic => {
  const card = document.createElement("div");
  card.className = "card";
  if (progress[topic.id]) card.classList.add("done");

  card.innerHTML = `
    <h3>${topic.name}</h3>
    <button>${progress[topic.id] ? "Completado ✅" : "Marcar como hecho"}</button>
  `;

  const button = card.querySelector("button");
  button.addEventListener("click", () => {
    progress[topic.id] = !progress[topic.id];
    localStorage.setItem("studyProgress", JSON.stringify(progress));
    location.reload();
  });

  container.appendChild(card);
});
