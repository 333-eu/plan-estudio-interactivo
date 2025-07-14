const topics = [
  { id: 1, name: "Introducción a la programación" },
  { id: 2, name: "Variables y Tipos de Datos" },
  { id: 3, name: "Condicionales y Bucles" },
  { id: 4, name: "Funciones" },
  { id: 5, name: "Estructuras de Datos" }
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
