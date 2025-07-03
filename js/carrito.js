document.addEventListener("DOMContentLoaded", () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const renderCarrito = () => {
    const contenedorCarrito = document.getElementById("contenedor-carrito");
    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
      contenedorCarrito.innerHTML = "<p>El carrito está vacío</p>";
    } else {
      carrito.forEach((producto, index) => {
        const tarjetaCarrito = document.createElement("article");
        tarjetaCarrito.classList.add("tarjeta-carrito");

        const imagenProducto = document.createElement("img");
        imagenProducto.src = producto.images[0];
        imagenProducto.alt = producto.description;

        const tituloProducto = document.createElement("h3");
        tituloProducto.textContent = producto.title;

        const descripcionProducto = document.createElement("p");
        descripcionProducto.classList.add("descripcion-carrito");
        descripcionProducto.textContent = producto.description.length > 100 ? 
          producto.description.substring(0, 100) + "..." : producto.description;

        const precioProducto = document.createElement("p");
        precioProducto.textContent = `$${producto.price}`;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => {
          eliminarProducto(index);
          renderCarrito();
          actualizarResumen();
        });

        tarjetaCarrito.appendChild(imagenProducto);
        tarjetaCarrito.appendChild(tituloProducto);
        tarjetaCarrito.appendChild(descripcionProducto);
        tarjetaCarrito.appendChild(precioProducto);
        tarjetaCarrito.appendChild(btnEliminar);

        contenedorCarrito.appendChild(tarjetaCarrito);
      });
    }
  };

  const actualizarResumen = () => {
    const totalProductosElement = document.createElement("p");
    totalProductosElement.id = "total-productos";
    totalProductosElement.textContent = `Total productos: ${carrito.length}`;

    const totalImporteElement = document.createElement("p");
    totalImporteElement.id = "total-importe";
    const totalImporte = carrito.reduce((total, producto) => total + producto.price, 0);
    totalImporteElement.textContent = `Total: $${totalImporte.toFixed(2)}`;

    const btnCompra = document.createElement("button");
    btnCompra.id = "btn-compra";
    btnCompra.textContent = "Finalizar Compra";
    btnCompra.addEventListener("click", simularCompra);

    const resumenCarrito = document.getElementById("resumen-carrito");
    resumenCarrito.innerHTML = "";
    resumenCarrito.appendChild(totalProductosElement);
    resumenCarrito.appendChild(totalImporteElement);
    resumenCarrito.appendChild(btnCompra);

    // Muestro el botón si el carrito tiene un producto.
    btnCompra.style.display = carrito.length > 0 ? "block" : "none";
  };

  const eliminarProducto = (index) => {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
  };

  const simularCompra = () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío. Agrega productos antes de finalizar la compra.");
    } else {
      alert("¡Compra finalizada con éxito! Gracias por tu compra.");
      carrito = [];
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderCarrito();
      actualizarResumen();
      actualizarContador();
    }
  };

  const actualizarContador = () => {
    const contadorCarrito = document.getElementById("contador-carrito");
    contadorCarrito.textContent = carrito.length;
  };

  renderCarrito();
  actualizarResumen();
  actualizarContador();
});