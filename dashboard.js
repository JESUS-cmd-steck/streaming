document.addEventListener('DOMContentLoaded', function() {
    const welcomeMessage = document.getElementById('welcome-message');
    const logoutButton = document.getElementById('logout-button');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // Verificar autenticación
    if (isLoggedIn) {
        const loggedInEmail = localStorage.getItem('loggedInEmail');
        const loggedInUser = users.find(user => user.email === loggedInEmail);
        if (loggedInUser) {
            welcomeMessage.textContent = `Bienvenido, ${loggedInUser.name}`;
        } else {
            window.location.href = 'login.html';
        }
    } else {
        window.location.href = 'login.html';
    }

    // Manejar logout
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loggedInEmail');
        window.location.href = 'login.html';
    });

    // Inicializar Swiper para el banner
    const heroSwiper = new Swiper('.hero-swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });
});

// Alternar visibilidad del dropdown de géneros
function toggleGenres() {
    const genreBtn = document.querySelector('.genre-btn');
    genreBtn.classList.toggle('active');
    
    // Cerrar el dropdown si se hace clic fuera
    document.addEventListener('click', function closeDropdown(e) {
        if (!genreBtn.contains(e.target)) {
            genreBtn.classList.remove('active');
            document.removeEventListener('click', closeDropdown);
        }
    });
}

function filterByGenre(genre) {
    resetNavButtons();
    document.querySelector('.genre-btn').classList.add('active');

    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.style.display = 'none'); // Ocultar todas las secciones inicialmente

    const cards = document.querySelectorAll('.content-card');
    let hasMatches = false;

    cards.forEach(card => {
        const onclickAttr = card.getAttribute('onclick');
        if (onclickAttr) {
            // Extraer el género del atributo onclick
            const genreMatch = onclickAttr.match(/'• ([^']+)'/);
            const cardGenre = genreMatch ? genreMatch[1] : '';
            // Dividir géneros múltiples en un array y verificar si incluye el género seleccionado
            const genres = cardGenre.split(',').map(g => g.trim().toLowerCase());
            if (genres.includes(genre.toLowerCase())) {
                card.closest('.content-section').style.display = 'block';
                card.style.display = 'block';
                hasMatches = true;
            } else {
                card.style.display = 'none';
            }
        }
    });

    if (!hasMatches) {
        alert(`No se encontraron películas o series en el género "${genre}".`);
    }

    // Cerrar el dropdown después de seleccionar un género
    document.querySelector('.genre-btn').classList.remove('active');
}

// Reemplazar la función showGenres original
function showGenres() {
    toggleGenres(); // Ahora solo alterna el dropdown
}

// Abrir el modal
function openModal(videoSrc, title) {
    const modal = document.getElementById('videoModal');
    const videoSource = document.getElementById('videoSource');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.getElementById('video-header-title');

    videoSource.src = videoSrc;
    videoTitle.textContent = title;
    videoPlayer.load();
    modal.style.display = 'flex';
}

// Cerrar el modal
function closeModal() {
    const modal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.pause();
    modal.style.display = 'none';
}

// Controles del Reproductor
const videoPlayer = document.getElementById('videoPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const rewindBtn = document.getElementById('rewindBtn');
const forwardBtn = document.getElementById('forwardBtn');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');

videoPlayer.addEventListener('loadedmetadata', () => {
    duration.textContent = formatTime(videoPlayer.duration);
    progress.max = videoPlayer.duration;
});

videoPlayer.addEventListener('timeupdate', () => {
    progress.value = videoPlayer.currentTime;
    currentTime.textContent = formatTime(videoPlayer.currentTime);
});

playPauseBtn.addEventListener('click', () => {
    if (videoPlayer.paused) {
        videoPlayer.play();
        playPauseBtn.textContent = '⏸️';
    } else {
        videoPlayer.pause();
        playPauseBtn.textContent = '▶️';
    }
});

rewindBtn.addEventListener('click', () => {
    videoPlayer.currentTime -= 10;
});

forwardBtn.addEventListener('click', () => {
    videoPlayer.currentTime += 10;
});

progress.addEventListener('input', () => {
    videoPlayer.currentTime = progress.value;
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}