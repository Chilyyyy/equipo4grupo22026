// Productos y ventas guardadas

const productos =
JSON.parse(
    localStorage.getItem("productos")
) || [];

const ventas =
JSON.parse(
    localStorage.getItem("ventas")
) || [];

// Cantidad de productos

document
.getElementById("cantProductos")
.innerText =
productos.length;

// Cantidad de ventas

document
.getElementById("cantVentas")
.innerText =
ventas.length;

// Ingresos totales

const ingresos =
ventas.reduce(

    (total, venta) =>

        total + venta.total,

    0

);

document
.getElementById("ingresos")
.innerText =
"$" + ingresos.toFixed(2);

// Productos con stock bajo

const stockBajo =
productos.filter(

    producto =>

    producto.stock <= 5

).length;

document
.getElementById("stockBajo")
.innerText =
stockBajo;

// Últimas ventas

const listaVentas =
document.getElementById(
    "ultimasVentas"
);

if(ventas.length === 0){

    listaVentas.innerHTML = `
        <li>
            No hay ventas registradas
        </li>
    `;
}
else{

    ventas
    .slice(-5)
    .reverse()
    .forEach(venta => {

        listaVentas.innerHTML += `
            <li>

                ${venta.fecha}

                -

                $${venta.total}

            </li>
        `;
    });
}