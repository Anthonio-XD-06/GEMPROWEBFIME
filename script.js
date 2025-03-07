// Obtener elementos del DOM
const loginForm = document.getElementById('login-form');
const registerButton = document.getElementById('register-button');

// Evento para el formulario de inicio de sesión
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (response.ok) {
            window.location.href = '/dashboard';
        } else {
            alert('Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Evento para el botón de registro
registerButton.addEventListener('click', () => {
    // Redirigir a una página de registro o mostrar un formulario de registro
    // (Depende de cómo quieras manejar el registro)
});








// Obtener elementos del DOM
const userEmail = document.getElementById('user-email');
const administrarTarjetasButton = document.getElementById('administrar-tarjetas');
const registrarCompraButton = document.getElementById('registrar-compra');
const simuladorButton = document.getElementById('simulador');
const cerrarSesionButton = document.getElementById('cerrar-sesion');

// Obtener correo del usuario
async function getEmail() {
    try {
        const response = await fetch('/get_email');
        const data = await response.json();
        userEmail.textContent = data.email;
    } catch (error) {
        console.error('Error:', error);
    }
}
getEmail();

// Eventos para los botones
administrarTarjetasButton.addEventListener('click', () => {
    window.location.href = '/administrar_tarjetas';
});
registrarCompraButton.addEventListener('click', () => {
    window.location.href = '/registrar_compra';
});
simuladorButton.addEventListener('click', () => {
    window.location.href = '/simulador';
});
cerrarSesionButton.addEventListener('click', async () => {
    try {
        await fetch('/logout');
        window.location.href = '/';
    } catch (error) {
        console.error('Error:', error);
    }
});





// Obtener elementos del DOM
const tarjetasContainer = document.getElementById('tarjetas-container');
const agregarTarjetaButton = document.getElementById('agregar-tarjeta');

// Obtener tarjetas del usuario
async function getTarjetas() {
    try {
        const response = await fetch('/get_tarjetas');
        const tarjetas = await response.json();
        // Mostrar las tarjetas en el contenedor
        tarjetas.forEach(tarjeta => {
            const tarjetaDiv = document.createElement('div');
            tarjetaDiv.textContent = `Tarjeta: ${tarjeta.numero}, Fecha de corte: ${tarjeta.fecha_corte}, Monto: ${tarjeta.monto}`;
            tarjetasContainer.appendChild(tarjetaDiv);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
getTarjetas();

// Evento para el botón Agregar Tarjeta
agregarTarjetaButton.addEventListener('click', () => {
    // Mostrar un formulario para agregar una nueva tarjeta
    // (Depende de cómo quieras manejar la adición de tarjetas)
});






// Obtener elementos del DOM
const compraForm = document.getElementById('compra-form');

// Evento para el formulario de registro de compra
compraForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const monto = document.getElementById('monto').value;
    const plazo = document.getElementById('plazo').value;
    const interes = document.getElementById('interes').value;

    try {
        await fetch('/registrar_compra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ monto, plazo, interes })
        });
        alert('Compra registrada');
    } catch (error) {
        console.error('Error:', error);
    }
});



// Obtener elementos del DOM
const simuladorForm = document.getElementById('simulador-form');
const resultadosSim = document.getElementById('resultados-sim');

// Evento para el formulario del simulador
simuladorForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const monto = document.getElementById('monto-sim').value;
    const plazo = document.getElementById('plazo-sim').value;
    const interes = document.getElementById('interes-sim').value;

    try {
        const response = await fetch('/simulador', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ monto, plazo, interes })
        });
        const resultados = await response.json();
        // Mostrar los resultados en la página
        resultadosSim.innerHTML = `
            <p>Pago mensual: ${resultados.pago_mensual}</p>
            <p>Total de deuda: ${resultados.total_deuda}</p>
            <p>Intereses: ${resultados.intereses}</p>
        `;
    } catch (error) {
        console.error('Error:', error);
    }
});


