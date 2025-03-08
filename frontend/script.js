// Obtener elementos del DOM
const loginForm = document.getElementById('login-form');
const registerButton = document.getElementById('register-button');

// Evento para el formulario de inicio de sesión
if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const storedEmail = localStorage.getItem('emailUsuario');
        const storedPassword = localStorage.getItem('passwordUsuario');

        if (email === storedEmail && password === storedPassword) {
            alert('Inicio de sesión exitoso');
            window.location.href = 'frontend/dashboard.html'; // Redirige sin parámetros
        } else {
            alert('Credenciales incorrectas');
        }
    });
}

// Obtener elementos del DOM
const registroForm = document.getElementById('registro-form');
const registroFormInterno = document.getElementById('registro-form-interno');
const cancelarRegistro = document.getElementById('cancelar-registro');

// Evento para el botón de registro
if (registerButton) {
    registerButton.addEventListener('click', () => {
        registroForm.style.display = 'block'; // Mostrar el formulario
    });
}

// Evento para cancelar el registro
if (cancelarRegistro) {
    cancelarRegistro.addEventListener('click', () => {
        registroForm.style.display = 'none'; // Ocultar el formulario
    });
}

// Evento para el formulario de registro
if (registroFormInterno) {
    registroFormInterno.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        const nombre = document.getElementById('registro-nombre').value; // ID corregido
        const email = document.getElementById('registro-email').value; // ID corregido
        const password = document.getElementById('registro-password').value; // ID corregido

        if (nombre && email && password) {
            localStorage.setItem('nombreUsuario', nombre);
            localStorage.setItem('emailUsuario', email);
            localStorage.setItem('passwordUsuario', password);

            alert('Registro exitoso');
            registroForm.style.display = 'none';
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
}

// Obtener elementos del DOM
const administrarTarjetasButton = document.getElementById('administrar-tarjetas-button');
const registrarCompraButton = document.getElementById('registrar-compra-button');
const simuladorButton = document.getElementById('simular-button');
const cerrarSesionButton = document.getElementById('cerrar-sesion');

// Obtener correo del usuario
function getEmail() {
    const emailUsuario = localStorage.getItem('emailUsuario'); // Recupera el email de localStorage
    const userEmail = document.getElementById('user-email');

    if (userEmail) { // Verifica si el elemento existe
        if (emailUsuario) {
            userEmail.textContent = emailUsuario;
        } else {
            userEmail.textContent = 'Usuario no identificado';
        }
    }
}
getEmail();

// Eventos para los botones
if (administrarTarjetasButton) {
    administrarTarjetasButton.addEventListener('click', () => {
        window.location.href = 'administrar_tarjetas.html';
    });
}

if (registrarCompraButton) {
    registrarCompraButton.addEventListener('click', () => {
        window.location.href = 'registrar_compra.html';
    });
}

if (simuladorButton) {
    simuladorButton.addEventListener('click', () => {
        window.location.href = 'simulador.html';
    });
}

if (cerrarSesionButton) {
    cerrarSesionButton.addEventListener('click', () => {
        localStorage.removeItem('emailUsuario'); // Elimina el email de localStorage al cerrar sesión
        localStorage.removeItem('passwordUsuario'); // Elimina la contraseña de localStorage al cerrar sesión
        window.location.href = '/'; // Redirige a la página de inicio
    });
}

// Obtener elementos del DOM
const tarjetasContainer = document.getElementById('tarjetas-container');
const agregarTarjetaButton = document.getElementById('agregar-tarjeta');

// Obtener tarjetas del usuario (simulado con localStorage)
function getTarjetas() {
    if (tarjetasContainer) { // Verifica si el elemento existe
        const tarjetas = JSON.parse(localStorage.getItem('tarjetas')) || []; // Obtiene las tarjetas de localStorage o crea un array vacío
        tarjetasContainer.innerHTML = ''; // Limpia el contenedor de tarjetas
        tarjetas.forEach((tarjeta) => {
            const tarjetaDiv = document.createElement('div');
            tarjetaDiv.textContent = `Tarjeta: ${tarjeta.numero}, Fecha de corte: ${tarjeta.fecha_corte}, Monto: ${tarjeta.monto}`;
            tarjetasContainer.appendChild(tarjetaDiv);
        });
    }
}
getTarjetas();

// Evento para el botón Agregar Tarjeta
if (agregarTarjetaButton) {
    agregarTarjetaButton.addEventListener('click', () => {
        // Simulación de agregar una tarjeta (puedes agregar un formulario real)
        const numero = prompt('Número de tarjeta:');
        const fecha_corte = prompt('Fecha de corte:');
        const monto = prompt('Monto:');

        if (numero && fecha_corte && monto) {
            const tarjetas = JSON.parse(localStorage.getItem('tarjetas')) || [];
            tarjetas.push({ numero, fecha_corte, monto });
            localStorage.setItem('tarjetas', JSON.stringify(tarjetas));
            getTarjetas(); // Actualiza la lista de tarjetas
        }
    });
}

// Obtener elementos del DOM
const compraForm = document.getElementById('compra-form');

// Evento para el formulario de registro de compra (simulado)
if (compraForm) {
    compraForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const monto = document.getElementById('monto').value;
        const plazo = document.getElementById('plazo').value;
        const interes = document.getElementById('interes').value;

        alert('Compra registrada (simulado)');
    });
}
