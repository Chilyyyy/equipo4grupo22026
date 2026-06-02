let productos =
JSON.parse(
    localStorage.getItem("productos")
) || [];

let carrito = [];

let productoActual = null;

const busqueda =
document.getElementById("busqueda");

busqueda.addEventListener(
    "input",
    buscarProducto
);

function buscarProducto(){

    const texto =
    busqueda.value
    .toLowerCase()
    .trim();

    const info =
    document.getElementById(
        "infoProducto"
    );

    if(texto === ""){

        info.innerHTML = "";
        productoActual = null;

        return;
    }

    const encontrado =
    productos.find(producto =>
        producto.nombre
        .toLowerCase()
        .includes(texto)
    );

    if(!encontrado){

        info.innerHTML = `
            <p style="
                color:red;
                font-weight:bold;
            ">
                Producto no encontrado
            </p>
        `;

        productoActual = null;

        return;
    }

    productoActual = encontrado;

    info.innerHTML = `
        <div class="card">

            <h3>
                ${encontrado.nombre}
            </h3>

            <p>
                Precio:
                $${encontrado.precio}
            </p>

            <p>
                Stock:
                ${encontrado.stock}
            </p>

        </div>
    `;
}

function agregarAlCarrito(){

    if(!productoActual){

        alert(
            "Seleccione un producto"
        );

        return;
    }

    const cantidad =
    parseInt(
        document.getElementById(
            "cantidad"
        ).value
    );

    if(
        isNaN(cantidad) ||
        cantidad <= 0
    ){

        alert(
            "Cantidad inválida"
        );

        return;
    }

    if(
        cantidad >
        productoActual.stock
    ){

        alert(
            "Stock insuficiente"
        );

        return;
    }

    const existente =
    carrito.find(item =>
        item.producto.nombre ===
        productoActual.nombre
    );

    if(existente){

        existente.cantidad +=
        cantidad;

        existente.subtotal =
        existente.cantidad *
        productoActual.precio;
    }
    else{

        carrito.push({

            producto:
            productoActual,

            cantidad,

            subtotal:
            cantidad *
            productoActual.precio

        });
    }

    actualizarCarrito();

    document.getElementById(
        "cantidad"
    ).value = "";
}

function actualizarCarrito(){

    const tabla =
    document.getElementById(
        "tablaCarrito"
    );

    let html = "";

    let total = 0;

    carrito.forEach(item=>{

        total += item.subtotal;

        html += `
        <tr>

            <td>
                ${item.producto.nombre}
            </td>

            <td>
                ${item.cantidad}
            </td>

            <td>
                $${item.producto.precio}
            </td>

            <td>
                $${item.subtotal}
            </td>

        </tr>
        `;
    });

    tabla.innerHTML = html;

    document.getElementById(
        "totalGeneral"
    ).innerText =
    `Total: $${total}`;
}

function finalizarVenta(){

    if(
        carrito.length === 0
    ){

        alert(
            "No hay productos en el carrito"
        );

        return;
    }

    let ventas =
    JSON.parse(
        localStorage.getItem(
            "ventas"
        )
    ) || [];

    const total =
    carrito.reduce(

        (suma,item)=>

        suma +
        item.subtotal,

        0

    );

    const venta = {

        fecha:
        new Date()
        .toLocaleString(),

        productos:

        carrito.map(item=>({

            nombre:
            item.producto.nombre,

            cantidad:
            item.cantidad,

            subtotal:
            item.subtotal

        })),

        total

    };

    ventas.push(
        venta
    );

    carrito.forEach(item=>{

        const producto =
        productos.find(p=>

            p.nombre ===
            item.producto.nombre

        );

        if(producto){

            producto.stock -=
            item.cantidad;
        }

    });

    localStorage.setItem(

        "productos",

        JSON.stringify(
            productos
        )

    );

    localStorage.setItem(

        "ventas",

        JSON.stringify(
            ventas
        )

    );

    carrito = [];

    actualizarCarrito();

    document
    .getElementById(
        "infoProducto"
    )
    .innerHTML = "";

    document
    .getElementById(
        "busqueda"
    )
    .value = "";

    alert(
        "Venta registrada correctamente"
    );
}