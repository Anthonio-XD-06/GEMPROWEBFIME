// Obtener elementos del DOM
const simuladorForm = document.getElementById('simulador-form');
const resultadosSim = document.getElementById('resultados-sim');

// Evento para el formulario del simulador (simulado)
simuladorForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Obtener valores y convertirlos a números
  const monto = parseFloat(document.getElementById('monto-sim').value);
  const plazo = parseInt(document.getElementById('plazo-sim').value);
  const interes = parseFloat(document.getElementById('interes-sim').value);

  // Verificar si los valores son válidos
  if (isNaN(monto) || isNaN(plazo) || isNaN(interes)) {
    resultadosSim.innerHTML = '<p>Por favor, ingrese valores numéricos válidos.</p>';
    return; // Detener la ejecución si los valores no son válidos
  }

  // Calcular los resultados
  const pago_mensual = (monto * (interes / 100)) / (1 - Math.pow(1 + (interes / 100), -plazo));
  const total_deuda = pago_mensual * plazo;
  const intereses = total_deuda - monto;

  // Mostrar los resultados
  resultadosSim.innerHTML = `
    <p>Pago mensual: ${pago_mensual.toFixed(2)}</p>
    <p>Total de deuda: ${total_deuda.toFixed(2)}</p>
    <p>Intereses: ${intereses.toFixed(2)}</p>
  `;
});
