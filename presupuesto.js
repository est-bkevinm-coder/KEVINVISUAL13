document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('presupuestoForm');
  const producto = document.getElementById('producto');
  const plazo = document.getElementById('plazo');
  const extras = document.querySelectorAll('.extra');
  const totalInput = document.getElementById('total');
  const condiciones = document.getElementById('condiciones');

  function calcularTotal() {
    let base = parseFloat(producto.value) || 0;
    let meses = parseInt(plazo.value) || 1;

    // Descuento: 5% por mes si plazo > 1 mes, máximo 20%
    let descuento = 0;
    if (meses > 1) {
      descuento = Math.min(meses * 5, 20);
    }

    let extrasTotal = 0;
    extras.forEach(chk => {
      if (chk.checked) {
        extrasTotal += parseFloat(chk.value);
      }
    });

    let total = base + extrasTotal;
    total = total - (total * (descuento / 100));
    totalInput.value = `$${total.toFixed(2)}`;
  }

  producto.addEventListener('change', calcularTotal);
  plazo.addEventListener('input', calcularTotal);
  extras.forEach(chk => chk.addEventListener('change', calcularTotal));

  form.addEventListener('submit', e => {
    e.preventDefault();

    if (!form.checkValidity()) {
      alert('Por favor, complete correctamente todos los campos.');
      return;
    }

    if (!condiciones.checked) {
      alert('Debe aceptar las condiciones de privacidad.');
      return;
    }

    alert('Presupuesto enviado correctamente. ¡Gracias!');
    form.reset();
    totalInput.value = '$0.00';
  });

  form.addEventListener('reset', () => {
    totalInput.value = '$0.00';
  });

  // Calcular total al cargar la pagina
  calcularTotal();
});