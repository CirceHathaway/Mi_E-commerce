document.addEventListener("DOMContentLoaded", () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const renderProductos = () => {
    const url = "https://dummyjson.com/products?limit=0";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const contenedorProductos = document.getElementById("contenedor-productos");
        contenedorProductos.innerHTML = "";

        for (const producto of data.products) {
          const tarjetaProducto = document.createElement("article");
          tarjetaProducto.classList.add("tarjeta-producto");
          tarjetaProducto.style.cursor = "pointer"; // Indicar que es clicable
          tarjetaProducto.addEventListener("click", () => abrirModal(producto));

          const imagenProducto = document.createElement("img");
          imagenProducto.src = producto.images && producto.images.length > 0 ? 
            producto.images[0] : "https://via.placeholder.com/150?text=Sin+Imagen";
          imagenProducto.alt = producto.description || "Sin descripción";

          const tituloProducto = document.createElement("h3");
          tituloProducto.classList.add("titulo-producto");
          tituloProducto.textContent = producto.title;

          const descripcionProducto = document.createElement("p");
          descripcionProducto.classList.add("descripcion-producto");
          descripcionProducto.textContent = producto.description && producto.description.length > 100 ? 
            producto.description.substring(0, 100) + "..." : producto.description || "Sin descripción";

          const precioProducto = document.createElement("p");
          precioProducto.textContent = `$${producto.price}`;

          const btnAgregar = document.createElement("button");
          btnAgregar.textContent = "Agregar";
          btnAgregar.addEventListener("click", (e) => {
            e.stopPropagation(); // Evitar que el clic en el botón abra el modal
            alert(`${producto.title} agregado al carrito`);
            agregarProducto(producto);
            actualizarContador();
          });

          tarjetaProducto.appendChild(imagenProducto);
          tarjetaProducto.appendChild(tituloProducto);
          tarjetaProducto.appendChild(descripcionProducto);
          tarjetaProducto.appendChild(precioProducto);
          tarjetaProducto.appendChild(btnAgregar);

          contenedorProductos.appendChild(tarjetaProducto);
        }
      })
      .catch((err) => console.error("ERROR: ", err));
  };

  const abrirModal = (producto) => {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    
    const modalContenido = document.createElement("div");
    modalContenido.classList.add("modal-contenido");

    const cerrarBtn = document.createElement("span");
    cerrarBtn.classList.add("cerrar-modal");
    cerrarBtn.innerHTML = "&times;";
    cerrarBtn.addEventListener("click", () => modal.remove());

    const imagenProducto = document.createElement("img");
    imagenProducto.src = producto.images && producto.images.length > 0 ? 
      producto.images[0] : "https://via.placeholder.com/150?text=Sin+Imagen";
    imagenProducto.alt = producto.description || "Sin descripción";

    const tituloProducto = document.createElement("h2");
    tituloProducto.textContent = producto.title;

    const descripcionCompleta = document.createElement("p");
    descripcionCompleta.textContent = producto.description || "Sin descripción disponible";

    const precioProducto = document.createElement("p");
    precioProducto.textContent = `$${producto.price}`;
    precioProducto.style.fontWeight = "bold";

    modalContenido.appendChild(cerrarBtn);
    modalContenido.appendChild(imagenProducto);
    modalContenido.appendChild(tituloProducto);
    modalContenido.appendChild(descripcionCompleta);
    modalContenido.appendChild(precioProducto);
    modal.appendChild(modalContenido);
    document.body.appendChild(modal);

    // Cerrar modal al hacer clic fuera
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.remove();
    });
  };

  const agregarProducto = (producto) => {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  const actualizarContador = () => {
    const contadorCarrito = document.getElementById("contador-carrito");
    contadorCarrito.textContent = carrito.length;
  };

  renderProductos();
  actualizarContador();
});