let productos =
JSON.parse(
localStorage.getItem("productos")
) || [];

function guardarProductos(){

    localStorage.setItem(

        "productos",

        JSON.stringify(productos)

    );
}

function agregarProducto(){

    const nombre =
    document.getElementById(
    "nombre"
    ).value.trim();

    const precio =
    parseFloat(
    document.getElementById(
    "precio"
    ).value);

    const stock =
    parseInt(
    document.getElementById(
    "stock"
    ).value);

    if(

        nombre === "" ||

        isNaN(precio) ||

        isNaN(stock)

    ){

        alert(
        "Complete todos los campos"
        );

        return;
    }

    productos.push({

        nombre,

        precio,

        stock

    });

    guardarProductos();

    mostrarProductos();

    limpiarFormulario();
}

function limpiarFormulario(){

    document.getElementById(
    "nombre"
    ).value = "";

    document.getElementById(
    "precio"
    ).value = "";

    document.getElementById(
    "stock"
    ).value = "";
}

function eliminarProducto(indice){

    if(

        !confirm(
        "¿Eliminar producto?"
        )

    ) return;

    productos.splice(

        indice,

        1

    );

    guardarProductos();

    mostrarProductos();
}

function editarProducto(indice){

    const producto =
    productos[indice];

    const nombre =
    prompt(

        "Nombre:",

        producto.nombre

    );

    if(nombre === null) return;

    const precio =
    prompt(

        "Precio:",

        producto.precio

    );

    if(precio === null) return;

    const stock =
    prompt(

        "Stock:",

        producto.stock

    );

    if(stock === null) return;

    producto.nombre =
    nombre;

    producto.precio =
    parseFloat(precio);

    producto.stock =
    parseInt(stock);

    guardarProductos();

    mostrarProductos();
}

function mostrarProductos(){

    const tabla =
    document.getElementById(
    "tablaProductos"
    );

    let html = "";

    productos.forEach(

        (producto, indice)=>{

        html += `
        <tr>

            <td>
                ${producto.nombre}
            </td>

            <td>
                $${producto.precio}
            </td>

            <td style="
                color:
                ${producto.stock <= 5
                    ? '#dc2626'
                    : '#16a34a'};
                font-weight:bold;
            ">
                ${producto.stock}
            </td>

            <td>

                <button
                class="btn-editar"
                onclick="
                editarProducto(
                ${indice}
                )">

                    Editar

                </button>

                <button
                class="btn-eliminar"
                onclick="
                eliminarProducto(
                ${indice}
                )">

                    Eliminar

                </button>

            </td>

        </tr>
        `;
    });

    tabla.innerHTML =
    html;
}

mostrarProductos();