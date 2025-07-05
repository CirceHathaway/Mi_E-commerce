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
            tarjetaProducto.style.cursor = "pointer"; // la tarjeta es clicable
            tarjetaProducto.addEventListener("click", () => abrirVentana(producto));

            let imagenProducto = document.createElement("img");
            imagenProducto.src = producto.images[0];
            imagenProducto.alt = producto.description;

            let tituloProducto = document.createElement("h3");
            tituloProducto.classList.add("titulo-producto");
            tituloProducto.textContent = producto.title;

            let descripcionProducto = document.createElement("p");
            descripcionProducto.classList.add("descripcion-producto");
            descripcionProducto.textContent = producto.description && producto.description.length > 100 ? //parte de la descripción
              producto.description.substring(0, 100) + "..." : producto.description || "Sin descripción";

            let precioProducto = document.createElement("p");
            precioProducto.textContent = `$${producto.price}`;

            let btnAgregar = document.createElement("button");
            btnAgregar.textContent = "Agregar";
            //Agregamos el evento click que haga push y actualice el contador
            btnAgregar.addEventListener("click", (e) => {
              e.stopPropagation(); // Evitar que el clic en el botón abra la ventana
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

  //Ventana para ver la info completa del producto.
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

  const actualizarAgregados = () => {
    let contadorCarrito = document.getElementById("contador-carrito");
    contadorCarrito.textContent = carrito.length;
  };

  renderProductos();
  actualizarAgregados();
});