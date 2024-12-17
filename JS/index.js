
const actualizarContador = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    document.getElementById("contador-carrito").textContent = totalItems;
};

// Función para cargar el archivo JSON
function cargarProductos() {
    const respuesta = fetch('./js/catalogue.json'); // Ruta del archivo JSON
    respuesta.then(function (response) {
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON');
        }
        return response.json();
    }).then(function (productos) {
        // Selecciona 4 productos al azar y crea las tarjetas
        const productosAleatorios = seleccionarProductosAleatorios(productos, 4);
        crearCardProductos(productosAleatorios);
    }).catch(function (error) {
        console.error('Error al cargar el archivo JSON:', error);
    });
}

// Función para seleccionar productos al azar
function seleccionarProductosAleatorios(productos, cantidad) {
    const productosAleatorios = [];
    const indicesSeleccionados = new Set();

    while (productosAleatorios.length < cantidad && indicesSeleccionados.size < productos.length) {
        const indice = Math.floor(Math.random() * productos.length);
        if (!indicesSeleccionados.has(indice)) {
            indicesSeleccionados.add(indice);
            productosAleatorios.push(productos[indice]);
        }
    }

    return productosAleatorios;
}

// Función para formatear el precio
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0, // No mostrar decimales si no hay
        maximumFractionDigits: 2  // Como máximo mostrar dos decimales
    }).format(precio);
}

// Función para crear las tarjetas de producto
function crearCardProductos(productosSeleccionados) {
    const container = document.querySelector('.section_1');
    container.innerHTML = ''; // Limpia el contenedor

    productosSeleccionados.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('product_card');
        
        // Formateamos el precio
        const precioFormateado = formatearPrecio(producto.precio);

        // Crear HTML de la tarjeta
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h4>${producto.nombre}</h4>
            <p>${producto.descripcion}</p>
            <p class="price">${precioFormateado}</p>
            <button>Comprar</button>
        `;
        
        // Agregar el botón de compra con evento para añadir al LocalStorage
        const botonComprar = card.querySelector('button');
        botonComprar.addEventListener('click', function() {
            agregarProductoAlLocalStorage(producto);
        });

        // Añadir la tarjeta al contenedor
        container.appendChild(card);
        
    });
}

// Función para agregar un producto al LocalStorage
function agregarProductoAlLocalStorage(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Recuperar carrito o inicializar vacío
    
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
        productoExistente.cantidad += 1; // Incrementar cantidad si ya existe
    } else {
        carrito.push({ ...producto, cantidad: 1 }); // Agregar producto con cantidad inicial
    }

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    alert(`${producto.nombre} ha sido agregado a tu carrito.`);
    actualizarContador();
}

// Llama a la función al cargar la página
document.addEventListener('DOMContentLoaded', function(){

cargarProductos();
actualizarContador();
});