document.addEventListener("DOMContentLoaded", () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || []; //getItem("carrito") pido todo lo que está en carrito y convierto (.parse) a JS.

  const renderProductos = () => {
    const url = "https://dummyjson.com/products?limit=10";
    fetch(url) //pido los datos, el fetch me retorna la promesa
      .then((res) => res.json()) //esperamos la promesa... luego leemos y convertimos a js
      .then((data) => {
          let contenedorProductos = document.getElementById("contenedor-productos");
          // una vez que esperamos los datos, hacemos lo que necesitamos

          for (const producto of data.products) {
            //creamos los elementos que necesitamos para la tarjeta de producto
            //Le doy valor al titulo, precio y boton
            let tarjetaProducto = document.createElement("article");
            tarjetaProducto.classList.add("tarjeta-producto");
            tarjetaProducto.style.cursor = "pointer"; // Indicar que es clicable
            tarjetaProducto.addEventListener("click", () => abrirModal(producto));

            let imagenProducto = document.createElement("img");
            imagenProducto.src = producto.images && producto.images.length > 0 ? 
              producto.images[0] : "https://via.placeholder.com/150?text=Sin+Imagen";
            imagenProducto.alt = producto.description || "Sin descripción";

            let tituloProducto = document.createElement("h3");
            tituloProducto.classList.add("titulo-producto");
            tituloProducto.textContent = producto.title;

            let descripcionProducto = document.createElement("p");
            descripcionProducto.classList.add("descripcion-producto");
            descripcionProducto.textContent = producto.description && producto.description.length > 100 ? 
              producto.description.substring(0, 100) + "..." : producto.description || "Sin descripción";

            let precioProducto = document.createElement("p");
            precioProducto.textContent = `$${producto.price}`;

            let btnAgregar = document.createElement("button");
            btnAgregar.textContent = "Agregar";
            //Agregamos el evento click que haga push y actualice el contador
            btnAgregar.addEventListener("click", (e) => {
              e.stopPropagation(); // Evitar que el clic en el botón abra el modal
              alert(`${producto.title} agregado al carrito`);
              agregarProducto(producto);
              actualizarAgregados();
            });

            //Los agrego a la tarjeta de producto
            tarjetaProducto.appendChild(imagenProducto);
            tarjetaProducto.appendChild(tituloProducto);
            tarjetaProducto.appendChild(descripcionProducto);
            tarjetaProducto.appendChild(precioProducto);
            tarjetaProducto.appendChild(btnAgregar);

            //Agrego la tarjeta al body
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

  const actualizarAgregados = () => {
    let contadorCarrito = document.getElementById("contador-carrito");
    contadorCarrito.textContent = carrito.length;
  };

  renderProductos();
  actualizarAgregados();
});