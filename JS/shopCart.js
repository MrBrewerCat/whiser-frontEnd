// Función para formatear el precio en "0.000,00"
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0, // Mínimo dos decimales
        maximumFractionDigits: 2  // Máximo dos decimales
    }).format(precio);
}

// Cargar el carrito desde LocalStorage
function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Recuperamos carrito
    const contenedorCarrito = document.querySelector('.productos-carrito'); // Contenedor de productos
    contenedorCarrito.innerHTML = ''; // Limpiar el contenedor

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<p>El carrito está vacío.</p>';
        return;
    }

    let total = 0;

    carrito.forEach((producto, index) => {
        const itemCarrito = document.createElement('div');
        itemCarrito.classList.add('producto-item');
        
        itemCarrito.innerHTML = `
            <img src=".${producto.imagen}" alt="${producto.nombre}">
            <div class="detalle">
                <h4>${producto.nombre}</h4>
                <p>${producto.descripcion}</p>
                <p>Precio unitario: ${formatearPrecio(producto.precio)}</p>
                <p>Total: ${formatearPrecio(producto.precio * producto.cantidad)}</p>
                <p>Cantidad: <input type="number" value="${producto.cantidad}" min="1" class="cantidad" data-index="${index}"></p>
            </div>
            <button class="eliminar" data-index="${index}">Eliminar</button>
        `;

        contenedorCarrito.appendChild(itemCarrito);

        // Actualizar total
        total += producto.precio * producto.cantidad;

        // Evento para eliminar producto
        itemCarrito.querySelector('.eliminar').addEventListener('click', () => eliminarProducto(index));

        // Evento para cambiar cantidad
        itemCarrito.querySelector('.cantidad').addEventListener('change', (e) => editarCantidad(e, index));
    });

    // Mostrar el total del carrito con el formato adecuado
    document.getElementById('total-carrito').textContent = formatearPrecio(total);
}

// Eliminar producto del carrito
function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1); // Eliminar el producto del carrito
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito actualizado
    cargarCarrito(); // Recargar el carrito en la vista
}

// Editar cantidad de productos
function editarCantidad(event, index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const nuevaCantidad = parseInt(event.target.value);

    if (nuevaCantidad > 0) {
        carrito[index].cantidad = nuevaCantidad; // Actualizar la cantidad
    } else {
        carrito.splice(index, 1); // Eliminar el producto si la cantidad es 0
    }

    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar cambios
    cargarCarrito(); // Recargar el carrito en la vista
}

// Función para vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito'); // Eliminar el carrito de LocalStorage
    cargarCarrito(); // Recargar el carrito vacío en la vista

    // Actualizar el total a cero
    document.getElementById('total-carrito').textContent = formatearPrecio(0);
}

// Función para redirigir a la página de facturación y mostrar alerta
function realizarCompra() {
    alert("A continuación se lo redirigirá al sitio de facturación y medios de pago.");
    window.location.href = '../pages/coming_soon.html'; // Redirige a la página de facturación
}

// Inicializamos la función al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    cargarCarrito();

    // Evento para vaciar el carrito
    document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);

    // Evento para realizar la compra
    document.getElementById('comprar-carrito').addEventListener('click', realizarCompra);
});
