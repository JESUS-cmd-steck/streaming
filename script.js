document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');
    const welcomeMessage = document.getElementById('welcome-message');
    const authContainer = document.getElementById('auth-container');

    // Estado de autenticación desde localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    const loggedInUser = users.find(user => user.email === loggedInEmail);

    // Función para actualizar la interfaz
    function updateAuthUI() {
        if (isLoggedIn && loggedInUser) {
            loginButton.style.display = 'none';
            logoutButton.style.display = 'inline-block';
            welcomeMessage.style.display = 'inline';
            welcomeMessage.textContent = `Bienvenido, ${loggedInUser.name}`;
        } else {
            loginButton.style.display = 'inline-block';
            logoutButton.style.display = 'none';
            welcomeMessage.style.display = 'none';
            welcomeMessage.textContent = '';
        }
    }

    // Aplicar estado inicial
    updateAuthUI();

    // Manejar logout
    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('isLoggedIn'); // Elimina el estado de logueado
        localStorage.removeItem('loggedInEmail'); // Elimina el email del usuario
        updateAuthUI(); // Actualiza la interfaz al estado inicial
        alert('¡Has cerrado sesión exitosamente!'); // Mensaje opcional
        // No redirigimos, simplemente dejamos la página en su estado inicial
    });

    // Manejar login (redirige a register.html)
    loginButton.addEventListener('click', function (e) {
        e.preventDefault(); // Evita el comportamiento por defecto del enlace
        window.location.href = 'register.html'; // Redirige a la página de inicio de sesión
    });

    // Configuración de Swiper para categories-swiper
    const categoriesSwiper = new Swiper('.categories-swiper', {
        slidesPerView: 5,
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: { slidesPerView: 2, spaceBetween: 10 },
            480: { slidesPerView: 3, spaceBetween: 15 },
            640: { slidesPerView: 4, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 20 },
        },
    });

    // Configuración de Swiper para second-swiper
    const secondSwiper = new Swiper('.second-swiper', {
        slidesPerView: 5,
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: { slidesPerView: 2, spaceBetween: 10 },
            480: { slidesPerView: 3, spaceBetween: 15 },
            640: { slidesPerView: 4, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 20 },
        },
    });
});