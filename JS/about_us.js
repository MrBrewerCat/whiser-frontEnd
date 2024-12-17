const actualizarContador = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    document.getElementById("contador-carrito").textContent = totalItems;
};
document.addEventListener('DOMContentLoaded', actualizarContador)