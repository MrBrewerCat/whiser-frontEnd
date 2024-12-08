// productos.js
// Definimos un array de productos
const productos = [
    {
        nombre: "Apoya vasos Whiser",
        descripcion: "Apoya vasos Whiser Modelo tabby - pack por 6 unidades.",
        precio: "$600,00",
        imagen: "../image/poya vaso.jpeg"
    },
    {
        nombre: "Baltick porter",
        descripcion: "Cerveza negra estilo baltic porter - por unidad.",
        precio: "$1.600,00",
        imagen: "../image/Lata baltic porter.jpeg"
    },
    {
        nombre: "Steam beer Anchor Brewing C.O.",
        descripcion: "Six-pack steam Anchor",
        precio: "$7.600,00",
        imagen: "../image/Anchor steam.jpg"
    },
    {
        nombre: "Remeras Whiser Brew",
        descripcion: "Remeras de algodón estampadas varios colores, diseños y talles.",
        precio: "$4.200,00",
        imagen: "../image/remeras y gorros.png"
    }, 
];

// Función para crear card de todos los productos contenidos en el array
function crearCardProductos() {
    const container = document.querySelector('.section_1');
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('product_card');
        
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h4>${producto.nombre}</h4>
            <p>${producto.descripcion}</p>
            <p class="price">${producto.precio}</p>
            <button>Comprar</button>
        `;
        
        container.appendChild(card);
    });
}
// Función para mostrar los productos
function mostrarProductos(productos){
    console.log(`LISTADO DE LOS ${productos.length} PRODUCTOS DISPONIBLES:`);
console.log('=================================');
console.log("  ");
console.log('-------------------------');
    productos.forEach(producto => {
        console.log(`Producto: ${producto.nombre}`);
        console.log(`Descripción: ${producto.descripcion}`);
        console.log(`Precio: $${producto.precio}`);
        console.log('-------------------------');
    });
}
// Llamamos a la función para mostrar los productos cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    crearCardProductos()
    mostrarProductos(productos)
});