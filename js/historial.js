const ventas =
JSON.parse(
    localStorage.getItem("ventas")
) || [];

const tabla =
document.getElementById(
    "tablaHistorial"
);

if(ventas.length === 0){

    tabla.innerHTML = `
        <tr>

            <td colspan="3">

                No hay ventas registradas

            </td>

        </tr>
    `;
}
else{

    ventas
    .slice()
    .reverse()
    .forEach(venta => {

        let productosTexto = "";

        venta.productos.forEach(
            producto => {

            productosTexto += `
                ${producto.nombre}
                x${producto.cantidad}<br>
            `;
        });

        tabla.innerHTML += `

        <tr>

            <td>
                ${venta.fecha}
            </td>

            <td>
                ${productosTexto}
            </td>

            <td>

                $${venta.total}

            </td>

        </tr>

        `;
    });
}