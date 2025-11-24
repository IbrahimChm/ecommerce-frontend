$(document).ready(function() {

    const productos = [
        {id: 1, nombre: "Producto 1", precio: 1000, img: "ASSETS/IMG/producto1.jpg", descripcion: "Descripción detallada del Producto 1."},
        {id: 2, nombre: "Producto 2", precio: 1500, img: "ASSETS/IMG/producto2.jpg", descripcion: "Descripción detallada del Producto 2."},
        {id: 3, nombre: "Producto 3", precio: 2000, img: "ASSETS/IMG/producto3.jpg", descripcion: "Descripción detallada del Producto 3."}
    ];

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    actualizarContador();

    // ---------------------------
    // GENERAR PRODUCTOS EN INDEX
    // ---------------------------
    if($('#productos').length){
        productos.forEach(p => {
            $('#productos').append(`
                <div class="col-md-4">
                    <div class="card mb-4">
                        <img src="${p.img}" class="card-img-top" alt="${p.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${p.nombre}</h5>
                            <p class="card-text">$${p.precio}</p>
                            <button class="btn btn-success comprar" data-id="${p.id}">Comprar</button>
                            <a href="producto.html?id=${p.id}" class="btn btn-primary">Ver más</a>
                        </div>
                    </div>
                </div>
            `);
        });
    }

    // ---------------------------
    // COMPRAR PRODUCTO
    // ---------------------------
    $('.comprar').click(function(){
        const id = $(this).data('id');
        const producto = productos.find(p => p.id === id);
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContador();
        alert(`${producto.nombre} añadido al carrito!`);
    });

    // ---------------------------
    // MOSTRAR CARRITO
    // ---------------------------
    if($('#carritoLista').length){
        renderCarrito();
    }

    function renderCarrito(){
        $('#carritoLista').fadeOut(0, function(){
            $(this).empty();
            let total = 0;
            carrito.forEach((item, index) => {
                $('#carritoLista').append(`
                    <li class="list-group-item d-flex justify-content-between align-items-center" data-index="${index}">
                        ${item.nombre} - $${item.precio} 
                        <button class="btn btn-danger btn-sm eliminar">Eliminar</button>
                    </li>
                `);
                total += item.precio;
            });
            $('#totalCarrito').text(total);
            $('#carritoLista').fadeIn(300);

            // Eliminar productos con animación
            $('.eliminar').click(function(){
                const idx = $(this).parent().data('index');
                const li = $(this).parent();
                li.fadeOut(300, function(){
                    carrito.splice(idx, 1);
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    renderCarrito();
                    actualizarContador();
                });
            });
        });
    }

    // ---------------------------
    // DETALLE DEL PRODUCTO
    // ---------------------------
    if($('#detalleProducto').length){
        const params = new URLSearchParams(window.location.search);
        const idProducto = parseInt(params.get('id'));
        const producto = productos.find(p => p.id === idProducto);

        if(producto){
            $('#detalleProducto').html(`
                <div class="card mb-4">
                    <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body text-center">
                        <h2 class="card-title">${producto.nombre}</h2>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="card-text"><strong>Precio: $${producto.precio}</strong></p>
                        <button class="btn btn-success comprar-detalle" data-id="${producto.id}">Añadir al carrito</button>
                    </div>
                </div>
            `);

            // Comprar desde detalle
            $('.comprar-detalle').click(function(){
                carrito.push(producto);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarContador();
                alert(`${producto.nombre} añadido al carrito!`);
            });
        } else {
            $('#detalleProducto').html('<p>Producto no encontrado.</p>');
        }
    }

    // ---------------------------
    // CONTADOR DEL CARRITO
    // ---------------------------
    function actualizarContador(){
        $('#contadorCarrito').text(carrito.length);
    }

});
