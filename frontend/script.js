document.addEventListener('DOMContentLoaded', function() {
    try {
        // Iniciar Firebase
        const app = firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth(app);
        const db = firebase.firestore(app);
        const analytics = firebase.analytics(app);
        console.log("Firebase inicializado correctamente.");

        // Obtener elementos del DOM
        const loginForm = document.getElementById('login-form');
        const registerButton = document.getElementById('register-button');
        const registroForm = document.getElementById('registro-form');
        const registroFormInterno = document.getElementById('registro-form-interno');
        const cancelarRegistro = document.getElementById('cancelar-registro');
        const administrarTarjetasButton = document.getElementById('administrar-tarjetas-button');
        const registrarCompraButton = document.getElementById('registrar-compra-button');
        const simuladorButton = document.getElementById('simular-button');
        const cerrarSesionButton = document.getElementById('cerrar-sesion');
        const tarjetasContainer = document.getElementById('tarjetas-container');
        const agregarTarjetaButton = document.getElementById('agregar-tarjeta');
        const compraForm = document.getElementById('compra-form');

        // Evento para el formulario de inicio de sesión
        if (loginForm) {
            loginForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;

                console.log("Llamando a signInWithEmailAndPassword...");
                auth.signInWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        console.log("Inicio de sesión exitoso.");
                        const user = userCredential.user;
                        console.log("Usuario inició sesión:", user);
                        alert('Inicio de sesión exitoso');
                        window.location.href = 'frontend/dashboard.html';
                    })
                    .catch((error) => {
                        console.log("Error al iniciar sesión:", error);
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.error("Error al iniciar sesión:", errorCode, errorMessage);
                        alert('Credenciales incorrectas o error al iniciar sesión. Inténtalo de nuevo.');
                    });
            });
        }

        // Evento para el botón de registro
        if (registerButton) {
            registerButton.addEventListener('click', () => {
                registroForm.style.display = 'block';
            });
        }

        // Evento para cancelar el registro
        if (cancelarRegistro) {
            cancelarRegistro.addEventListener('click', () => {
                registroForm.style.display = 'none';
            });
        }

        // Evento para el formulario de registro
        if (registroFormInterno) {
            registroFormInterno.addEventListener('submit', async (event) => {
                event.preventDefault();

                const nombre = document.getElementById('registro-nombre').value;
                const email = document.getElementById('registro-email').value;
                const password = document.getElementById('registro-password').value;

                if (nombre && email && password) {
                    auth.createUserWithEmailAndPassword(email, password)
                        .then((userCredential) => {
                            const user = userCredential.user;
                            console.log("Usuario registrado:", user);

                            // Guarda información adicional en Firestore
                            db.collection("usuarios").add({
                                uid: user.uid,
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

        // Obtener correo del usuario
        async function getEmail() {
            const emailUsuario = document.getElementById('user-email').textContent;
            const userEmailElement = document.getElementById('user-email');

            if (userEmailElement && emailUsuario) {
                try {
                    const usuariosRef = db.collection("usuarios");
                    const q = usuariosRef.where("email", "==", emailUsuario);
                    const querySnapshot = await q.get();
                    if (!querySnapshot.empty) {
                        querySnapshot.forEach((doc) => {
                            const usuario = doc.data();
                            userEmailElement.textContent = usuario.nombre;
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
                window.location.href = '/';
            });
        }

        // Obtener tarjetas del usuario (simulado con localStorage)
        function getTarjetas() {
            if (tarjetasContainer) {
                const tarjetas = JSON.parse(localStorage.getItem('tarjetas')) || [];
                tarjetasContainer.innerHTML = '';
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
                const numero = prompt('Número de tarjeta:');
                const fecha_corte = prompt('Fecha de corte:');
                const monto = prompt('Monto:');

                if (numero && fecha_corte && monto) {
                    const tarjetas = JSON.parse(localStorage.getItem('tarjetas')) || [];
                    tarjetas.push({ numero, fecha_corte, monto });
                    localStorage.setItem('tarjetas', JSON.stringify(tarjetas));
                    getTarjetas();
                }
            });
        }

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

    } catch (error) {
        console.error("Error al inicializar Firebase o ejecutar el código:", error);
    }
});
