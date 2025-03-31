// ID de tu hoja de Google Sheets
const sheetId = "1EDvVcLqVJro8EUkuYeCOVnXz2qWH3IWc0IJ0rWpys64";

// URL de la hoja con el formato adecuado para obtener datos en JSON
const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

// Función para obtener los datos de Google Sheets
async function fetchData() {
    try {
        // Realizamos la solicitud al API de Google Sheets
        const response = await fetch(sheetUrl);
        const text = await response.text();
        
        // Limpiamos la respuesta JSON
        const json = JSON.parse(text.substr(47).slice(0, -2)); // Limpia la respuesta JSON

        // Procesamos las filas de la hoja de cálculo
        const data = json.table.rows.map(row => ({
            nombre: row.c[0].v, // Columna A - Nombre
            enlace: row.c[1].v, // Columna B - Enlace
            tipo: row.c[2].v     // Columna C - Tipo
        }));

        // Llamamos a la función para mostrar los datos
        displayData(data);
    } catch (error) {
        console.error("Error al obtener datos de Google Sheets:", error);
    }
}

// Función para mostrar los datos obtenidos
function displayData(data) {
    // Elemento donde se mostrarán los datos
    const container = document.getElementById("file-container");
    container.innerHTML = ""; // Limpiamos el contenedor antes de agregar nuevos elementos

    // Recorrer los datos y agregar los elementos al contenedor
    data.forEach(item => {
        const div = document.createElement("div");
        div.className = "file-item"; // Clase para los elementos de archivo
        div.innerHTML = `
            <p><strong>${item.nombre}</strong></p>
            <a href="${item.enlace}" target="_blank">Abrir ${item.tipo}</a>
        `;
        container.appendChild(div);
    });
}

// Cargar los datos al cargar la página
document.addEventListener("DOMContentLoaded", fetchData);

