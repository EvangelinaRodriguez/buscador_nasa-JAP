// Obtener los elementos de HTML
const inputBuscar = document.getElementById("inputBuscar");
const contenedor = document.getElementById("contenedor");

// Función para realizar la búsqueda en la API
async function buscarImagenes() {
  const query = inputBuscar.value.trim();
  
  if (!query) {
    alert("Por favor, ingresa un término de búsqueda.");
    return;
  }

  const url = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const items = data.collection.items;

    contenedor.innerHTML = "";

    if (items.length === 0) {
      contenedor.innerHTML = "<p>No se encontraron imágenes para la búsqueda.</p>";
      return;
    }

    items.forEach(item => {
      const { title, description, date_created } = item.data[0];
      const imageUrl = item.links ? item.links[0].href : "";

      const card = document.createElement("div");
      card.className = "card mb-3";
      card.style.width = "18rem";

      card.innerHTML = `
        <img src="${imageUrl}" class="card-img-top" alt="${title}">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description || "Sin descripción disponible"}</p>
          <p class="card-text"><small class="text-muted">Fecha: ${new Date(date_created).toLocaleDateString()}</small></p>
        </div>
      `;

      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error al buscar imágenes:", error);
    contenedor.innerHTML = "<p>Hubo un problema al obtener los datos. Inténtalo de nuevo más tarde.</p>";
  }
}

// Asocia el evento de clic al botón
document.getElementById("btnBuscar").addEventListener("click", buscarImagenes);
