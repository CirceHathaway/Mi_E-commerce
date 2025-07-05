# Mi E-commerce

## Descripción

**Mi E-commerce** es una aplicación web de comercio electrónico que permite a los usuarios explorar productos, añadirlos a un carrito de compras, enviar consultas a través de un formulario de contacto, y ver reseñas de clientes. El proyecto está construido con tecnologías web (HTML, CSS, JavaScript) y utiliza `localStorage` para gestionar el carrito de compras de forma persistente. Los productos se obtienen de la API de DummyJSON, y el formulario de contacto utiliza Formspree para procesar envíos.

### Características principales
- **Página de inicio (`index.html`)**: Muestra una lista de productos destacados obtenidos de la API de DummyJSON, con opción de ver detalles en una ventana y añadir al carrito.
- **Página de productos (`productos.html`)**: Muestra todos los productos con funcionalidad que la página de inicio.
- **Página de contacto (`contacto.html`)**: Incluye un formulario para enviar consultas (usando Formspree) y una sección de reseñas de clientes con un diseño responsivo basado en CSS Grid.
- **Página de carrito (`carrito.html`)**: Muestra los productos añadidos al carrito, permite eliminarlos, y ofrece un botón "Finalizar Compra".
- **Diseño responsivo**: Adaptado para dispositivos móviles con media queries (pantallas < 600px).
- **Navegación consistente**: Todas las páginas incluyen un encabezado con navegación y un contador de carrito.
- **Estilización**: Uso de CSS personalizado para un diseño atractivo, con fuente Monoton para el título del formulario de contacto.

## Estructura del proyecto

```
mi-ecommerce/
├── index.html          # Página de inicio con lista de productos destacados.
├── productos.html      # Página con todos los productos.
├── contacto.html       # Página con formulario de contacto y reseñas.
├── carrito.html        # Página del carrito de compras.
├── js/
│   ├── app.js          # Lógica para la página de inicio (renderización, carga de productos destacados, ventana, agregar producto, actualizar contador).
│   ├── productos.js    # Lógica para la página de productos (renderización, carga, búsqueda, filtrado, agregar producto, actualizar contador).
│   ├── contacto.js     # Lógica para actualizar el contador del carrito en contacto.html.
│   └── carrito.js      # Lógica para gestionar el carrito (renderizado, resumen, eliminación, compra).
├── css/
│   └── styles.css      # Estilos globales para todas las páginas.
└── README.md           # Documentación del proyecto.
```

## Notas adicionales

- **Dependencias externas**:
  - API de DummyJSON: `https://dummyjson.com/products`
  - Formspree: `https://formspree.io/f/mpwdkyyv`
  - Google Fonts (Monoton): `https://fonts.googleapis.com/css2?family=Monoton&display=swap`

## Licencia

© 2025 Mi E-Commerce. Todos los derechos reservados a CirceHathaway.