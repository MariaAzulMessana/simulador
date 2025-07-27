let ingresoMensual = 0;
let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

const formIngreso = document.getElementById("formIngreso");
const formGasto = document.getElementById("formGasto");
const saldoEl = document.getElementById("saldo");

// Cargar datos guardados al inicio
document.addEventListener("DOMContentLoaded", function () {
  ingresoMensual = parseFloat(localStorage.getItem("ingresoMensual")) || 0;
  document.getElementById("ingreso").value = ingresoMensual || "";
  mostrarGastos();
  calcularSaldo();
});

// Guardar ingreso con validación
formIngreso.addEventListener("submit", function (e) {
  e.preventDefault();
  const ingresoInput = document.getElementById("ingreso");
  const valorIngreso = parseFloat(ingresoInput.value);

  if (isNaN(valorIngreso) || valorIngreso <= 0) {
    Swal.fire({
      icon: "error",
      title: "Ingreso inválido",
      text: "Por favor ingresá un monto mayor que cero.",
      confirmButtonColor: "#d33"
    });
    return;
  }

  ingresoMensual = valorIngreso;
  localStorage.setItem("ingresoMensual", ingresoMensual);

  Swal.fire({
    icon: "success",
    title: "Ingreso guardado",
    text: `Tu ingreso mensual es de $${ingresoMensual.toFixed(2)}`,
    confirmButtonColor: "#3085d6"
  });

  ingresoInput.value = "";
  calcularSaldo();
});

// Registrar gasto con validación
formGasto.addEventListener("submit", function (e) {
  e.preventDefault();
  const categoria = document.getElementById("categoria").value;
  const monto = parseFloat(document.getElementById("monto").value);

  if (!categoria) {
    Swal.fire({
      icon: "error",
      title: "Categoría inválida",
      text: "Por favor seleccioná una categoría.",
      confirmButtonColor: "#d33"
    });
    return;
  }

  if (isNaN(monto) || monto <= 0) {
    Swal.fire({
      icon: "error",
      title: "Monto inválido",
      text: "Por favor ingresá un monto mayor que cero.",
      confirmButtonColor: "#d33"
    });
    return;
  }

  gastos.push({ categoria: categoria, monto: monto });
  localStorage.setItem("gastos", JSON.stringify(gastos));
  mostrarGastos();
  calcularSaldo();
  formGasto.reset();

  Swal.fire({
    icon: "success",
    title: "Gasto agregado",
    text: "El gasto fue registrado correctamente",
    timer: 1500,
    showConfirmButton: false
  });
});

// Mostrar gastos en la tabla
function mostrarGastos() {
  const cuerpoTabla = document.getElementById("cuerpoTabla");
  cuerpoTabla.innerHTML = "";

  gastos.forEach(function (gasto) {
    const fila = document.createElement("tr");

    const celdaCategoria = document.createElement("td");
    celdaCategoria.textContent = gasto.categoria;

    const celdaMonto = document.createElement("td");
    celdaMonto.textContent = "$" + gasto.monto.toFixed(2);

    fila.appendChild(celdaCategoria);
    fila.appendChild(celdaMonto);
    cuerpoTabla.appendChild(fila);
  });
}

// Calcular y mostrar saldo
function calcularSaldo() {
  const totalGastos = gastos.reduce(function (acc, gasto) {
    return acc + gasto.monto;
  }, 0);

  const saldo = ingresoMensual - totalGastos;
  saldoEl.textContent = "$" + saldo.toFixed(2);

  if (saldo < 0) {
    saldoEl.style.color = "red";
  } else {
    saldoEl.style.color = "green";
  }
}