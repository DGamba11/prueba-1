// Usuarios con permisos
const users = {
    "admin": { password: "admin123", role: "admin" }, // Puede subir archivos
    "empleado": { password: "empleado123", role: "viewer" } // Solo puede visualizar
};

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (users[username] && users[username].password === password) {
        localStorage.setItem("user", JSON.stringify({ username, role: users[username].role }));
        localStorage.setItem("loggedIn", "true"); // Agrega esto para que index.html lo detecte
        window.location.href = "index.html"; // Redirigir a la página principal
    } else {
        errorMessage.textContent = "Usuario o contraseña incorrectos.";
    }
}


function checkAuth() {
    const user = localStorage.getItem("user");

    if (!user) {
        window.location.href = "login.html"; // Si no está autenticado, redirigir a login
    } else {
        try {
            const userData = JSON.parse(user);
            if (!userData.username || !userData.role) {
                throw new Error("Datos corruptos en localStorage");
            }
        } catch (error) {
            console.error("Error en autenticación:", error);
            localStorage.clear();
            window.location.href = "login.html";
        }
    }
}

function logout() {
    localStorage.removeItem("user");
    setTimeout(() => {
        window.location.href = "login.html";
    }, 500);
}

// Verifica autenticación al cargar cualquier página protegida
document.addEventListener("DOMContentLoaded", checkAuth);
