// scriptregister.js
document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.getElementById('register-button');
    const statusMessage = document.getElementById('status-message');
    let users = JSON.parse(localStorage.getItem('users')) || []; // Cargar usuarios almacenados o iniciar vacío

    registerButton.addEventListener('click', function() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validación de campos
        if (!name || !email || !password) {
            showMessage('Por favor, completa todos los campos.', 'error');
            return;
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Por favor, ingresa un email válido.', 'error');
            return;
        }

        // Validación de contraseña (mínimo 6 caracteres, al menos una letra y un número)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
            showMessage('La contraseña debe tener al menos 6 caracteres, una letra y un número.', 'error');
            return;
        }

        // Verificar si el email ya está registrado
        if (users.some(user => user.email === email)) {
            showMessage('Este email ya está registrado.', 'error');
            return;
        }

        // Crear nuevo usuario
        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users)); // Guardar en localStorage

        // Mostrar mensaje de éxito y redirigir
        showMessage('Registro exitoso! Redirigiendo al login...', 'success');
        setTimeout(() => {
            window.location.href = 'login.html'; // Redirige al login tras 2 segundos
        }, 2000);
    });

    // Función para mostrar mensajes
    function showMessage(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = `status-message ${type}`;
        setTimeout(() => {
            statusMessage.textContent = '';
            statusMessage.className = 'status-message';
        }, 3000); // Ocultar mensaje después de 3 segundos
    }
});

// scriptregister.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('scriptregister.js cargado'); // Verificar que el script se carga

    const registerButton = document.getElementById('register-button');
    const statusMessage = document.getElementById('status-message');
    let users = JSON.parse(localStorage.getItem('users')) || [];

    registerButton.addEventListener('click', function() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        console.log('Intento de registro con email:', email); // Depuración

        // Validación de campos
        if (!name || !email || !password) {
            showMessage('Por favor, completa todos los campos.', 'error');
            return;
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Por favor, ingresa un email válido.', 'error');
            return;
        }

        // Validación de contraseña
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
            showMessage('La contraseña debe tener al menos 6 caracteres, una letra y un número.', 'error');
            return;
        }

        // Verificar si el email ya está registrado
        if (users.some(user => user.email === email)) {
            showMessage('Este email ya está registrado.', 'error');
            return;
        }

        // Crear nuevo usuario
        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Usuario registrado. Usuarios en localStorage:', localStorage.getItem('users')); // Depuración

        // Cerrar sesión si existía
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loggedInEmail');
        console.log('Sesión cerrada tras registro. isLoggedIn:', localStorage.getItem('isLoggedIn')); // Depuración

        // Mostrar mensaje de éxito y redirigir
        showMessage('Registro exitoso! Redirigiendo al login...', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });

    function showMessage(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = `status-message ${type}`;
        setTimeout(() => {
            statusMessage.textContent = '';
            statusMessage.className = 'status-message';
        }, 3000);
    }
});