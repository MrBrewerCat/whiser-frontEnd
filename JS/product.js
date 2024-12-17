// Declaramos un array vacío para los productos
let productos = [];

const actualizarContador = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    document.getElementById("contador-carrito").textContent = totalItems;
};

// Función para cargar productos desde el archivo JSON 
function cargarProductos() {
    fetch('../js/catalogue.json') // Ruta al archivo JSON
        .then(respuesta => {
            if (!respuesta.ok) throw new Error('No se pudo cargar el archivo JSON');
            return respuesta.json();
        })
        .then(data => {
            productos = data; // Guardamos los productos en la variable global `productos`
            crearCardProductos(); // Creamos las tarjetas con los productos
            mostrarProductos(); // Ahora se puede mostrar después de cargar los productos
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
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

// Función para crear cards de productos en la sección .section_1 de product.html
function crearCardProductos() {
    const container = document.querySelector('.section_1');
    container.innerHTML = ''; // Limpiamos el contenedor antes de agregar nuevas tarjetas

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('product_card');

        // Formateamos el precio
        const precioFormateado = formatearPrecio(producto.precio);

        card.innerHTML = `
            <img src=".${producto.imagen}" alt="${producto.nombre}">  
            <h4>${producto.nombre}</h4>
            <p class="price">${precioFormateado}</p>
            <div><span><button class="ver-mas" data-id="${producto.id}">Ver más</button></span>
            <span><button class="comprar" data-id="${producto.id}">Comprar</button></span></div>
        `;// se quito <p>${producto.descripcion}</p>, para que se visualize desde el ver mas y tome sentindo

        container.appendChild(card);
    });

    // Agregar el evento a los botones de "Ver más"
    const botonesVerMas = document.querySelectorAll('.ver-mas');
    botonesVerMas.forEach(boton => {
        boton.addEventListener('click', () => {
            const idProducto = boton.dataset.id;
            mostrarDetallesModal(idProducto); // Mostrar los detalles en el modal
        });
    });

    // Agregar el evento a los botones de compra
    const botonesComprar = document.querySelectorAll('.comprar');
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', () => {
            const idProducto = boton.dataset.id;
            agregarAlCarrito(idProducto); // Agregar al carrito
        });
    });
}

// Función para agregar productos al carrito y gestionarlos en LocalStorage
function agregarAlCarrito(idProducto) {
    const producto = productos.find(prod => prod.id == idProducto);
    
    if (producto) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Recuperamos el carrito, si no existe se crea un array vacío
        
        // Buscar si el producto ya está en el carrito
        const productoEnCarrito = carrito.find(item => item.id == idProducto);
        if (productoEnCarrito) {
            // Incrementar la cantidad si ya existe
            productoEnCarrito.cantidad += 1;
        } else {
            // Agregar un nuevo producto con cantidad inicial de 1
            carrito.push({ ...producto, cantidad: 1 });
        }

        // Guardamos el carrito actualizado en LocalStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));

        alert(`${producto.nombre} ha sido agregado al carrito.`);
    }
    actualizarContador();
}

function mostrarDetallesModal(idProducto) {
    const producto = productos.find(prod => prod.id == idProducto);
    
    if (producto) {
        // Mostrar la información del producto en el modal
        document.getElementById('detalle-imagen').src = `.${producto.imagen}`;
        document.getElementById('detalle-nombre').textContent = producto.nombre;
        document.getElementById('detalle-descripcion').textContent = producto.descripcion;
        document.getElementById('detalle-precio').textContent = formatearPrecio(producto.precio);

        // Mostrar el modal
        document.getElementById('modal-detalles').classList.add('activo');
        document.body.classList.add('modal-abierto'); // Activar el desplazamiento
    }
}

// Función para cerrar el modal
document.getElementById('cerrar-modal').addEventListener('click', () => {
    document.getElementById('modal-detalles').classList.remove('activo');
    document.body.classList.remove('modal-abierto'); // Restaurar el desplazamiento
});

// Detectar clic fuera del modal para cerrarlo
document.getElementById('modal-detalles').addEventListener('click', (evento) => {
    const modalContent = document.querySelector('.modal-contenido'); // Clase del contenido interno
    if (!modalContent.contains(evento.target)) { // Si el clic no fue dentro del contenido
        document.getElementById('modal-detalles').classList.remove('activo');
        document.body.classList.remove('modal-abierto'); // Restaurar el desplazamiento
    }
});

// Función para mostrar los productos en la consola
function mostrarProductos() {
    console.log(`LISTADO DE LOS ${productos.length} PRODUCTOS DISPONIBLES:`);
    console.log('========================================');
    console.log('');
    console.log('-------------------------');
    productos.forEach(producto => {
        console.log(`Producto: ${producto.nombre}`);
        console.log(`Descripción: ${producto.descripcion}`);
        console.log(`Precio: ${producto.precio}`);
        console.log('-------------------------');
    });
}

// Llamamos a las funciones cuando se carga la página
document.addEventListener('DOMContentLoaded', function () {
    cargarProductos(); // Cargamos los productos desde el JSON
    actualizarContador();
});
