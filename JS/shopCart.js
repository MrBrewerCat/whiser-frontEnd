// Función para formatear el precio en "0.000,00"
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0, // Mínimo dos decimales
        maximumFractionDigits: 2  // Máximo dos decimales
    }).format(precio);
}

// Función global para actualizar el contador del carrito
const actualizarContador = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    document.getElementById("contador-carrito").textContent = totalItems;
};

// Cargar el carrito desde LocalStorage
function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedorCarrito = document.querySelector('.productos-carrito');
    contenedorCarrito.innerHTML = ''; // Limpiar el contenedor

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<p>El carrito está vacío.</p>';
        document.getElementById('total-carrito').textContent = formatearPrecio(0);
        actualizarContador();
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

    document.getElementById('total-carrito').textContent = formatearPrecio(total);
    actualizarContador();
}

// Eliminar producto del carrito
function eliminarProducto(index) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1); // Eliminar el producto
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito actualizado
    cargarCarrito(); // Recargar la vista
}

// Editar cantidad de productos
function editarCantidad(event, index) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const nuevaCantidad = parseInt(event.target.value);

    if (nuevaCantidad > 0) {
        carrito[index].cantidad = nuevaCantidad; // Actualizar la cantidad
    } else {
        carrito.splice(index, 1); // Eliminar si cantidad es 0
    }

    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar cambios
    cargarCarrito(); // Recargar la vista
    actualizarContador();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito'); // Eliminar del LocalStorage
    cargarCarrito(); // Recargar la vista vacía
}

// Función para redirigir a la página de facturación
function realizarCompra() {
    alert("A continuación se lo redirigirá al sitio de facturación y medios de pago.");
    window.location.href = '../pages/coming_soon.html';
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    cargarCarrito();
    actualizarContador();

    // Evento para vaciar el carrito
    document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);

    // Evento para realizar la compra
    document.getElementById('comprar-carrito').addEventListener('click', realizarCompra);
});
