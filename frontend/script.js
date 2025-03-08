// Obtener elementos del DOM
const loginForm = document.getElementById('login-form');
const registerButton = document.getElementById('register-button');

// Evento para el formulario de inicio de sesión
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

// Obtener elementos del DOM
const registroForm = document.getElementById('registro-form');
const registroFormInterno = document.getElementById('registro-form-interno');
const cancelarRegistro = document.getElementById('cancelar-registro');

// Evento para el botón de registro
registerButton.addEventListener('click', () => {
  registroForm.style.display = 'block'; // Mostrar el formulario
});

// Evento para cancelar el registro
cancelarRegistro.addEventListener('click', () => {
  registroForm.style.display = 'none'; // Ocultar el formulario
});

// Evento para el formulario de registro
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

// ... (resto de tu código) ...

// Obtener elementos del DOM
const userEmail = document.getElementById('user-email');
const administrarTarjetasButton = document.getElementById('administrar-tarjetas');
const registrarCompraButton = document.getElementById('registrar-compra');
const simuladorButton = document.getElementById('simular-button');
const cerrarSesionButton = document.getElementById('cerrar-sesion');

// Obtener correo del usuario
function getEmail() {
  const emailUsuario = localStorage.getItem('emailUsuario'); // Recupera el email de localStorage
  if (emailUsuario) {
    userEmail.textContent = emailUsuario;
  } else {
    userEmail.textContent = 'Usuario no identificado';
  }
}
getEmail();

// Eventos para los botones



// Recuperar datos de localStorage
const email = localStorage.getItem('emailUsuario');

// Mostrar datos en la página
  if (email) {
    document.getElementById('email-usuario').textContent = `Correo electrónico: ${email}`;
  } else {
    document.getElementById('email-usuario').textContent = "Correo electrónico no disponible";
  }




administrarTarjetasButton.addEventListener('click', () => {
  window.location.href = 'frontend/administrar_tarjetas.html';
});
registrarCompraButton.addEventListener('click', () => {
  window.location.href = 'frontend/registrar_compra.html';
});
simuladorButton.addEventListener('click', () => {
  window.location.href = 'frontend/simulador.html';
});

cerrarSesionButton.addEventListener('click', () => {
  localStorage.removeItem('emailUsuario'); // Elimina el email de localStorage al cerrar sesión
  localStorage.removeItem('passwordUsuario'); // Elimina la contraseña de localStorage al cerrar sesión
  window.location.href = '/'; // Redirige a la página de inicio
});

// Obtener elementos del DOM
const tarjetasContainer = document.getElementById('tarjetas-container');
const agregarTarjetaButton = document.getElementById('agregar-tarjeta');

// Obtener tarjetas del usuario (simulado con localStorage)
function getTarjetas() {
  const tarjetas = JSON.parse(localStorage.getItem('tarjetas')) || []; // Obtiene las tarjetas de localStorage o crea un array vacío
  tarjetasContainer.innerHTML = ''; // Limpia el contenedor de tarjetas
  tarjetas.forEach((tarjeta) => {
    const tarjetaDiv = document.createElement('div');
    tarjetaDiv.textContent = `Tarjeta: ${tarjeta.numero}, Fecha de corte: ${tarjeta.fecha_corte}, Monto: ${tarjeta.monto}`;
    tarjetasContainer.appendChild(tarjetaDiv);
  });
}
getTarjetas();

// Evento para el botón Agregar Tarjeta
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

// Obtener elementos del DOM
const compraForm = document.getElementById('compra-form');

// Evento para el formulario de registro de compra (simulado)
compraForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const monto = document.getElementById('monto').value;
  const plazo = document.getElementById('plazo').value;
  const interes = document.getElementById('interes').value;

  alert('Compra registrada (simulado)');
});

// Obtener elementos del DOM
const simuladorForm = document.getElementById('simulador-form');
const resultadosSim = document.getElementById('resultados-sim');

// Evento para el formulario del simulador (simulado)
simuladorForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const monto = document.getElementById('monto-sim').value;
  const plazo = document.getElementById('plazo-sim').value;
  const interes = document.getElementById('interes-sim').value;

  const pago_mensual = (monto * (interes / 100)) / (1 - Math.pow(1 + (interes / 100), -plazo));
  const total_deuda = pago_mensual * plazo;
  const intereses = total_deuda - monto;

  resultadosSim.innerHTML = `
    <p>Pago mensual: ${pago_mensual.toFixed(2)}</p>
    <p>Total de deuda: ${total_deuda.toFixed(2)}</p>
    <p>Intereses: ${intereses.toFixed(2)}</p>
  `;
});
