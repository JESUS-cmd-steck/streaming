// scriptlogin.js
document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    const statusMessage = document.getElementById('status-message');
    const eyeIcon = document.querySelector('.eye-icon');
    const passwordInput = document.querySelector('input[type="password"]');
    let users = JSON.parse(localStorage.getItem('users')) || []; // Cargar usuarios almacenados o iniciar vacío

    loginButton.addEventListener('click', function() {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validación de campos
        if (!email || !password) {
            showMessage('Por favor, completa todos los campos.', 'error');
            return;
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Por favor, ingresa un email válido.', 'error');
            return;
        }

        // Verificar si el email y la contraseña coinciden con un usuario registrado
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            showMessage('Email o contraseña incorrectos.', 'error');
            return;
        }

        // Mostrar mensaje de éxito y redirigir
        showMessage('Login exitoso! Redirigiendo a la página principal...', 'success');
        setTimeout(() => {
            window.location.href = 'index.html'; // Redirige a la página principal tras 2 segundos
        }, 2000);
    });

    // Mostrar/ocultar contraseña con el ícono de ojo
    eyeIcon.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
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

document.addEventListener('DOMContentLoaded', function() {
    console.log('scriptlogin.js cargado'); // Verificar que el script se carga

    const loginButton = document.getElementById('login-button');
    const statusMessage = document.getElementById('status-message');
    const eyeIcon = document.querySelector('.eye-icon');
    const passwordInput = document.querySelector('input[type="password"]');
    let users = JSON.parse(localStorage.getItem('users')) || [];

    loginButton.addEventListener('click', function() {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        console.log('Intento de login con email:', email); // Depuración

        // Validación de campos
        if (!email || !password) {
            showMessage('Por favor, completa todos los campos.', 'error');
            return;
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Por favor, ingresa un email válido.', 'error');
            return;
        }

        // Verificar si el email y la contraseña coinciden con un usuario registrado
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            showMessage('Email o contraseña incorrectos.', 'error');
            return;
        }

        // Establecer sesión
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loggedInEmail', email);
        console.log('Sesión iniciada. isLoggedIn:', localStorage.getItem('isLoggedIn')); // Depuración
        console.log('loggedInEmail:', localStorage.getItem('loggedInEmail')); // Depuración

        // Mostrar mensaje de éxito y redirigir
        showMessage('Login exitoso! Redirigiendo a la página principal...', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });

    // Mostrar/ocultar contraseña con el ícono de ojo
    eyeIcon.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
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