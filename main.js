document.addEventListener('DOMContentLoaded', function () {
    const productos = [
        { nombre: "Sorrentinos", precio: 3000 },
        { nombre: "Humita", precio: 1500 },
        { nombre: "Ravioles", precio: 2500 },
        { nombre: "Tallarines", precio: 2000 },
        { nombre: "Bologñesa", precio: 1800 },
        { nombre: "Scarparo", precio: 2200 }
    ];

    
    function obtenerPrecio(nombreProducto) {
        const producto = productos.find(p => p.nombre === nombreProducto);
        return producto ? producto.precio : 0;
    }

    
    function actualizarResultado(carrito) {
        const carritoHTML = carrito.map(p => `<li>${p.nombre} - $${p.precio}</li>`).join('');
        document.getElementById("carrito").innerHTML = carritoHTML;
    }

    
    function calcularPrecioTotal(carrito) {
        return carrito.reduce((total, p) => total + p.precio, 0);
    }

    
    function aplicarCostoEnvio(precioTotal) {
        return precioTotal * 1.10; 
    }

    
    function guardarCarrito(carrito) {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    
    function cargarCarrito() {
        const carritoGuardado = localStorage.getItem('carrito');
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    }

    
    function agregarAlCarrito() {
        const producto = document.getElementById("productos").value;
        const cantidad = parseInt(document.getElementById("cantidad").value);

        if (cantidad <= 0 || isNaN(cantidad)) {
            alert("La cantidad debe ser mayor que cero.");
            return;
        }

        const precio = obtenerPrecio(producto);
        const nuevoProducto = { nombre: producto, precio: precio * cantidad };

        let carrito = cargarCarrito();
        carrito.push(nuevoProducto);
        guardarCarrito(carrito);
        actualizarResultado(carrito);
        alert("Producto agregado al carrito.");
    }

    
    function finalizarCompra() {
        let carrito = cargarCarrito();

        if (carrito.length === 0) {
            alert("El carrito está vacío. Agregue productos antes de finalizar la compra.");
            return;
        }

        const precioTotal = calcularPrecioTotal(carrito);
        const precioConEnvio = aplicarCostoEnvio(precioTotal);

        const resultadoHTML = document.getElementById("resultado");
        resultadoHTML.innerHTML += `<p>Gracias por su compra!</p>`;
        resultadoHTML.innerHTML += `<p>Costo total con envío: $${precioConEnvio.toFixed(2)}</p>`;

        
        localStorage.removeItem('carrito');
        actualizarResultado([]);
    }

    
    document.getElementById("agregarBtn").addEventListener('click', agregarAlCarrito);

    
    document.getElementById("finalizarBtn").addEventListener('click', finalizarCompra);

    
    const carritoInicial = cargarCarrito();
    actualizarResultado(carritoInicial);
});

