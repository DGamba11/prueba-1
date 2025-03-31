const sheetId = "1EDvVcLqVJro8EUkuYeCOVnXz2qWH3IWc0IJ0rWpys64";
const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

async function fetchData() {
    try {
        const response = await fetch(sheetUrl);
        const text = await response.text();
        const json = JSON.parse(text.substr(47).slice(0, -2)); // Limpia la respuesta JSON

        const data = json.table.rows.map(row => ({
            nombre: row.c[0].v, // Columna A - Nombre
            enlace: row.c[1].v, // Columna B - Enlace
            tipo: row.c[2].v     // Columna C - Tipo
        }));

        displayData(data);
    } catch (error) {
        console.error("Error al obtener datos de Google Sheets:", error);
    }
}

function displayData(data) {
    const container = document.getElementById("file-container");
    container.innerHTML = ""; // Limpia antes de agregar nuevos elementos

    data.forEach(item => {
        const div = document.createElement("div");
        div.className = "file-item";
        div.innerHTML = `
            <p><strong>${item.nombre}</strong></p>
            <a href="${item.enlace}" target="_blank">Abrir ${item.tipo}</a>
        `;
        container.appendChild(div);
    });
}

// Cargar los datos al cargar la página
document.addEventListener("DOMContentLoaded", fetchData);
