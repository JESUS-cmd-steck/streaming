/// plans.js
document.addEventListener('DOMContentLoaded', function () {
    // Funcionalidad para el toggle Monthly/Annual
    const toggleButtons = document.querySelectorAll('.toggle-button');
    let currentPricing = 'monthly'; // Por defecto, mostrar precios mensuales

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentPricing = this.className.includes('monthly') ? 'monthly' : 'annual';
            updatePricing();
        });
    });

    // Función para actualizar los precios según Monthly/Annual
    function updatePricing() {
        const planCards = document.querySelectorAll('.plan-card');
        planCards.forEach(card => {
            const plan = card.getAttribute('data-plan');
            const priceElement = card.querySelector('.amount');
            if (currentPricing === 'annual') {
                // Aquí puedes ajustar los precios anuales (por ejemplo, multiplicar por 12 o usar precios personalizados)
                switch(plan) {
                    case 'basic':
                        priceElement.textContent = '$1188.00'; // Ejemplo: $99 * 12
                        break;
                    case 'standard':
                        priceElement.textContent = '$1800.00'; // Ejemplo: $150 * 12
                        break;
                    case 'platinum':
                        priceElement.textContent = '$2400.00'; // Ejemplo: $200 * 12
                        break;
                }
            } else {
                // Precios mensuales originales
                switch(plan) {
                    case 'basic':
                        priceElement.textContent = '$99.00';
                        break;
                    case 'standard':
                        priceElement.textContent = '$150.00';
                        break;
                    case 'platinum':
                        priceElement.textContent = '$200.00';
                        break;
                }
            }
        });
    }

    // Funcionalidad para los planes
    const planCards = document.querySelectorAll('.plan-card');

    planCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remover la clase 'selected' de todos los planes
            planCards.forEach(c => c.classList.remove('selected'));
            // Agregar la clase 'selected' al plan clicado
            this.classList.add('selected');
            
            // Obtener el plan seleccionado
            const plan = this.getAttribute('data-plan');
            alert(`Has seleccionado el plan ${plan} (${currentPricing}). ¡Proceder al pago o detalles!`);
            
            // Simulación: redirigir a una página de pago o mostrar un modal
            // Puedes descomentar y personalizar la siguiente línea:
            // window.location.href = `pago-${plan}-${currentPricing}.html`;
        });
    });

    // Inicializar los precios al cargar la página
    updatePricing();
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-button');
    const planCards = document.querySelectorAll('.plan-card');
    const selectPlanButtons = document.querySelectorAll('.select-plan-btn');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Manejar el toggle entre Monthly y Annual
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const period = this.getAttribute('data-period');
            updatePrices(period);
        });
    });

    // Actualizar precios según el período
    function updatePrices(period) {
        const amounts = document.querySelectorAll('.amount');
        amounts.forEach(amount => {
            const monthlyPrice = amount.getAttribute('data-monthly');
            const annualPrice = amount.getAttribute('data-annual');
            amount.textContent = period === 'annual' ? annualPrice : monthlyPrice;
            amount.parentElement.querySelector('.per-month').textContent = period === 'annual' ? '/ año' : '/ mes';
        });
    }

    // Manejar la selección de un plan
    selectPlanButtons.forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.getAttribute('data-plan');
            const loggedInEmail = localStorage.getItem('loggedInEmail');
            const loggedInUser = users.find(user => user.email === loggedInEmail);

            if (!isLoggedIn || !loggedInUser) {
                alert('Por favor, inicia sesión para seleccionar un plan.');
                window.location.href = 'login.html';
                return;
            }

            // Simular selección y guardar en localStorage
            const activePeriod = document.querySelector('.toggle-button.active').getAttribute('data-period');
            const selectedPrice = document.querySelector(`.plan-card[data-plan="${plan}"] .amount`).textContent;
            localStorage.setItem('selectedPlan', JSON.stringify({ plan, period: activePeriod, price: selectedPrice }));
            alert(`Has seleccionado el plan ${plan} por ${selectedPrice} (${activePeriod}). Redirigiendo a confirmación...`);
            setTimeout(() => {
                window.location.href = 'confirmation.html'; // Redirige a una página de confirmación (crea esta página si es necesario)
            }, 2000);
        });
    });

    // Inicializar con precios mensuales
    updatePrices('monthly');
});