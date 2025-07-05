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
          tarjetaProducto.style.cursor = "pointer"; 
          tarjetaProducto.addEventListener("click", () => abrirVentana(producto));

          const imagenProducto = document.createElement("img");
          imagenProducto.src = producto.images[0];
          imagenProducto.alt = producto.description;

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
            e.stopPropagation(); // Evitar que el clic en el botón abra la ventana
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

  const abrirVentana = (producto) => {
    const ventana = document.createElement("div");
    ventana.classList.add("ventana");
    
    const ventanaContenido = document.createElement("div");
    ventanaContenido.classList.add("ventana-contenido");

    const cerrarBtn = document.createElement("span");
    cerrarBtn.classList.add("cerrar-ventana");
    cerrarBtn.innerHTML = "&times;";
    cerrarBtn.addEventListener("click", () => ventana.remove());

    const imagenProducto = document.createElement("img");
    imagenProducto.src = producto.images[0];
    imagenProducto.alt = producto.description;

    const tituloProducto = document.createElement("h2");
    tituloProducto.textContent = producto.title;

    const descripcionCompleta = document.createElement("p");
    descripcionCompleta.textContent = producto.description || "Sin descripción disponible";

    const precioProducto = document.createElement("p");
    precioProducto.textContent = `$${producto.price}`;
    precioProducto.style.fontWeight = "bold";

    ventanaContenido.appendChild(cerrarBtn);
    ventanaContenido.appendChild(imagenProducto);
    ventanaContenido.appendChild(tituloProducto);
    ventanaContenido.appendChild(descripcionCompleta);
    ventanaContenido.appendChild(precioProducto);
    ventana.appendChild(ventanaContenido);
    document.body.appendChild(ventana);

    // Cerrar ventana al hacer clic fuera
    ventana.addEventListener("click", (e) => {
      if (e.target === ventana) ventana.remove();
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

  //"Volver arriba"
  const volverArriba = document.querySelector(".volver-arriba");
  if (volverArriba) {
    volverArriba.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  renderProductos();
  actualizarContador();
});