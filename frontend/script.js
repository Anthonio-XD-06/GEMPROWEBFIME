

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";



// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyD7cUNhq1-tF-oeht0MmvlydTU-4LNf7_g",
authDomain: "prowebfimeproyecto.firebaseapp.com",
projectId: "prowebfimeproyecto",
storageBucket: "prowebfimeproyecto.firebasestorage.app",
messagingSenderId: "1088588778289",
appId: "1:1088588778289:web:55b92b8de5c654f620fe10",
measurementId: "G-YHB1RK6D7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Obtener elementos del DOM
const loginForm = document.getElementById('login-form');
const registerButton = document.getElementById('register-button');



import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// Evento para el formulario de inicio de sesión
if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const auth = getAuth(); // Obtén la instancia de auth

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Inicio de sesión exitoso
                const user = userCredential.user;
                console.log("Usuario inició sesión:", user);
                alert('Inicio de sesión exitoso');
                window.location.href = 'frontend/dashboard.html'; // Redirige al dashboard
            })
            .catch((error) => {
                // Error al iniciar sesión
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error al iniciar sesión:", errorCode, errorMessage);
                alert('Credenciales incorrectas o error al iniciar sesión. Inténtalo de nuevo.');
            });
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


import { collection, addDoc } from "firebase/firestore";

// Evento para el formulario de registro
if (registroFormInterno) {
    registroFormInterno.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nombre = document.getElementById('registro-nombre').value;
        const email = document.getElementById('registro-email').value;
        const password = document.getElementById('registro-password').value;

        if (nombre && email && password) {
            const auth = getAuth(); // Obtén la instancia de auth

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Registro exitoso
                    const user = userCredential.user;
                    console.log("Usuario registrado:", user);

                    // Guarda información adicional en Firestore
                    addDoc(collection(db, "usuarios"), {
                        uid: user.uid, // Guarda el UID del usuario
                        nombre: nombre,
                        email: email,
                    })
                    .then(() => {
                        alert('Registro exitoso');
                        registroForm.style.display = 'none';
                    })
                    .catch((error) => {
                        console.error("Error al guardar datos en Firestore:", error);
                        alert('Registro exitoso, pero hubo un error al guardar los datos adicionales.');
                    });
                })
                .catch((error) => {
                    // Error al registrar usuario
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Error al registrar usuario:", errorCode, errorMessage);
                    alert('Error al registrar usuario. Inténtalo de nuevo.');
                });
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


import { collection, query, where, getDocs } from "firebase/firestore";

async function getEmail() { // Agrega async
    const emailUsuario = document.getElementById('user-email').textContent; // Obtén el email del elemento
    const userEmailElement = document.getElementById('user-email');

    if (userEmailElement && emailUsuario) {
        try {
            const usuariosRef = collection(db, "usuarios");
            const q = query(usuariosRef, where("email", "==", emailUsuario));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    const usuario = doc.data();
                    userEmailElement.textContent = usuario.nombre; // Muestra el nombre
                });
            } else {
                userEmailElement.textContent = 'Usuario no identificado';
            }
        } catch (error) {
            console.error("Error al obtener el nombre del usuario: ", error);
            userEmailElement.textContent = 'Error al cargar el nombre';
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
